import Foundation
import SwiftUI
import Combine

/// Manages auto-count timers for manifestations with background support
@Observable
class TimerManager {
    static let shared = TimerManager()

    private var timers: [UUID: Timer] = [:]
    private var backgroundTask: UIBackgroundTaskIdentifier = .invalid

    private init() {
        setupNotificationObservers()
    }

    // MARK: - Timer Management

    func startTimer(for manifestationId: UUID, interval: TimeInterval, action: @escaping () -> Void) {
        stopTimer(for: manifestationId)

        let timer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { _ in
            action()
        }

        timers[manifestationId] = timer
        RunLoop.current.add(timer, forMode: .common)
    }

    func stopTimer(for manifestationId: UUID) {
        timers[manifestationId]?.invalidate()
        timers[manifestationId] = nil
    }

    func stopAllTimers() {
        timers.values.forEach { $0.invalidate() }
        timers.removeAll()
    }

    func isTimerActive(for manifestationId: UUID) -> Bool {
        timers[manifestationId] != nil
    }

    // MARK: - Background Support

    private func setupNotificationObservers() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(appDidEnterBackground),
            name: UIApplication.didEnterBackgroundNotification,
            object: nil
        )

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(appWillEnterForeground),
            name: UIApplication.willEnterForegroundNotification,
            object: nil
        )
    }

    @objc private func appDidEnterBackground() {
        // Request background execution time
        backgroundTask = UIApplication.shared.beginBackgroundTask { [weak self] in
            self?.endBackgroundTask()
        }
    }

    @objc private func appWillEnterForeground() {
        endBackgroundTask()
    }

    private func endBackgroundTask() {
        if backgroundTask != .invalid {
            UIApplication.shared.endBackgroundTask(backgroundTask)
            backgroundTask = .invalid
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        stopAllTimers()
    }
}

// MARK: - Background Time Calculator
extension TimerManager {
    /// Calculates how many counts should have occurred while app was in background
    static func calculateBackgroundCounts(
        lastCountDate: Date,
        interval: Int,
        currentDate: Date = Date()
    ) -> Int {
        let elapsedTime = currentDate.timeIntervalSince(lastCountDate)
        let intervalSeconds = Double(interval)
        let counts = Int(floor(elapsedTime / intervalSeconds))
        return max(0, counts)
    }
}
