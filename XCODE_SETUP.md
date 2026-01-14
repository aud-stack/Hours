# Xcode Setup Guide

Step-by-step instructions to set up the Manifestation iOS app in Xcode.

## Step 1: Create New Xcode Project

1. Open Xcode
2. Select **File > New > Project** (or press ⌘⇧N)
3. Choose **iOS > App** template
4. Click **Next**

### Project Configuration:
- **Product Name:** `Manifestation` (or your preferred name)
- **Team:** Select your development team
- **Organization Identifier:** `com.yourname` (or your identifier)
- **Bundle Identifier:** Will auto-generate (e.g., `com.yourname.Manifestation`)
- **Interface:** `SwiftUI`
- **Language:** `Swift`
- **Storage:** `SwiftData`
- **Include Tests:** Optional (recommended)

5. Click **Next**
6. Choose a location to save your project
7. Click **Create**

## Step 2: Configure Project Settings

1. Select the project in the Navigator (top item)
2. Select the target under **TARGETS**
3. Go to **General** tab:

### Deployment Info:
- **Minimum Deployments:** iOS 17.0
- **iPhone Orientation:**
  - ✅ Portrait
  - ✅ Upside Down
  - ❌ Landscape Left
  - ❌ Landscape Right
- **Supports multiple windows:** Unchecked
- **Requires full screen:** Checked

### Identity:
- **Display Name:** Manifestation
- **Bundle Identifier:** (auto-filled)
- **Version:** 1.0
- **Build:** 1

## Step 3: Add Source Files

### Delete Default Files:
1. Delete the default `ContentView.swift` (keep the main app file for now)
2. Delete the default app file (e.g., `ManifestationApp.swift` if it exists)

### Create Folder Structure:
In Xcode Navigator, create groups (folders):
- Right-click on project name > **New Group**
- Create these groups:
  - `Models`
  - `ViewModels`
  - `Views`
  - `Utilities`
  - `Services`

### Add Files to Each Group:

#### Root Level:
1. Add `ManifestationApp.swift` (replace the default)

#### Models Group:
1. Right-click `Models` > **New File**
2. Choose **Swift File**
3. Name it `Manifestation.swift`
4. Copy contents from provided `Manifestation.swift`

#### ViewModels Group:
1. Add new file: `ManifestationViewModel.swift`
2. Copy contents from provided file

#### Views Group:
1. Add new file: `ContentView.swift`
2. Add new file: `ManifestationCardView.swift`
3. Add new file: `AddManifestationView.swift`
4. Copy contents from provided files

#### Utilities Group:
1. Add new file: `Theme.swift`
2. Add new file: `HapticManager.swift`
3. Copy contents from provided files

#### Services Group:
1. Add new file: `TimerManager.swift`
2. Copy contents from provided file

## Step 4: Configure Info.plist

### Method 1: Replace Entire File
1. In Navigator, find `Info.plist`
2. Delete it
3. Right-click project > **Add Files to "Manifestation"**
4. Select the provided `Info.plist`
5. Ensure **"Copy items if needed"** is checked
6. Click **Add**

### Method 2: Manual Configuration
1. Open `Info.plist` in Xcode
2. Add these keys:

**Background Modes:**
- Click **+** next to **Information Property List**
- Add key: **"Required background modes"** (type: Array)
- Add two items:
  - Item 0: `fetch` (type: String)
  - Item 1: `processing` (type: String)

**User Interface Style:**
- Add key: **"User Interface Style"** (type: String)
- Value: `Dark`

## Step 5: Configure App Icon (Optional)

1. In Navigator, select **Assets.xcassets**
2. Select **AppIcon**
3. Drag and drop icon images for different sizes:
   - 1024x1024 (App Store)
   - 180x180 (iPhone 3x)
   - 120x120 (iPhone 2x)
   - etc.

### Create Simple Icon:
You can create a simple gradient icon with these colors:
- Background: `#4B0082` (Deep Indigo)
- Gradient to: `#8A2BE2` (Cosmic Purple)
- Symbol: Sparkles or Star

## Step 6: Build Settings

1. Select project > Select target > **Build Settings** tab
2. Search for key settings:

**Swift Language Version:**
- Ensure it's set to **Swift 5** or later

**Deployment:**
- **iOS Deployment Target:** 17.0

**Other Swift Flags:** (if needed for debugging)
- Debug: `-Xfrontend -debug-time-function-bodies` (optional, for build time analysis)

