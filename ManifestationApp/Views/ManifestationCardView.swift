import SwiftUI

struct ManifestationCardView: View {
    @Environment(ManifestationViewModel.self) private var viewModel
    @State private var showingDeleteAlert = false
    @State private var isPressed = false

    let manifestation: Manifestation

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header: Title and Actions
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(manifestation.title)
                        .font(.cosmicHeadline(20))
                        .foregroundColor(.white)
                        .lineLimit(2)

                    if manifestation.isCompleted {
                        HStack(spacing: 4) {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.system(size: 12))
                            Text("Manifested")
                                .font(.cosmicCaption(12))
                        }
                        .foregroundColor(.cosmicSuccess)
                    }
                }

                Spacer()

                Menu {
                    if !manifestation.isCompleted {
                        Button {
                            viewModel.toggleCompletion(for: manifestation)
                        } label: {
                            Label("Mark as Manifested", systemImage: "checkmark.circle")
                        }
                    } else {
                        Button {
                            viewModel.toggleCompletion(for: manifestation)
                        } label: {
                            Label("Unmark Completion", systemImage: "arrow.uturn.backward")
                        }
                    }

                    Divider()

                    Button(role: .destructive) {
                        showingDeleteAlert = true
                    } label: {
                        Label("Delete", systemImage: "trash")
                    }
                } label: {
                    Image(systemName: "ellipsis.circle.fill")
                        .font(.system(size: 24))
                        .foregroundColor(.lavenderMist.opacity(0.6))
                }
            }

            // Affirmation Text
            Text(manifestation.affirmation)
                .font(.cosmicBody(15))
                .foregroundColor(.lavenderMist.opacity(0.9))
                .italic()
                .lineLimit(3)
                .padding(.vertical, 8)
                .padding(.horizontal, 12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.cosmicPurple.opacity(0.1))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.cosmicPurple.opacity(0.2), lineWidth: 1)
                        )
                )

            // Progress Section
            VStack(spacing: 12) {
                // Count Display
                HStack {
                    Text("\(manifestation.currentCount)")
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                        .foregroundColor(.white)
                        .cosmicGlow()

                    Text("/ \(manifestation.targetCount)")
                        .font(.system(size: 18, weight: .medium, design: .rounded))
                        .foregroundColor(.lavenderMist.opacity(0.6))

                    Spacer()

                    Text("\(Int(manifestation.progress * 100))%")
                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                        .foregroundColor(.cosmicPurple)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(
                            Capsule()
                                .fill(Color.cosmicPurple.opacity(0.2))
                        )
                }

                // Progress Bar
                GeometryReader { geometry in
                    ZStack(alignment: .leading) {
                        // Background
                        Capsule()
                            .fill(Color.cosmicBlack.opacity(0.3))
                            .frame(height: 12)

                        // Progress
                        Capsule()
                            .fill(LinearGradient.progressGradient)
                            .frame(
                                width: geometry.size.width * manifestation.progress,
                                height: 12
                            )
                            .cosmicGlow(color: .cosmicPurple, radius: 6)
                            .animation(.cosmic, value: manifestation.progress)
                    }
                }
                .frame(height: 12)
            }

            // Action Buttons
            HStack(spacing: 12) {
                // Tap to Affirm Button
                if !manifestation.isCompleted {
                    AffirmButton(
                        isPressed: $isPressed,
                        action: {
                            viewModel.incrementCount(for: manifestation)
                        }
                    )
                }

                // Auto-count Toggle
                if !manifestation.isCompleted {
                    AutoCountToggle(
                        isEnabled: manifestation.isAutoCountEnabled,
                        interval: manifestation.autoCountInterval,
                        action: {
                            viewModel.toggleAutoCount(for: manifestation)
                        }
                    )
                }
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 24)
                .fill(LinearGradient.cosmicCard)
                .overlay(
                    RoundedRectangle(cornerRadius: 24)
                        .stroke(
                            LinearGradient(
                                colors: [
                                    Color.cosmicPurple.opacity(0.5),
                                    Color.mysticPurple.opacity(0.3)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 1
                        )
                )
                .etherealShadow()
        )
        .alert("Delete Manifestation", isPresented: $showingDeleteAlert) {
            Button("Cancel", role: .cancel) { }
            Button("Delete", role: .destructive) {
                HapticManager.shared.warning()
                viewModel.deleteManifestation(manifestation)
            }
        } message: {
            Text("Are you sure you want to delete \"\(manifestation.title)\"? This action cannot be undone.")
        }
    }
}

