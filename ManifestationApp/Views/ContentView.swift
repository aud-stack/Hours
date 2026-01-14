import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(ManifestationViewModel.self) private var viewModel
    @State private var showingAddSheet = false
    @State private var selectedTab = 0

    var body: some View {
        ZStack {
            // Cosmic background
            CosmicBackground()
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                HeaderView(onAddTapped: {
                    HapticManager.shared.lightTap()
                    showingAddSheet = true
                })
                .padding(.horizontal)
                .padding(.top, 8)

                // Tab Selector
                TabSelector(selectedTab: $selectedTab)
                    .padding(.horizontal)
                    .padding(.top, 16)

                // Content
                ScrollView {
                    VStack(spacing: 20) {
                        if selectedTab == 0 {
                            // Active Manifestations
                            if viewModel.activeManifestations.isEmpty {
                                EmptyStateView(
                                    icon: "sparkles",
                                    title: "No Active Manifestations",
                                    subtitle: "Tap the + button to create your first manifestation"
                                )
                                .padding(.top, 60)
                            } else {
                                ForEach(viewModel.activeManifestations) { manifestation in
                                    ManifestationCardView(manifestation: manifestation)
                                        .transition(.asymmetric(
                                            insertion: .scale.combined(with: .opacity),
                                            removal: .scale.combined(with: .opacity)
                                        ))
                                }
                            }
                        } else {
                            // Completed Manifestations
                            if viewModel.completedManifestations.isEmpty {
                                EmptyStateView(
                                    icon: "checkmark.seal.fill",
                                    title: "No Completed Manifestations",
                                    subtitle: "Your manifested goals will appear here"
                                )
                                .padding(.top, 60)
                            } else {
                                ForEach(viewModel.completedManifestations) { manifestation in
                                    ManifestationCardView(manifestation: manifestation)
                                        .transition(.asymmetric(
                                            insertion: .scale.combined(with: .opacity),
                                            removal: .scale.combined(with: .opacity)
                                        ))
                                }
                            }
                        }
                    }
                    .padding()
                    .padding(.bottom, 40)
                }
            }
        }
        .sheet(isPresented: $showingAddSheet) {
            AddManifestationView()
                .presentationDetents([.large])
                .presentationDragIndicator(.visible)
        }
        .animation(.cosmic, value: selectedTab)
        .animation(.cosmic, value: viewModel.manifestations.count)
    }
}

// MARK: - Header View
struct HeaderView: View {
    let onAddTapped: () -> Void

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("Manifestations")
                    .font(.cosmicTitle(34))
                    .foregroundColor(.white)
                    .cosmicGlow()

                Text("Law of Assumption")
                    .font(.cosmicCaption(14))
                    .foregroundColor(.lavenderMist.opacity(0.8))
            }

            Spacer()

            Button(action: onAddTapped) {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 32))
                    .foregroundStyle(
                        LinearGradient.progressGradient
                    )
                    .cosmicGlow()
            }
        }
        .padding(.vertical, 8)
    }
}

// MARK: - Tab Selector
struct TabSelector: View {
    @Binding var selectedTab: Int

    var body: some View {
        HStack(spacing: 0) {
            TabButton(
                title: "Active",
                isSelected: selectedTab == 0,
                action: {
                    HapticManager.shared.selection()
                    selectedTab = 0
                }
            )

            TabButton(
                title: "Completed",
                isSelected: selectedTab == 1,
                action: {
                    HapticManager.shared.selection()
                    selectedTab = 1
                }
            )
        }
        .background(
            Capsule()
                .fill(Color.cosmicBlack.opacity(0.3))
                .overlay(
                    Capsule()
                        .stroke(Color.cosmicPurple.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

struct TabButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.cosmicBody(16))
                .fontWeight(.semibold)
                .foregroundColor(isSelected ? .white : .lavenderMist.opacity(0.6))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(
                    Group {
                        if isSelected {
                            Capsule()
                                .fill(LinearGradient.cosmicCard)
                                .cosmicGlow(radius: 8)
                        }
                    }
                )
        }
    }
}

// MARK: - Empty State View
struct EmptyStateView: View {
    let icon: String
    let title: String
    let subtitle: String

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 60))
                .foregroundStyle(
                    LinearGradient(
                        colors: [.cosmicPurple.opacity(0.6), .mysticPurple.opacity(0.4)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )

            VStack(spacing: 8) {
                Text(title)
                    .font(.cosmicHeadline(20))
                    .foregroundColor(.white.opacity(0.9))

                Text(subtitle)
                    .font(.cosmicCaption(14))
                    .foregroundColor(.lavenderMist.opacity(0.6))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 40)
            }
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Cosmic Background
struct CosmicBackground: View {
    @State private var animateGradient = false

    var body: some View {
        ZStack {
            // Base gradient
            LinearGradient.cosmicBackground
                .hueRotation(.degrees(animateGradient ? 5 : 0))

            // Animated ethereal overlay
            LinearGradient.etherealGlow
                .opacity(0.5)
                .blur(radius: 100)
                .offset(y: animateGradient ? -50 : 50)

            // Subtle stars/particles effect
            ForEach(0..<20, id: \.self) { _ in
                Circle()
                    .fill(Color.white.opacity(Double.random(in: 0.1...0.3)))
                    .frame(width: CGFloat.random(in: 1...3))
                    .position(
                        x: CGFloat.random(in: 0...400),
                        y: CGFloat.random(in: 0...900)
                    )
            }
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 8).repeatForever(autoreverses: true)) {
                animateGradient = true
            }
        }
    }
}

#Preview {
    ContentView()
        .environment(ManifestationViewModel())
        .modelContainer(for: Manifestation.self, inMemory: true)
}
