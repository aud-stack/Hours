import SwiftUI

struct AddManifestationView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(ManifestationViewModel.self) private var viewModel

    @State private var title = ""
    @State private var affirmation = ""
    @State private var targetCount = ""
    @State private var selectedInterval = 5

    let intervalOptions = [1, 2, 3, 5, 10, 30, 60]

    var body: some View {
        NavigationStack {
            ZStack {
                // Cosmic background
                CosmicBackground()
                    .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        // Header
                        VStack(spacing: 8) {
                            Image(systemName: "sparkles")
                                .font(.system(size: 50))
                                .foregroundStyle(LinearGradient.progressGradient)
                                .cosmicGlow()

                            Text("Create Manifestation")
                                .font(.cosmicTitle(28))
                                .foregroundColor(.white)

                            Text("Define your intention and watch it manifest")
                                .font(.cosmicCaption(14))
                                .foregroundColor(.lavenderMist.opacity(0.7))
                        }
                        .padding(.top, 20)

                        // Form Fields
                        VStack(spacing: 20) {
                            // Title Field
                            CosmicTextField(
                                title: "Manifestation Title",
                                placeholder: "e.g., Financial Abundance",
                                text: $title,
                                icon: "star.fill"
                            )

                            // Affirmation Field
                            CosmicTextEditor(
                                title: "Affirmation",
                                placeholder: "e.g., I am a magnet for wealth and prosperity",
                                text: $affirmation,
                                icon: "quote.bubble.fill"
                            )

                            // Target Count Field
                            CosmicTextField(
                                title: "Target Count",
                                placeholder: "e.g., 1000",
                                text: $targetCount,
                                icon: "flag.fill",
                                keyboardType: .numberPad
                            )

                            // Auto-Count Interval Selector
                            VStack(alignment: .leading, spacing: 12) {
                                HStack {
                                    Image(systemName: "timer")
                                        .foregroundColor(.cosmicPurple)
                                        .font(.system(size: 16))

                                    Text("Auto-Count Interval")
                                        .font(.cosmicBody(16))
                                        .foregroundColor(.white)
                                }

                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 12) {
                                        ForEach(intervalOptions, id: \.self) { interval in
                                            IntervalButton(
                                                interval: interval,
                                                isSelected: selectedInterval == interval,
                                                action: {
                                                    HapticManager.shared.selection()
                                                    selectedInterval = interval
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                            .padding(20)
                            .background(
                                RoundedRectangle(cornerRadius: 20)
                                    .fill(Color.cosmicBlack.opacity(0.3))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 20)
                                            .stroke(Color.cosmicPurple.opacity(0.3), lineWidth: 1)
                                    )
                            )
                        }
                        .padding(.horizontal)

                        // Create Button
                        Button(action: createManifestation) {
                            HStack {
                                Image(systemName: "plus.circle.fill")
                                    .font(.system(size: 20))

                                Text("Create Manifestation")
                                    .font(.cosmicHeadline(18))
                                    .fontWeight(.semibold)
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 56)
                            .background(
                                RoundedRectangle(cornerRadius: 20)
                                    .fill(
                                        isFormValid
                                        ? LinearGradient.progressGradient
                                        : LinearGradient(
                                            colors: [Color.gray.opacity(0.5)],
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                            )
                            .cosmicGlow(
                                color: isFormValid ? .cosmicPurple : .clear,
                                radius: isFormValid ? 15 : 0
                            )
                        }
                        .disabled(!isFormValid)
                        .padding(.horizontal)
                        .padding(.top, 8)
                    }
                    .padding(.bottom, 40)
                }
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Cancel") {
                        HapticManager.shared.lightTap()
                        dismiss()
                    }
                    .foregroundColor(.lavenderMist)
                }
            }
        }
    }

    private var isFormValid: Bool {
        !title.trimmingCharacters(in: .whitespaces).isEmpty &&
        !affirmation.trimmingCharacters(in: .whitespaces).isEmpty &&
        Int(targetCount) != nil &&
        Int(targetCount)! > 0
    }

    private func createManifestation() {
        guard isFormValid,
              let target = Int(targetCount) else {
            return
        }

        HapticManager.shared.manifestationCompleted()

        viewModel.addManifestation(
            title: title.trimmingCharacters(in: .whitespaces),
            affirmation: affirmation.trimmingCharacters(in: .whitespaces),
            targetCount: target,
            autoCountInterval: selectedInterval
        )

        dismiss()
    }
}

