# Hours Expo - Quick Start Guide

## ✨ You can now test Hours on your phone in 5 minutes!

### Step 1: Download Expo Go on Your Phone

**iPhone:**
- Open App Store
- Search for "Expo Go"
- Install the app

**Android:**
- Open Google Play Store
- Search for "Expo Go"
- Install the app

### Step 2: Clone and Setup (Windows)

```bash
# Clone the repository
git clone -b claude/hours-devotion-app-mvp-011CUuRH3u2JDG1XUkL7DNwv https://github.com/aud-stack/Hours.git

# Navigate to the Expo project
cd Hours/HoursExpo

# Install dependencies
npm install
```

### Step 3: Start the Development Server

```bash
# Start Expo
npx expo start
```

You'll see a QR code appear in your terminal!

### Step 4: Scan the QR Code

**iPhone:**
- Open the Camera app
- Point it at the QR code
- Tap the notification to open in Expo Go

**Android:**
- Open the Expo Go app
- Tap "Scan QR Code"
- Scan the QR code on your screen

### Step 5: Test the App!

The app will load on your phone. You can now:

1. **Create your first project** (Novel Draft, Marathon Training, etc.)
2. **Start a session** - Watch the accumulated light timer gradually change from dark purple to golden amber!
3. **Complete a session** - Add mood tags and reflections
4. **View insights** - See your devotion personality and patterns

## Features to Test

### 🌅 Accumulated Light Timer
- Start a timer and watch it slowly brighten
- Dark purple/blue → Golden amber gradient
- Changes every 30 seconds
- Message updates as you work

### 📊 Three-Tab Navigation
- **Home**: Spotlight project with quick start
- **Projects**: All active and completed projects
- **Insights**: Your "Wrapped" with personality type

### 🎨 Brand Colors
- Purple/indigo gradients (`#667eea → #764ba2`)
- Golden amber accents (`#fbbf24 → #f97316`)
- Warm, minimal, grounded aesthetic

### 💾 Local Storage
- All data saves automatically
- No internet required
- Complete privacy

## Troubleshooting

**QR code not scanning?**
- Make sure your phone and computer are on the same WiFi
- Try pressing `a` (Android) or `i` (iOS) in the terminal instead

**App not loading?**
```bash
# Clear cache and restart
npx expo start -c
```

**Want to see changes live?**
- The app will auto-reload when you save files
- Shake your phone to open the developer menu

**Building a standalone app?**
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for your phone
npx eas build --platform android
# or
npx eas build --platform ios
```

## Project Structure

```
HoursExpo/
├── App.tsx                 # Entry point
├── src/
│   ├── navigation/         # Tab + Stack navigation
│   ├── screens/            # All 8 screens
│   │   ├── HomeScreen.tsx
│   │   ├── TimerScreen.tsx      # ⭐ Accumulated light!
│   │   ├── MoodCheckScreen.tsx
│   │   ├── ProjectsScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   └── ...
│   ├── services/           # Local storage
│   ├── types/              # TypeScript types
│   └── utils/              # Time helpers
└── package.json
```

## What's Different from Bare React Native?

✅ **No Android Studio needed** - Expo Go handles everything
✅ **No Xcode needed** - Works on Windows!
✅ **Instant testing** - QR code to phone in seconds
✅ **Live reload** - See changes instantly
✅ **Easy builds** - Use EAS to create production apps

## Tech Stack

- **Expo SDK 54** - Cross-platform framework (Latest!)
- **React Native 0.76** - Native UI components
- **React Navigation** - Tab + Stack navigation
- **Expo Linear Gradient** - Accumulated light effect
- **AsyncStorage** - Local data storage
- **TypeScript** - Type safety

## Need Help?

1. Check the main README: `Hours/README.md`
2. See Windows setup: `Hours/WINDOWS_SETUP.md`
3. View mockups: `Hours/hours-mockup-complete.html`

---

**Ready to track your devotion?** 🚀

"Your hours shape you."
