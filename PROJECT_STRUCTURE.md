# Project Structure

Complete file tree structure for the Manifestation iOS app.

## Directory Tree

```
Hours/
├── ManifestationApp/                      # Main app source code
│   ├── ManifestationApp.swift            # App entry point with SwiftData setup
│   ├── Info.plist                         # App configuration & background modes
│   │
│   ├── Models/                            # Data models
│   │   └── Manifestation.swift           # SwiftData model for manifestations
│   │
│   ├── ViewModels/                        # Business logic layer
│   │   └── ManifestationViewModel.swift  # Main view model with CRUD operations
│   │
│   ├── Views/                             # SwiftUI views
│   │   ├── ContentView.swift             # Main app view with tabs & layout
│   │   ├── ManifestationCardView.swift   # Individual manifestation card
│   │   └── AddManifestationView.swift    # Form to create new manifestation
│   │
│   ├── Utilities/                         # Helper utilities
│   │   ├── Theme.swift                    # Colors, fonts, gradients, animations
│   │   └── HapticManager.swift           # Haptic feedback management
│   │
│   └── Services/                          # Business services
│       └── TimerManager.swift            # Timer management for auto-count
│
├── Documentation/                          # Project documentation
│   ├── README.md                          # Complete project documentation
│   ├── XCODE_SETUP.md                    # Detailed Xcode setup guide
│   ├── QUICKSTART.md                     # Quick 5-minute setup guide
│   └── PROJECT_STRUCTURE.md              # This file
│
└── hours-mockup.html                      # Original web mockup (reference)
```

## File Details

### Root Level

#### `ManifestationApp.swift` (51 lines)
**Purpose:** App entry point and SwiftData container setup
**Key Components:**
- `@main` app struct
- SwiftData ModelContainer configuration
- ViewModel initialization
- Dark mode preference

#### `Info.plist` (56 lines)
**Purpose:** iOS app configuration
**Key Settings:**
- Background modes (fetch, processing)
- UI orientation settings
- Dark mode preference
- App metadata

---

### Models Layer

#### `Manifestation.swift` (98 lines)
**Purpose:** Core data model with SwiftData
**Properties:**
- `id: UUID` - Unique identifier
- `title: String` - Manifestation title
- `affirmation: String` - Affirmation text
- `currentCount: Int` - Current progress
- `targetCount: Int` - Goal target
- `isCompleted: Bool` - Completion status
- `isAutoCountEnabled: Bool` - Auto-count state
- `autoCountInterval: Int` - Seconds between auto-counts
- `createdAt: Date` - Creation timestamp
- `completedAt: Date?` - Completion timestamp
- `lastAutoCountDate: Date?` - Last auto-increment time

**Methods:**
- `incrementCount()` - Increase counter by 1
- `toggleAutoCount()` - Enable/disable auto-count
- `markAsCompleted()` - Mark as manifested
- `toggleCompletion()` - Toggle completion state

**Computed Properties:**
- `progress: Double` - Progress percentage (0.0-1.0)

---

### ViewModels Layer

#### `ManifestationViewModel.swift` (150 lines)
**Purpose:** Business logic and state management
**Responsibilities:**
- Manage manifestations array
- CRUD operations (Create, Read, Update, Delete)
- Timer coordination
- Background count processing
- SwiftData persistence

**Key Methods:**
- `setup(with:)` - Initialize with ModelContext
- `fetchManifestations()` - Load from database
- `addManifestation()` - Create new manifestation
- `updateManifestation()` - Update existing
- `deleteManifestation()` - Remove manifestation
- `incrementCount()` - Manual count increment
- `toggleAutoCount()` - Toggle auto-counting
- `toggleCompletion()` - Toggle manifested state
- `processBackgroundCounts()` - Calculate missed counts

**Computed Properties:**
- `activeManifestations` - Non-completed items
- `completedManifestations` - Completed items

---

### Views Layer

#### `ContentView.swift` (235 lines)
**Purpose:** Main app view with navigation and tabs
**Components:**
- `ContentView` - Root view with cosmic background
- `HeaderView` - App title and add button
- `TabSelector` - Active/Completed tabs
- `TabButton` - Individual tab button
- `EmptyStateView` - Empty state placeholder
- `CosmicBackground` - Animated gradient background

**Features:**
- Tab switching (Active/Completed)
- Add manifestation sheet
- Animated transitions
- Empty states

#### `ManifestationCardView.swift` (310 lines)
**Purpose:** Individual manifestation card UI
**Components:**
- `ManifestationCardView` - Main card container
- `AffirmButton` - Tap to affirm button with ripple
- `AutoCountToggle` - Auto-count toggle button
- `RippleEffect` - Ripple animation model
- `PressButtonStyle` - Button press animation

**Features:**
- Title and affirmation display
- Progress bar with gradient
- Count display
- Affirm button with haptics
- Auto-count toggle
- Completion menu
- Delete confirmation

#### `AddManifestationView.swift` (280 lines)
**Purpose:** Form to create new manifestations
**Components:**
- `AddManifestationView` - Main form view
- `CosmicTextField` - Styled text input
- `CosmicTextEditor` - Multi-line text input
- `IntervalButton` - Auto-count interval selector

**Form Fields:**
- Title (text field)
- Affirmation (text editor)
- Target count (number field)
- Auto-count interval (button selector)

**Features:**
- Form validation
- Interval selection (1s-60s)
- Cosmic themed inputs
- Create button with validation

---

### Utilities Layer

#### `Theme.swift` (175 lines)
**Purpose:** App-wide design system
**Contains:**

