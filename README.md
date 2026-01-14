# Manifestation - iOS App

A native iOS manifestation tracker app built with Swift and SwiftUI, designed to help users track their Law of Assumption goals with a beautiful cosmic purple theme.

## Features

### Core Functionality
- ✨ **Create Manifestation Goals** - Set title, affirmation text, target count, and auto-count interval
- 👆 **Manual Tap-to-Affirm** - Beautiful button with haptic feedback and ripple effect animation
- ⏱️ **Auto-Count System** - Automatically increment counters at customizable intervals (1s, 2s, 3s, 5s, 10s, 30s, 60s)
- 📊 **Visual Progress Tracking** - Elegant progress bars with gradient effects
- ✅ **Completion System** - Mark goals as "manifested" which moves them to a completed section
- 🗑️ **Delete Goals** - Remove manifestations with confirmation
- 💾 **Local Persistence** - All data stored locally using SwiftData

### Design & UX
- 🌌 **Cosmic Purple Theme** - Deep purples, indigos, and ethereal gradients
- 🎨 **Dark Mode Optimized** - Beautiful in dark mode by default
- 📱 **Responsive Layout** - Optimized for all iPhone sizes with proper safe area handling
- ✨ **Smooth Animations** - Spring animations and transitions throughout
- 🔊 **Haptic Feedback** - Rich haptic feedback for all interactions
- 🌟 **Glowing Effects** - Cosmic glow effects on interactive elements

### Technical Features
- 📦 **SwiftData** - Modern data persistence
- ⏲️ **Background Timers** - Auto-count works even when app is backgrounded
- 🏗️ **Clean Architecture** - MVVM pattern with separation of concerns
- 🎯 **SF Symbols** - Native iOS icons throughout
- 📐 **Proper Safe Areas** - Handles notched iPhones correctly

## Project Structure

```
ManifestationApp/
├── ManifestationApp.swift          # App entry point
├── Models/
│   └── Manifestation.swift         # SwiftData model
├── ViewModels/
│   └── ManifestationViewModel.swift # Business logic & data management
├── Views/
│   ├── ContentView.swift           # Main app view with tabs
│   ├── ManifestationCardView.swift # Manifestation card component
│   └── AddManifestationView.swift  # Add/create form
├── Utilities/
│   ├── Theme.swift                 # Colors, fonts, gradients, animations
│   └── HapticManager.swift         # Haptic feedback management
├── Services/
│   └── TimerManager.swift          # Auto-count timer system
└── Info.plist                      # App configuration
```

## Setup Instructions

### Prerequisites
- macOS 14.0 or later
- Xcode 15.0 or later
- iOS 17.0+ deployment target

### Building the App

1. **Create a new Xcode project:**
   ```
   File > New > Project > iOS > App
   - Product Name: Manifestation
   - Interface: SwiftUI
   - Language: Swift
   - Storage: SwiftData
   - Minimum Deployments: iOS 17.0
   ```

2. **Copy the source files:**
   - Copy all files from `ManifestationApp/` into your Xcode project
   - Maintain the folder structure (Models, ViewModels, Views, etc.)
   - Replace the default `ContentView.swift` and app file with the provided ones

3. **Configure Info.plist:**
   - Replace the default Info.plist with the provided one
   - Or manually add the background modes:
     - `fetch`
     - `processing`

4. **Build and Run:**
   - Select an iPhone simulator or device
   - Press ⌘R to build and run

### Testing

The app includes sample data for previews. You can test:
- Creating new manifestations
- Tapping to affirm (watch for haptic feedback on device)
- Enabling/disabling auto-count
- Marking as completed
- Deleting manifestations

## App Architecture

### Data Flow
```
User Action → ViewModel → SwiftData Model → Save to Disk
                ↓
              View Update (via @Observable)
```

### Key Components

#### 1. Manifestation Model (`Manifestation.swift`)
- SwiftData model with persistence
- Properties: title, affirmation, counts, auto-count settings
- Computed properties for progress calculation
- Helper methods for increment, toggle, and completion

#### 2. ManifestationViewModel (`ManifestationViewModel.swift`)
- `@Observable` class managing app state
- CRUD operations for manifestations
- Timer coordination with `TimerManager`
- Background count processing
- SwiftData context management

