# Hours

**"Your hours shape you."**

Hours is a devotion tracking app for intentional creators. Think "Letterboxd for your life's work." It's not a productivity optimizer or streak keeper—it's a mirror showing you that you already are what you're becoming.

![Hours App](hours-mockup.html)

## Philosophy

Hours helps people build identity through evidence of devotion. We reject hustle culture optimization and instead focus on:

- **Presence over productivity** - Track what matters, not what measures well
- **Identity through evidence** - Your hours show who you are, right now
- **Devotion, not discipline** - This isn't about forcing habits, it's about honoring your work
- **Privacy first** - All data stays local. No cloud sync, no tracking, no surveillance

## Core Features

### 1. Project-Based Tracking
Create projects for the work that matters:
- Novel drafts, marathon training, portfolio building
- Custom mood tags for each project type
- Spotlight system to highlight your current focus
- Complete projects with celebration rituals

### 2. Accumulated Light Timer ✨
The signature feature. A meditative session timer that:
- Starts with deep purple/blue gradients
- Gradually brightens to golden amber tones every 30 seconds
- Shows elapsed time and gentle encouragement
- Creates a calm, immersive focus environment

### 3. Post-Session Mood Check
Quick, tap-based reflection after each session:
- Project-specific mood tags (Flowing, Blocked, Inspired, Focused, etc.)
- Energy level slider (1-5)
- Session type selection (Deep Work, Editing, Practice, etc.)
- Optional location tags (user-created, NOT GPS)
- Optional reflection notes

### 4. Three-Tab Navigation
- **Home**: Your Spotlight project with quick start
- **Projects**: Active and archived project list
- **Insights**: Your personal "Wrapped" - patterns, personality type, top stats

### 5. Insights & Wrapped
Generate your story anytime:
- Total hours devoted across all projects
- Devotion personality type (e.g., "Morning Tuesday Flow-Seeker")
- Preferred work times and days
- Most common moods
- Shareable graphics (coming soon)

### 6. Completion Ritual
When you mark a project complete:
- Confetti celebration
- Summary of hours devoted and sessions completed
- Highlights like "You pushed through 15 tired sessions"
- Shareable completion certificate
- Project moves to archive

## Design Language

**Visual Identity:**
- Adjectives: Intentional, grounded, warm, honest, present
- Colors: Neutral grays, warm whites, purple/indigo gradients, golden amber accents
- Typography: Modern humanist sans-serif, large confident numbers
- Motion: Slow, intentional, calm (ripples, fades, gradual light)

**Voice & Copy Examples:**
- "Your hours shape you."
- "Another hour in devotion."
- "Every hour spent is who you are—right now."
- "The story's unfolding."
- "You showed up anyway."

## Tech Stack

- **React Native** - Cross-platform (iOS first, Android later)
- **TypeScript** - Type-safe development
- **React Navigation** - Tab and stack navigation
- **AsyncStorage** - Local data persistence
- **React Native Reanimated** - Smooth animations
- **Linear Gradient** - Beautiful gradient effects

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)
- React Native CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Hours.git
   cd Hours/Hours
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

### Development

- **Start Metro**: `npm start`
- **Run iOS**: `npm run ios`
- **Run Android**: `npm run android` (coming soon)
- **Run tests**: `npm test`
- **Lint code**: `npm run lint`

## Project Structure

```
Hours/
├── src/
│   ├── screens/          # All app screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProjectsScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   ├── TimerScreen.tsx
│   │   ├── MoodCheckScreen.tsx
│   │   ├── ProjectDetailScreen.tsx
│   │   ├── CreateProjectScreen.tsx
│   │   └── CompletionCelebrationScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── components/       # Reusable components
│   ├── services/         # Storage and data services
│   │   └── storage.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Helper functions
│   │   └── timeHelpers.ts
│   └── assets/           # Images, fonts, etc.
├── ios/                  # iOS native code
├── android/              # Android native code (future)
└── App.tsx               # Root component
```

## Privacy & Data

**Local-First Philosophy:**
- All data is stored locally on your device using AsyncStorage
- No cloud sync, no servers, no tracking
- Location tags are user-created text, NOT GPS coordinates
- Data can be exported anytime (feature coming soon)
- You own your data completely

## Roadmap

### MVP (Current)
- ✅ Project creation and management
- ✅ Accumulated Light timer
- ✅ Post-session mood tracking
- ✅ Home, Projects, Insights screens
- ✅ Completion celebrations
- ✅ Local data storage

### V1.1 (Next)
- [ ] Share completion certificates
- [ ] Share Wrapped graphics
- [ ] Data export (JSON/CSV)
- [ ] Custom mood tag creation
- [ ] Session editing
- [ ] Dark mode

### V1.2 (Future)
- [ ] Android support
- [ ] Widget support
- [ ] Apple Watch companion
- [ ] iCloud backup (optional)
- [ ] Themes and customization

## Contributing

Hours is built with love for intentional creators. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Target Audience

- Monthly curriculum creators (TikTok trend followers)
- Notion aesthetics lovers
- Digital minimalists rejecting hustle culture
- Disciplined creatives
- Autodidacts
- Quiet achievers

## What We Avoid

- ❌ Streaks and daily counters (too gamified)
- ❌ Future self language
- ❌ Hustle culture optimization speak
- ❌ Harsh colors or aggressive UI
- ❌ GPS tracking (privacy invasion)
- ❌ Social comparison features

## License

MIT License - See LICENSE file for details

## Acknowledgments

Built with intention for people who show up to their work, day after day.

"Every hour spent is who you are—right now."

---

**Status**: MVP Complete ✨
**Platform**: iOS (React Native)
**Version**: 0.1.0