## Step 7: Signing & Capabilities

1. Select project > Select target > **Signing & Capabilities** tab

**Signing:**
- ✅ **Automatically manage signing**
- **Team:** Select your Apple Developer team
- **Provisioning Profile:** Automatic

**Capabilities:** (Optional, but recommended)
- Click **+ Capability**
- Add **Background Modes**
  - ✅ Background fetch
  - ✅ Background processing

## Step 8: Build and Run

### First Build:
1. Select a simulator from the device menu (e.g., iPhone 15 Pro)
2. Press **⌘R** (or click the Play button)
3. Wait for build to complete
4. App should launch in simulator

### Test on Device:
1. Connect your iPhone via USB
2. Trust the computer on your iPhone
3. Select your device from the device menu
4. Press **⌘R**
5. If needed, go to iPhone **Settings > General > VPN & Device Management**
6. Trust your developer certificate

## Step 9: Testing Features

### In Simulator:
✅ Create manifestations
✅ Tap to affirm
✅ Toggle auto-count
✅ View progress
✅ Mark as completed
✅ Delete manifestations
❌ Haptic feedback (not available in simulator)
⚠️ Background timers (limited in simulator)

### On Device:
✅ All simulator features
✅ Haptic feedback
✅ Background timers (better support)
✅ Real-world performance testing

## Common Issues & Solutions

### Issue: "No such module 'SwiftData'"
**Solution:** Ensure iOS deployment target is 17.0+

### Issue: SwiftData schema errors
**Solution:**
1. Product > Clean Build Folder (⌘⇧K)
2. Delete derived data: ~/Library/Developer/Xcode/DerivedData
3. Rebuild

### Issue: Preview crashes
**Solution:**
1. Add `#Preview` macro usage is correct
2. Ensure preview provides all required environment objects
3. Try restarting Xcode

### Issue: App crashes on launch
**Solution:**
1. Check console for error messages
2. Verify SwiftData model is correctly configured
3. Check that all files are added to target (File Inspector > Target Membership)

### Issue: Colors not showing correctly
**Solution:**
1. Verify hex color extension in Theme.swift
2. Check color scheme is set to dark mode
3. Test in both light and dark mode

### Issue: Timers not working
**Solution:**
1. Check Info.plist has background modes
2. Test on real device (simulators behave differently)
3. Verify TimerManager is properly initialized

## Optimization Tips

### Build Time:
- Use **File > New > Package** for large feature sets
- Enable **Build System > New Build System**
- Use incremental builds

### Performance:
- Profile with Instruments (⌘I)
- Check memory usage with Memory Graph
- Test on oldest supported device

### Preview Performance:
- Keep preview code minimal
- Use sample data
- Limit environment objects

## Xcode Shortcuts

**Essential:**
- ⌘R - Build and Run
- ⌘. - Stop
- ⌘B - Build
- ⌘⇧K - Clean Build Folder
- ⌘⇧O - Open Quickly (search files)
- ⌘⌥[ - Move line up
- ⌘⌥] - Move line down
- ⌘/ - Comment/Uncomment

**Preview:**
- ⌘⌥P - Resume Preview
- ⌘⌥Return - Show/Hide Preview

## Project File Checklist

Ensure all these files are in your project:

- [x] `ManifestationApp.swift` (Root)
- [x] `Info.plist` (Root)
- [x] `Models/Manifestation.swift`
- [x] `ViewModels/ManifestationViewModel.swift`
- [x] `Views/ContentView.swift`
- [x] `Views/ManifestationCardView.swift`
- [x] `Views/AddManifestationView.swift`
- [x] `Utilities/Theme.swift`
- [x] `Utilities/HapticManager.swift`
- [x] `Services/TimerManager.swift`

## Next Steps

After successful setup:

1. **Test all features** - Create, affirm, complete, delete
2. **Test on device** - Verify haptics and timers work
3. **Customize colors** - Edit Theme.swift to your preference
4. **Add app icon** - Create or design an icon
5. **Test backgrounds** - Verify timer continues in background
6. **Profile performance** - Use Instruments to check memory/CPU
7. **Add analytics** (optional) - Track usage patterns
8. **Prepare for App Store** (optional) - Screenshots, description, etc.

## Resources

- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [SwiftData Documentation](https://developer.apple.com/documentation/swiftdata)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols App](https://developer.apple.com/sf-symbols/)

---

**Need help?** Check the README.md for architecture details and troubleshooting.
