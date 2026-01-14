import UIKit
import SwiftUI

/// Manages haptic feedback throughout the app
class HapticManager {
    static let shared = HapticManager()

    private init() {}

    // MARK: - Haptic Types

    /// Light haptic for successful affirmation tap
    func affirmationTap() {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()
    }

    /// Success haptic for completing a manifestation
    func manifestationCompleted() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }

    /// Selection haptic for toggles and selections
    func selection() {
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }

    /// Warning haptic for deletions or important actions
    func warning() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.warning)
    }

    /// Light tap for UI interactions
    func lightTap() {
        let generator = UIImpactFeedbackGenerator(style: .light)
        generator.impactOccurred()
    }

    /// Heavy tap for important actions
    func heavyTap() {
        let generator = UIImpactFeedbackGenerator(style: .heavy)
        generator.impactOccurred()
    }

    /// Soft tap for gentle interactions
    func softTap() {
        let generator = UIImpactFeedbackGenerator(style: .soft)
        generator.impactOccurred()
    }

    /// Rigid tap for firm actions
    func rigidTap() {
        let generator = UIImpactFeedbackGenerator(style: .rigid)
        generator.impactOccurred()
    }
}

// MARK: - View Extension for Easy Haptic Access
extension View {
    func hapticTap(_ hapticType: HapticType = .medium) -> some View {
        self.onTapGesture {
            switch hapticType {
            case .light:
                HapticManager.shared.lightTap()
            case .medium:
                HapticManager.shared.affirmationTap()
            case .heavy:
                HapticManager.shared.heavyTap()
            case .soft:
                HapticManager.shared.softTap()
            case .rigid:
                HapticManager.shared.rigidTap()
            case .selection:
                HapticManager.shared.selection()
            case .success:
                HapticManager.shared.manifestationCompleted()
            case .warning:
                HapticManager.shared.warning()
            }
        }
    }
}

enum HapticType {
    case light, medium, heavy, soft, rigid, selection, success, warning
}