#### 3. Theme System (`Theme.swift`)
- Custom color palette with cosmic purples
- Gradient definitions
- Custom font styles (serif for elegance)
- Shadow/glow effects as view modifiers
- Animation presets

#### 4. TimerManager (`TimerManager.swift`)
- Manages multiple concurrent timers
- Background execution support
- Calculates missed counts when app returns from background
- Notification observers for app lifecycle

#### 5. HapticManager (`HapticManager.swift`)
- Centralized haptic feedback
- Different haptic types for different actions
- View extension for easy access

## Color Palette

The cosmic purple theme uses these colors:

- **Primary Purple:** `#8A2BE2` (BlueViolet)
- **Deep Indigo:** `#4B0082` (Indigo)
- **Dark Slate Blue:** `#483D8B`
- **Mystic Purple:** `#9370DB` (MediumPurple)
- **Galaxy Violet:** `#7B68EE` (MediumSlateBlue)
- **Cosmic Black:** `#0A0A0F` (Deep space background)
- **Lavender Mist:** `#E6E6FA` (Light accents)

## Features Breakdown

### Manual Affirmation
- Large, prominent "Affirm" button
- Ripple animation effect on tap
- Medium impact haptic feedback
- Cosmic glow effect
- Real-time counter update

### Auto-Count System
- Toggle button with visual state
- Interval options: 1s, 2s, 3s, 5s, 10s, 30s, 60s
- Continues in background (limited by iOS)
- Calculates missed counts on app resume
- Auto-stops when target reached

### Progress Visualization
- Large count display with glow effect
- Percentage badge
- Animated gradient progress bar
- Smooth animations on updates

### Completion Flow
- Menu option to mark as manifested
- Success haptic feedback
- Moves to "Completed" tab
- Can be unmarked if needed
- Auto-stops timers on completion

## Background Execution

The app uses iOS background execution with these limitations:

1. **Background Fetch** - iOS allows limited background time
2. **Timer Calculation** - On app resume, calculates elapsed time and adds missed counts
3. **Background Task** - Requests extra execution time when app enters background

Note: iOS significantly limits background execution to preserve battery. The app handles this by:
- Tracking last count date
- Calculating missed intervals on resume
- Adding all missed counts at once

## Customization

### Changing Colors
Edit `Theme.swift` to customize the color palette:
```swift
static let cosmicPurple = Color(hex: "YOUR_HEX")
```

### Adding New Intervals
Edit `AddManifestationView.swift`:
```swift
let intervalOptions = [1, 2, 3, 5, 10, 30, 60, 120] // Add 120s
```

### Adjusting Animations
Edit animation presets in `Theme.swift`:
```swift
static let cosmic = Animation.spring(response: 0.6, dampingFraction: 0.7)
```

## Performance Considerations

- SwiftData handles caching and performance
- Timers are managed efficiently with single instances
- Views use proper state management to avoid unnecessary redraws
- Background processing is optimized for battery life
- Large lists use ScrollView with lazy loading

## Future Enhancements

Potential features to add:
- [ ] Local notifications when manifestations complete
- [ ] Statistics and insights view
- [ ] Export/import manifestations
- [ ] iCloud sync across devices
- [ ] Widgets for home screen
- [ ] Apple Watch companion app
- [ ] Siri shortcuts integration
- [ ] Custom affirmation categories
- [ ] Audio affirmations
- [ ] Biometric lock for privacy

## Troubleshooting

### Build Errors
- Ensure iOS deployment target is 17.0+
- Check that all files are added to the target
- Clean build folder (⌘⇧K) and rebuild

### SwiftData Issues
- Delete app from simulator/device to reset database
- Check model configuration in `ManifestationApp.swift`

### Timer Not Working
- Check Info.plist for background modes
- Verify app has proper permissions
- Test on real device (simulators have different behavior)

### Haptics Not Working
- Haptics only work on physical devices
- Ensure device haptic settings are enabled
- Check device supports haptic feedback

## Credits

Built with:
- Swift 5.9+
- SwiftUI
- SwiftData
- SF Symbols

## License

This is a demonstration project. Feel free to use and modify as needed.

---

**Built with ✨ and the Law of Assumption**