// MARK: - Cosmic Text Field
struct CosmicTextField: View {
    let title: String
    let placeholder: String
    @Binding var text: String
    let icon: String
    var keyboardType: UIKeyboardType = .default

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: icon)
                    .foregroundColor(.cosmicPurple)
                    .font(.system(size: 16))

                Text(title)
                    .font(.cosmicBody(16))
                    .foregroundColor(.white)
            }

            TextField("", text: $text, prompt: Text(placeholder).foregroundColor(.lavenderMist.opacity(0.4)))
                .font(.cosmicBody(16))
                .foregroundColor(.white)
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.cosmicBlack.opacity(0.4))
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(
                                    text.isEmpty ? Color.lavenderMist.opacity(0.2) : Color.cosmicPurple.opacity(0.5),
                                    lineWidth: 1
                                )
                        )
                )
                .keyboardType(keyboardType)
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.cosmicBlack.opacity(0.3))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(Color.cosmicPurple.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

// MARK: - Cosmic Text Editor
struct CosmicTextEditor: View {
    let title: String
    let placeholder: String
    @Binding var text: String
    let icon: String

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: icon)
                    .foregroundColor(.cosmicPurple)
                    .font(.system(size: 16))

                Text(title)
                    .font(.cosmicBody(16))
                    .foregroundColor(.white)
            }

            ZStack(alignment: .topLeading) {
                if text.isEmpty {
                    Text(placeholder)
                        .font(.cosmicBody(16))
                        .foregroundColor(.lavenderMist.opacity(0.4))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 16)
                }

                TextEditor(text: $text)
                    .font(.cosmicBody(16))
                    .foregroundColor(.white)
                    .scrollContentBackground(.hidden)
                    .frame(minHeight: 100)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
            }
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.cosmicBlack.opacity(0.4))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                text.isEmpty ? Color.lavenderMist.opacity(0.2) : Color.cosmicPurple.opacity(0.5),
                                lineWidth: 1
                            )
                    )
            )
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.cosmicBlack.opacity(0.3))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(Color.cosmicPurple.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

// MARK: - Interval Button
struct IntervalButton: View {
    let interval: Int
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text(intervalValue)
                    .font(.system(size: 20, weight: .bold, design: .rounded))

                Text(intervalUnit)
                    .font(.system(size: 12, weight: .medium))
                    .opacity(0.8)
            }
            .foregroundColor(isSelected ? .white : .lavenderMist.opacity(0.6))
            .frame(width: 70, height: 70)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(
                        isSelected
                        ? LinearGradient.cosmicCard
                        : LinearGradient(
                            colors: [Color.cosmicBlack.opacity(0.4)],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                isSelected ? Color.cosmicPurple.opacity(0.6) : Color.lavenderMist.opacity(0.2),
                                lineWidth: isSelected ? 2 : 1
                            )
                    )
            )
            .cosmicGlow(
                color: isSelected ? .cosmicPurple : .clear,
                radius: isSelected ? 8 : 0
            )
        }
    }

    private var intervalValue: String {
        if interval >= 60 {
            return "\(interval / 60)"
        }
        return "\(interval)"
    }

    private var intervalUnit: String {
        if interval >= 60 {
            return interval == 60 ? "min" : "mins"
        }
        return "sec"
    }
}

#Preview {
    AddManifestationView()
        .environment(ManifestationViewModel())
}
