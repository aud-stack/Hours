# Quick Start Guide

Get the Manifestation app running in under 10 minutes!

## Prerequisites

- Mac with Xcode 15+ installed
- iOS 17.0+ simulator or device

## 5-Minute Setup

### 1. Create Project (2 min)
```
1. Open Xcode
2. File > New > Project
3. Choose: iOS > App
4. Configure:
   - Name: Manifestation
   - Interface: SwiftUI
   - Storage: SwiftData
   - Minimum iOS: 17.0
5. Click Create
```

### 2. Copy Source Files (2 min)
```
Drag and drop all files from ManifestationApp/ into Xcode:

📁 ManifestationApp/
   ├── 📄 ManifestationApp.swift    → Root level
   ├── 📄 Info.plist                → Root level
   ├── 📁 Models/
   │   └── 📄 Manifestation.swift
   ├── 📁 ViewModels/
   │   └── 📄 ManifestationViewModel.swift
   ├── 📁 Views/
   │   ├── 📄 ContentView.swift
   │   ├── 📄 ManifestationCardView.swift
   │   └── 📄 AddManifestationView.swift
   ├── 📁 Utilities/
   │   ├── 📄 Theme.swift
   │   └── 📄 HapticManager.swift
   └── 📁 Services/
       └── 📄 TimerManager.swift

✅ Make sure "Copy items if needed" is checked
✅ Make sure "Create groups" is selected
✅ Add to target: Manifestation
```

### 3. Build & Run (1 min)
```
1. Select iPhone simulator (e.g., iPhone 15 Pro)
2. Press ⌘R (or click Play button)
3. Wait for build
4. App launches! 🎉
```

## First Use

### Create Your First Manifestation:
1. Tap the **+** button in top-right
2. Fill out the form:
   - **Title:** "Financial Abundance"
   - **Affirmation:** "Money flows to me easily"
   - **Target:** "1000"
   - **Interval:** "5 seconds"
3. Tap **Create Manifestation**

### Test Features:
- 👆 **Tap "Affirm" button** - Watch counter increment
- ⏱️ **Toggle "Auto-On"** - Counter increments automatically
- 📊 **Watch progress bar** - Fills as you reach target
- ✅ **Mark as Manifested** - Use menu (⋯) to complete
- 🗑️ **Delete** - Use menu to remove

## Common Issues

### "No such module 'SwiftData'"
→ Set iOS Deployment Target to 17.0 in Project Settings

### Preview not working
→ Press ⌘⌥P to resume preview

### Build errors
→ Clean build folder (⌘⇧K) and rebuild

### Haptics not working
→ Haptics only work on real devices, not simulators

## Test on Your iPhone

1. Connect iPhone via USB
2. Select your device from device menu
3. Press ⌘R
4. Trust developer certificate on iPhone (Settings > General > VPN & Device Management)
5. App runs with full haptic feedback! 📱

## Customization

### Change Colors (1 min):
Edit `Utilities/Theme.swift`:
```swift
static let cosmicPurple = Color(hex: "FF1493") // Hot Pink!
```

### Change Intervals (1 min):
Edit `Views/AddManifestationView.swift`:
```swift
let intervalOptions = [1, 5, 10, 30, 60, 300] // Add 5 minutes
```

### Change App Name (1 min):
1. Select project in Navigator
2. Select target > General
3. Change Display Name

## What's Next?

- 📖 Read [README.md](README.md) for full feature list
- 🛠️ Read [XCODE_SETUP.md](XCODE_SETUP.md) for detailed setup
- 🎨 Customize the theme to your preference
- 🚀 Add your own features!

## Key Features

| Feature | Description |
|---------|-------------|
| **Manual Count** | Tap button with haptic feedback |
| **Auto-Count** | Automatic increment at intervals |
| **Progress Bars** | Visual tracking with gradients |
| **Completion** | Mark goals as manifested |
| **Persistence** | SwiftData saves everything |
| **Background** | Timers work in background |
| **Dark Theme** | Cosmic purple aesthetic |
| **Haptics** | Rich feedback (device only) |

## File Overview

### Must-Have Files:
- ✅ `ManifestationApp.swift` - App entry point
- ✅ `Manifestation.swift` - Data model
- ✅ `ManifestationViewModel.swift` - Business logic
- ✅ `ContentView.swift` - Main screen
- ✅ `ManifestationCardView.swift` - Card UI
- ✅ `AddManifestationView.swift` - Create form
- ✅ `Theme.swift` - Colors & styles
- ✅ `HapticManager.swift` - Haptic feedback
- ✅ `TimerManager.swift` - Auto-count system
- ✅ `Info.plist` - App configuration

### Documentation (Optional):
- 📖 `README.md` - Full documentation
- 📖 `XCODE_SETUP.md` - Detailed Xcode guide
- 📖 `QUICKSTART.md` - This file!

## Architecture Quick Ref

```
User Tap
   ↓
ViewModel (handles logic)
   ↓
SwiftData Model (updates data)
   ↓
Persistence (saves to disk)
   ↓
View Updates (@Observable)
   ↓
User Sees Change
```

## Keyboard Shortcuts

- ⌘R - Build & Run
- ⌘. - Stop
- ⌘⇧K - Clean Build
- ⌘⇧O - Open Quickly
- ⌘/ - Comment

## Support

### Build Issues:
1. Clean build folder (⌘⇧K)
2. Delete derived data
3. Restart Xcode
4. Check all files are added to target

### Runtime Issues:
1. Check console for errors
2. Verify iOS 17.0+ deployment
3. Test on device, not just simulator

## Success Checklist

- [x] Project created in Xcode
- [x] All source files copied
- [x] App builds without errors
- [x] Can create new manifestation
- [x] Can tap to affirm (counter increases)
- [x] Can toggle auto-count
- [x] Can mark as completed
- [x] Can delete manifestation
- [x] Data persists after closing app

## Congratulations! 🎉

You now have a fully functional manifestation tracking app with:
- Beautiful cosmic UI
- Smooth animations
- Haptic feedback
- Auto-counting
- Data persistence

**Ready to manifest your dreams!** ✨

---

Need more details? Check out:
- [README.md](README.md) - Complete documentation
- [XCODE_SETUP.md](XCODE_SETUP.md) - Step-by-step Xcode guide
