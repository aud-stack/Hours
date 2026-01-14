import SwiftUI

// MARK: - Color Palette
extension Color {
    // Cosmic Purple Theme
    static let cosmicPurple = Color(hex: "8A2BE2")      // BlueViolet
    static let deepIndigo = Color(hex: "4B0082")        // Indigo
    static let darkSlateBlue = Color(hex: "483D8B")     // DarkSlateBlue
    static let lavenderMist = Color(hex: "E6E6FA")      // Lavender (for light mode accents)
    static let cosmicBlack = Color(hex: "0A0A0F")       // Deep space black
    static let starWhite = Color(hex: "F8F8FF")         // Ghost white

    // Gradient colors for ethereal effects
    static let mysticPurple = Color(hex: "9370DB")      // MediumPurple
    static let galaxyViolet = Color(hex: "7B68EE")      // MediumSlateBlue

    // Status colors (tinted with purple)
    static let cosmicSuccess = Color(hex: "6A4C93")     // Purple success
    static let cosmicWarning = Color(hex: "B565D8")     // Purple warning
}

// MARK: - Gradients
extension LinearGradient {
    static let cosmicBackground = LinearGradient(
        colors: [
            Color.deepIndigo,
            Color.cosmicPurple,
            Color.darkSlateBlue
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let cosmicCard = LinearGradient(
        colors: [
            Color.darkSlateBlue.opacity(0.6),
            Color.deepIndigo.opacity(0.4)
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let etherealGlow = LinearGradient(
        colors: [
            Color.cosmicPurple.opacity(0.3),
            Color.mysticPurple.opacity(0.2),
            Color.galaxyViolet.opacity(0.1)
        ],
        startPoint: .top,
        endPoint: .bottom
    )

    static let progressGradient = LinearGradient(
        colors: [
            Color.cosmicPurple,
            Color.mysticPurple,
            Color.galaxyViolet
        ],
        startPoint: .leading,
        endPoint: .trailing
    )
}

// MARK: - Fonts
extension Font {
    static func cosmicTitle(_ size: CGFloat = 28) -> Font {
        .system(size: size, weight: .bold, design: .serif)
    }

    static func cosmicHeadline(_ size: CGFloat = 20) -> Font {
        .system(size: size, weight: .semibold, design: .serif)
    }

    static func cosmicBody(_ size: CGFloat = 16) -> Font {
        .system(size: size, weight: .regular, design: .serif)
    }

    static func cosmicCaption(_ size: CGFloat = 14) -> Font {
        .system(size: size, weight: .medium, design: .rounded)
    }
}

// MARK: - Shadow Effects
extension View {
    func cosmicGlow(color: Color = .cosmicPurple, radius: CGFloat = 10) -> some View {
        self
            .shadow(color: color.opacity(0.5), radius: radius, x: 0, y: 0)
            .shadow(color: color.opacity(0.3), radius: radius * 1.5, x: 0, y: 0)
    }

    func etherealShadow() -> some View {
        self
            .shadow(color: .cosmicPurple.opacity(0.3), radius: 8, x: 0, y: 4)
            .shadow(color: .deepIndigo.opacity(0.2), radius: 16, x: 0, y: 8)
    }
}

// MARK: - Color Extension for Hex
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Animation Presets
extension Animation {
    static let cosmic = Animation.spring(response: 0.6, dampingFraction: 0.7)
    static let ethereal = Animation.easeInOut(duration: 0.8)
    static let gentle = Animation.easeInOut(duration: 0.3)
}
