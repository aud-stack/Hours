import Foundation
import SwiftUI
import SwiftData

@Observable
class ManifestationViewModel {
    var manifestations: [Manifestation] = []
    private var modelContext: ModelContext?
    private let timerManager = TimerManager.shared

    var activeManifestations: [Manifestation] {
        manifestations.filter { !$0.isCompleted }
    }

    var completedManifestations: [Manifestation] {
        manifestations.filter { $0.isCompleted }
    }

    // MARK: - Initialization

    func setup(with context: ModelContext) {
        self.modelContext = context
        fetchManifestations()
        restoreActiveTimers()
        processBackgroundCounts()
    }

    // MARK: - Data Operations

    func fetchManifestations() {
        guard let context = modelContext else { return }

        let descriptor = FetchDescriptor<Manifestation>(
            sortBy: [SortDescriptor(\.createdAt, order: .reverse)]
        )

        do {
            manifestations = try context.fetch(descriptor)
        } catch {
            print("Failed to fetch manifestations: \(error)")
        }
    }

    func addManifestation(
        title: String,
        affirmation: String,
        targetCount: Int,
        autoCountInterval: Int
    ) {
        guard let context = modelContext else { return }

        let manifestation = Manifestation(
            title: title,
            affirmation: affirmation,
            targetCount: targetCount,
            autoCountInterval: autoCountInterval
        )

        context.insert(manifestation)
        saveContext()
        fetchManifestations()
    }

    func updateManifestation(_ manifestation: Manifestation) {
        saveContext()
        fetchManifestations()
    }

    func deleteManifestation(_ manifestation: Manifestation) {
        guard let context = modelContext else { return }

        // Stop timer if active
        timerManager.stopTimer(for: manifestation.id)

        context.delete(manifestation)
        saveContext()
        fetchManifestations()
    }

    // MARK: - Count Operations

    func incrementCount(for manifestation: Manifestation) {
        manifestation.incrementCount()
        HapticManager.shared.affirmationTap()

        if manifestation.isCompleted {
            HapticManager.shared.manifestationCompleted()
        }

        saveContext()
    }

    func toggleAutoCount(for manifestation: Manifestation) {
        manifestation.toggleAutoCount()

        if manifestation.isAutoCountEnabled {
            startTimer(for: manifestation)
            HapticManager.shared.selection()
        } else {
            stopTimer(for: manifestation)
            HapticManager.shared.lightTap()
        }

        saveContext()
    }

    func toggleCompletion(for manifestation: Manifestation) {
        let wasCompleted = manifestation.isCompleted
        manifestation.toggleCompletion()

        if !wasCompleted {
            // Just marked as completed
            HapticManager.shared.manifestationCompleted()
            stopTimer(for: manifestation)
        } else {
            // Unmarked completion
            HapticManager.shared.selection()
        }

        saveContext()
    }

    // MARK: - Timer Management

    private func startTimer(for manifestation: Manifestation) {
        let interval = TimeInterval(manifestation.autoCountInterval)

        timerManager.startTimer(for: manifestation.id, interval: interval) { [weak self] in
            self?.autoIncrement(manifestation)
        }
    }

    private func stopTimer(for manifestation: Manifestation) {
        timerManager.stopTimer(for: manifestation.id)
    }

    private func autoIncrement(_ manifestation: Manifestation) {
        manifestation.lastAutoCountDate = Date()
        manifestation.incrementCount()

        if manifestation.isCompleted {
            stopTimer(for: manifestation)
        }

        saveContext()
    }

    private func restoreActiveTimers() {
        for manifestation in activeManifestations where manifestation.isAutoCountEnabled {
            startTimer(for: manifestation)
        }
    }

    func stopAllTimers() {
        timerManager.stopAllTimers()
    }

    // MARK: - Background Count Processing

    private func processBackgroundCounts() {
        for manifestation in activeManifestations {
            guard manifestation.isAutoCountEnabled,
                  let lastDate = manifestation.lastAutoCountDate else {
                continue
            }

            let counts = TimerManager.calculateBackgroundCounts(
                lastCountDate: lastDate,
                interval: manifestation.autoCountInterval
            )

            if counts > 0 {
                manifestation.currentCount += counts
                manifestation.lastAutoCountDate = Date()

                if manifestation.currentCount >= manifestation.targetCount {
                    manifestation.markAsCompleted()
                    stopTimer(for: manifestation)
                }
            }
        }

        saveContext()
    }

    // MARK: - Persistence

    private func saveContext() {
        guard let context = modelContext else { return }

        do {
            try context.save()
        } catch {
            print("Failed to save context: \(error)")
        }
    }

    // MARK: - Cleanup

    deinit {
        stopAllTimers()
    }
}
