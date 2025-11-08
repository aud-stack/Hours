# Hours - Windows Setup Guide

## Important: Directory Structure

The React Native app is in the **nested `Hours/` directory**, not the root!

```
Hours/                  ← Root repo (has README.md)
└── Hours/              ← ⭐ THE APP IS HERE (has package.json)
    ├── package.json
    ├── App.tsx
    └── src/
```

## Prerequisites for Windows

1. **Node.js** ✓ (You have this installed)
2. **Git** (for cloning)
3. **Android Studio** (for Android development)
4. **JDK 17** (for React Native)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone -b claude/hours-devotion-app-mvp-011CUuRH3u2JDG1XUkL7DNwv https://github.com/aud-stack/Hours.git
cd Hours
```

### 2. Navigate to the App Directory

```bash
# THIS IS CRITICAL - You need to go into the nested Hours folder
cd Hours
```

### 3. Verify You're in the Right Place

Check that you see `package.json`:

```bash
dir package.json
# or
ls package.json
```

You should see output showing the file exists. If you get "file not found", you're in the wrong directory!

### 4. Install Dependencies

```bash
npm install
```

## Running on Android (Windows)

### Install Android Studio First

1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. Open Android Studio → More Actions → SDK Manager
4. Install:
   - Android SDK Platform 34 (or latest)
   - Android SDK Build-Tools
   - Android Emulator

### Set Environment Variables (Windows)

Add to System Environment Variables:

```
ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
```

Add to Path:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

### Install JDK 17

Download from: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

Set `JAVA_HOME` environment variable to JDK installation path.

### Run the App

```bash
# Start Metro bundler
npm start

# In a new terminal (in the Hours/Hours/ directory)
npm run android
```

## Running on iOS (Requires Mac)

Unfortunately, iOS development requires:
- macOS computer
- Xcode installed
- CocoaPods installed

If you only have Windows, you have these options:
1. Use Android emulator (see above)
2. Use a Mac in the cloud (MacStadium, AWS Mac instances)
3. Test on a physical Android device

## Testing on Physical Android Device

1. Enable Developer Options on your Android phone
2. Enable USB Debugging
3. Connect phone via USB
4. Run `adb devices` to verify connection
5. Run `npm run android`

## Troubleshooting

### "package.json not found"
- You're in the wrong directory
- Make sure you're in `Hours/Hours/`, not just `Hours/`
- Run `cd Hours` one more time

### "Metro bundler not found"
- Make sure you ran `npm install` in the `Hours/Hours/` directory

### "Android SDK not found"
- Install Android Studio
- Set ANDROID_HOME environment variable
- Restart your terminal/computer

### "Could not find Java"
- Install JDK 17
- Set JAVA_HOME environment variable

## Quick Test (Without Running the App)

To verify the setup is correct:

```bash
# In Hours/Hours/ directory
npm install
npx react-native doctor
```

This will check if all dependencies are properly installed.

## Alternative: Expo Version

If Android Studio setup is too complex, I can convert this to an Expo project which is much easier to run on Windows. Let me know if you'd prefer that route!

## File Checklist

When you're in the correct `Hours/Hours/` directory, you should see:

- ✓ package.json
- ✓ App.tsx
- ✓ src/ folder
- ✓ ios/ folder
- ✓ android/ folder
- ✓ tsconfig.json
- ✓ babel.config.js

If you don't see these files, you're in the wrong directory!

## Need Help?

If you're still having issues locating the files:

1. Download the ZIP from GitHub
2. Extract it
3. Look for the nested `Hours/Hours/` folder
4. That's where `package.json` and all the app code lives