// MARK: - Affirm Button
struct AffirmButton: View {
    @Binding var isPressed: Bool
    let action: () -> Void

    @State private var ripples: [RippleEffect] = []

    var body: some View {
        Button(action: {
            action()
            createRipple()
        }) {
            HStack {
                Image(systemName: "hand.tap.fill")
                    .font(.system(size: 20))

                Text("Affirm")
                    .font(.cosmicBody(16))
                    .fontWeight(.semibold)
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(
                ZStack {
                    // Base button
                    RoundedRectangle(cornerRadius: 16)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color.cosmicPurple,
                                    Color.mysticPurple
                                ],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )

                    // Ripple effects
                    ForEach(ripples) { ripple in
                        Circle()
                            .stroke(Color.white.opacity(0.6), lineWidth: 2)
                            .frame(width: ripple.size, height: ripple.size)
                            .opacity(ripple.opacity)
                            .position(ripple.position)
                    }
                }
            )
            .cosmicGlow(color: .cosmicPurple, radius: isPressed ? 20 : 12)
            .scaleEffect(isPressed ? 0.95 : 1.0)
        }
        .buttonStyle(PressButtonStyle(isPressed: $isPressed))
    }

    private func createRipple() {
        let ripple = RippleEffect(position: CGPoint(x: 80, y: 25))
        ripples.append(ripple)

        withAnimation(.easeOut(duration: 0.8)) {
            if let index = ripples.firstIndex(where: { $0.id == ripple.id }) {
                ripples[index].size = 200
                ripples[index].opacity = 0
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            ripples.removeAll { $0.id == ripple.id }
        }
    }
}

struct RippleEffect: Identifiable {
    let id = UUID()
    var position: CGPoint
    var size: CGFloat = 0
    var opacity: Double = 1.0
}

// MARK: - Press Button Style
struct PressButtonStyle: ButtonStyle {
    @Binding var isPressed: Bool

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .onChange(of: configuration.isPressed) { _, newValue in
                withAnimation(.gentle) {
                    isPressed = newValue
                }
            }
    }
}

// MARK: - Auto Count Toggle
struct AutoCountToggle: View {
    let isEnabled: Bool
    let interval: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: isEnabled ? "timer.circle.fill" : "timer")
                    .font(.system(size: 20))

                VStack(alignment: .leading, spacing: 2) {
                    Text(isEnabled ? "Auto-On" : "Auto-Off")
                        .font(.cosmicCaption(12))
                        .fontWeight(.semibold)

                    Text(intervalText)
                        .font(.system(size: 10, weight: .medium))
                        .opacity(0.8)
                }
            }
            .foregroundColor(isEnabled ? .white : .lavenderMist.opacity(0.7))
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(
                        isEnabled
                        ? LinearGradient(
                            colors: [Color.galaxyViolet, Color.darkSlateBlue],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                        : LinearGradient(
                            colors: [Color.cosmicBlack.opacity(0.4), Color.deepIndigo.opacity(0.3)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                isEnabled ? Color.cosmicPurple.opacity(0.5) : Color.lavenderMist.opacity(0.2),
                                lineWidth: 1
                            )
                    )
            )
            .cosmicGlow(
                color: isEnabled ? .galaxyViolet : .clear,
                radius: isEnabled ? 8 : 0
            )
        }
    }

    private var intervalText: String {
        if interval >= 60 {
            return "Every \(interval / 60)m"
        } else {
            return "Every \(interval)s"
        }
    }
}

#Preview {
    ZStack {
        Color.cosmicBlack.ignoresSafeArea()

        ScrollView {
            VStack(spacing: 20) {
                ManifestationCardView(manifestation: .sampleActive)
                ManifestationCardView(manifestation: .sampleCompleted)
            }
            .padding()
        }
    }
    .environment(ManifestationViewModel())
}
