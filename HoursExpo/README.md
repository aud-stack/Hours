# Hours - Expo Version

**"Your hours shape you."**

This is the Expo version of Hours - a devotion tracking app for intentional creators.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- A smartphone (iOS or Android) with Expo Go app installed

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Your Phone

1. Download **Expo Go** app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Start the Expo server:
   ```bash
   npx expo start
   ```

3. Scan the QR code:
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

The app will load on your phone and you can start using it immediately!

## Features

✅ **Accumulated Light Timer** - Gradual gradient from dark purple to golden amber
✅ **Project Management** - Create and track multiple projects
✅ **Mood Check** - Post-session reflection with custom tags
✅ **Insights/Wrapped** - See your patterns and devotion personality
✅ **Local Storage** - All data stays on your device

## Brand Colors

- **Purple/Indigo**: `#667eea → #764ba2` (primary gradient)
- **Golden Amber**: `#fbbf24 → #f97316` (accumulated light)
- **Soft Grays**: `#f5f7fa, #e8ecf1` (backgrounds)
- **Text**: `#1a1a1a` (dark), `#64748b` (muted)

## Philosophy

Hours rejects hustle culture. We believe:
- Your hours show who you are *right now*
- Devotion over discipline
- Evidence over aspiration
- Privacy over sharing

## Troubleshooting

**QR code not working?**
- Make sure your phone and computer are on the same WiFi network
- Try pressing `a` for Android or `i` for iOS in the terminal

**App not loading?**
- Clear the Expo cache: `npx expo start -c`
- Make sure Expo Go is updated to the latest version

**Want to build a standalone app?**
```bash
# Build for Android
npx eas build --platform android

# Build for iOS (requires Apple Developer account)
npx eas build --platform ios
```

## Tech Stack

- **Expo SDK 54** (Latest!)
- **React Native 0.76**
- **React Navigation** (tabs + stack)
- **Expo Linear Gradient** (accumulated light effect)
- **AsyncStorage** (local data)
- **TypeScript** (type safety)

---

Built with intention for creators who show up to their work, day after day.

*"Every hour spent is who you are—right now."*