**Colors:**
- `cosmicPurple` - Primary purple (#8A2BE2)
- `deepIndigo` - Dark indigo (#4B0082)
- `darkSlateBlue` - Slate blue (#483D8B)
- `mysticPurple` - Medium purple (#9370DB)
- `galaxyViolet` - Medium slate blue (#7B68EE)
- `cosmicBlack` - Deep black (#0A0A0F)
- `lavenderMist` - Light lavender (#E6E6FA)
- `starWhite` - Ghost white (#F8F8FF)

**Gradients:**
- `cosmicBackground` - Main background gradient
- `cosmicCard` - Card background gradient
- `etherealGlow` - Ethereal overlay gradient
- `progressGradient` - Progress bar gradient

**Fonts:**
- `cosmicTitle()` - Large serif titles
- `cosmicHeadline()` - Medium serif headings
- `cosmicBody()` - Regular serif body
- `cosmicCaption()` - Small rounded captions

**View Modifiers:**
- `cosmicGlow()` - Glowing shadow effect
- `etherealShadow()` - Layered shadow effect

**Animations:**
- `cosmic` - Spring animation
- `ethereal` - Ease in/out animation
- `gentle` - Quick ease animation

**Helpers:**
- `Color(hex:)` - Initialize color from hex string

#### `HapticManager.swift` (65 lines)
**Purpose:** Centralized haptic feedback
**Haptic Types:**
- `affirmationTap()` - Medium impact (for affirm button)
- `manifestationCompleted()` - Success notification
- `selection()` - Selection feedback (for toggles)
- `warning()` - Warning notification (for deletes)
- `lightTap()` - Light impact
- `heavyTap()` - Heavy impact
- `softTap()` - Soft impact
- `rigidTap()` - Rigid impact

**View Extension:**
- `hapticTap(_:)` - Easy haptic on tap gesture

---

### Services Layer

#### `TimerManager.swift` (105 lines)
**Purpose:** Timer management with background support
**Responsibilities:**
- Manage multiple concurrent timers
- Handle background execution
- Calculate missed counts on resume
- Monitor app lifecycle

**Key Methods:**
- `startTimer(for:interval:action:)` - Start auto-count timer
- `stopTimer(for:)` - Stop specific timer
- `stopAllTimers()` - Stop all timers
- `isTimerActive(for:)` - Check timer state
- `calculateBackgroundCounts()` - Calculate missed increments

**Features:**
- Background task management
- Notification observers for app state
- Efficient timer cleanup

---

## File Statistics

| Category | Files | Total Lines |
|----------|-------|-------------|
| Models | 1 | ~100 |
| ViewModels | 1 | ~150 |
| Views | 3 | ~825 |
| Utilities | 2 | ~240 |
| Services | 1 | ~105 |
| Configuration | 2 | ~100 |
| **Total** | **10** | **~1,520** |

---

## Code Organization Principles

### 1. **Separation of Concerns**
- Models: Pure data structures
- ViewModels: Business logic only
- Views: Presentation only
- Utilities: Reusable helpers
- Services: External interactions

### 2. **MVVM Architecture**
```
View ←→ ViewModel ←→ Model
         ↓
    Services/Utilities
```

### 3. **SwiftUI Best Practices**
- `@Observable` for view models
- `@Environment` for dependency injection
- Proper state management
- Reusable components
- Preview support

### 4. **File Naming Conventions**
- Models: Singular noun (e.g., `Manifestation.swift`)
- Views: Descriptive + "View" (e.g., `ContentView.swift`)
- ViewModels: Model + "ViewModel" (e.g., `ManifestationViewModel.swift`)
- Managers: Purpose + "Manager" (e.g., `TimerManager.swift`)

### 5. **Code Comments**
- MARK comments for section organization
- Documentation comments for public APIs
- Inline comments for complex logic

---

## Dependencies

### External Frameworks: None!
The app uses only built-in iOS frameworks:
- SwiftUI (UI framework)
- SwiftData (Persistence)
- Foundation (Core utilities)
- UIKit (Haptics, background tasks)
- Combine (Reactive programming - minimal use)

### iOS Version Requirements:
- **Minimum:** iOS 17.0
- **Reason:** SwiftData requires iOS 17+

---

## Build Products

When built, Xcode will generate:
```
DerivedData/
└── Manifestation/
    ├── Build/
    │   └── Products/
    │       └── Debug-iphonesimulator/
    │           └── Manifestation.app
    └── Index/
```

## Assets (To Be Created in Xcode)

While not included in this source distribution, you'll need to create in Xcode:

```
Assets.xcassets/
├── AppIcon.appiconset/        # App icons (various sizes)
├── AccentColor.colorset/      # Tint color (purple)
└── LaunchScreen.colorset/     # Launch screen color
```

---

## Git Structure

Recommended `.gitignore`:
```
# Xcode
*.xcuserstate
xcuserdata/
DerivedData/
*.xcworkspace/xcuserdata/

# SwiftData
*.sqlite
*.sqlite-shm
*.sqlite-wal

# Swift Package Manager
.swiftpm/

# CocoaPods (if used)
Pods/

# Build products
*.ipa
*.dSYM.zip
```

---

## Next Steps

1. **Review:** Read through each file to understand architecture
2. **Setup:** Follow QUICKSTART.md or XCODE_SETUP.md
3. **Customize:** Modify Theme.swift to personalize
4. **Extend:** Add new features to the solid foundation
5. **Ship:** Build and share your manifestation app!

---

**Total Project Complexity:** Moderate
**Estimated Setup Time:** 10 minutes
**Estimated Learning Time:** 2-4 hours
**Production Ready:** Yes

Built with clean architecture, modern Swift, and best practices. 🚀
