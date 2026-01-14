import Foundation
import SwiftData

@Model
final class Manifestation {
    var id: UUID
    var title: String
    var affirmation: String
    var currentCount: Int
    var targetCount: Int
    var isCompleted: Bool
    var isAutoCountEnabled: Bool
    var autoCountInterval: Int // in seconds: 1, 2, 3, 5, 10, 30, or 60
    var createdAt: Date
    var completedAt: Date?
    var lastAutoCountDate: Date?

    init(
        id: UUID = UUID(),
        title: String,
        affirmation: String,
        currentCount: Int = 0,
        targetCount: Int,
        isCompleted: Bool = false,
        isAutoCountEnabled: Bool = false,
        autoCountInterval: Int = 1,
        createdAt: Date = Date(),
        completedAt: Date? = nil,
        lastAutoCountDate: Date? = nil
    ) {
        self.id = id
        self.title = title
        self.affirmation = affirmation
        self.currentCount = currentCount
        self.targetCount = targetCount
        self.isCompleted = isCompleted
        self.isAutoCountEnabled = isAutoCountEnabled
        self.autoCountInterval = autoCountInterval
        self.createdAt = createdAt
        self.completedAt = completedAt
        self.lastAutoCountDate = lastAutoCountDate
    }

    var progress: Double {
        guard targetCount > 0 else { return 0 }
        return min(Double(currentCount) / Double(targetCount), 1.0)
    }

    func incrementCount() {
        currentCount += 1
        if currentCount >= targetCount && !isCompleted {
            isCompleted = true
            completedAt = Date()
            isAutoCountEnabled = false
        }
    }

    func toggleAutoCount() {
        isAutoCountEnabled.toggle()
        if isAutoCountEnabled {
            lastAutoCountDate = Date()
        }
    }

    func markAsCompleted() {
        isCompleted = true
        completedAt = Date()
        isAutoCountEnabled = false
        currentCount = targetCount
    }

    func toggleCompletion() {
        isCompleted.toggle()
        if isCompleted {
            completedAt = Date()
            isAutoCountEnabled = false
        } else {
            completedAt = nil
        }
    }
}

// MARK: - Sample Data
extension Manifestation {
    static var sampleActive: Manifestation {
        Manifestation(
            title: "Financial Abundance",
            affirmation: "I am a magnet for wealth and prosperity",
            currentCount: 432,
            targetCount: 1000,
            isAutoCountEnabled: true,
            autoCountInterval: 5
        )
    }

    static var sampleCompleted: Manifestation {
        Manifestation(
            title: "Perfect Health",
            affirmation: "My body is healthy, strong, and vibrant",
            currentCount: 500,
            targetCount: 500,
            isCompleted: true,
            completedAt: Date().addingTimeInterval(-86400 * 7)
        )
    }
}
