import SwiftUI
import SwiftData

@main
struct ManifestationApp: App {
    @State private var viewModel = ManifestationViewModel()

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Manifestation.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(viewModel)
                .modelContainer(sharedModelContainer)
                .onAppear {
                    setupViewModel()
                }
                .preferredColorScheme(.dark) // Default to dark mode for cosmic theme
        }
    }

    private func setupViewModel() {
        let context = sharedModelContainer.mainContext
        viewModel.setup(with: context)
    }
}
