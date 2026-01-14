# Features Documentation

Comprehensive guide to all features in the Manifestation iOS app.

## Table of Contents
1. [Create Manifestations](#create-manifestations)
2. [Manual Affirmation](#manual-affirmation)
3. [Auto-Count System](#auto-count-system)
4. [Progress Tracking](#progress-tracking)
5. [Completion System](#completion-system)
6. [Data Persistence](#data-persistence)
7. [Background Processing](#background-processing)
8. [Haptic Feedback](#haptic-feedback)
9. [UI/UX Design](#uiux-design)

---

## Create Manifestations

### Overview
Users can create new manifestation goals with customizable parameters.

### How to Use
1. Tap the **+** button in the top-right corner
2. Fill out the form:
   - **Title:** Short name for your manifestation
   - **Affirmation:** Positive present-tense statement
   - **Target Count:** Number of affirmations needed
   - **Auto-Count Interval:** How often to auto-increment

3. Tap **Create Manifestation**

### Form Fields

#### Manifestation Title
- **Type:** Text field
- **Required:** Yes
- **Max Length:** Unlimited (but keep it concise)
- **Examples:**
  - "Financial Abundance"
  - "Perfect Health"
  - "Dream Job"
  - "Loving Relationship"

#### Affirmation
- **Type:** Multi-line text editor
- **Required:** Yes
- **Best Practices:**
  - Use present tense ("I am" not "I will be")
  - Keep it positive (avoid "not" or "don't")
  - Make it specific and personal
  - Use emotional language
- **Examples:**
  - "I am a magnet for wealth and prosperity"
  - "My body is healthy, strong, and vibrant"
  - "I work in my dream role doing what I love"
  - "I am in a loving, supportive relationship"

#### Target Count
- **Type:** Number field
- **Required:** Yes
- **Minimum:** 1
- **Recommended:** 100-10,000
- **Reasoning:**
  - Law of Assumption: Repetition reinforces belief
  - Lower targets (100-500): Quick wins, new to manifestation
  - Medium targets (500-2000): Standard practice
  - Higher targets (2000-10000): Deep reprogramming

#### Auto-Count Interval
- **Type:** Button selector
- **Options:** 1s, 2s, 3s, 5s, 10s, 30s, 60s
- **Default:** 5 seconds
- **Recommendations:**
  - 1-2s: Very fast, intensive practice
  - 3-5s: Balanced, default choice
  - 10-30s: Moderate, reflective
  - 60s: Slow, meditative

### Validation
- Title cannot be empty
- Affirmation cannot be empty
- Target must be a positive number
- Create button is disabled until all fields are valid

### Visual Feedback
- Fields glow purple when focused
- Create button glows when form is valid
- Success haptic on creation
- Sheet dismisses automatically

---

## Manual Affirmation

### Overview
Tap a button to manually increment your affirmation count.

### How to Use
1. Find your manifestation card
2. Tap the large **Affirm** button
3. Counter increases by 1
4. Feel haptic feedback (on device)
5. Watch ripple animation

### Button Features

#### Visual Design
- Large, prominent button
- Purple gradient background
- Hand tap icon + "Affirm" text
- Cosmic glow effect
- Ripple animation on tap

#### Interactions
- **Press:** Button scales down slightly (95%)
- **Release:** Button returns to normal size
- **Tap:** Counter increments immediately
- **Ripple:** Circular wave emanates from center

#### Haptic Feedback
- **Type:** Medium impact
- **When:** On every tap
- **Feel:** Satisfying "thunk" sensation
- **Purpose:** Reinforce action, add mindfulness

#### Animations
- **Press Animation:** 0.3s ease
- **Ripple Duration:** 0.8s
- **Ripple Opacity:** Fades from 1.0 to 0
- **Ripple Size:** Expands from 0 to 200px

### Behavior
- Each tap = +1 to counter
- Works even when auto-count is enabled
- Stops when target is reached
- Triggers completion if it reaches target
- Updates progress bar in real-time

### Use Cases
- Quick affirmations throughout the day
- Mindful, intentional practice
- When you want full control
- During meditation or visualization

---

## Auto-Count System

### Overview
Automatically increment affirmation count at regular intervals.

### How to Use
1. Locate the **Auto-Off** button on your manifestation
2. Tap to enable (becomes **Auto-On**)
3. Counter increments automatically
4. Tap again to disable

### Toggle Button

#### Visual States

**Disabled (Auto-Off):**
- Gray/dark background
- Dim color
- Timer icon (outline)
- Shows interval ("Every 5s")

**Enabled (Auto-On):**
- Purple gradient background
- Bright white text
- Timer icon (filled)
- Cosmic glow effect
- Shows interval ("Every 5s")

#### Haptic Feedback
- **Enable:** Selection haptic
- **Disable:** Light tap haptic

### Interval Options

| Interval | Use Case |
|----------|----------|
| **1 second** | Intensive, fast accumulation |
| **2 seconds** | Very active, high frequency |
| **3 seconds** | Active, balanced speed |
| **5 seconds** | Default, comfortable pace |
| **10 seconds** | Moderate, reflective |
| **30 seconds** | Slow, meditative |
| **60 seconds** | Very slow, spaced repetition |

### Behavior

#### While Active:
- Counter increments every X seconds
- Progress bar updates smoothly
- Can still use manual affirm button
- Works in background (see limitations)

#### Auto-Stop Conditions:
- Target count is reached
- User manually disables
- Manifestation is marked as completed
- App is deleted

#### Multiple Manifestations:
- Each has its own timer
- All can run simultaneously
- Independent intervals
- Managed efficiently by TimerManager

---

## Progress Tracking

### Overview
Visual indicators show progress toward your manifestation goal.

### Display Elements

#### 1. Count Display
```
432 / 1000
```
- **Large Number (432):** Current count, white, bold, glowing
- **Small Number (/ 1000):** Target count, gray, lighter weight

#### 2. Percentage Badge
```
[ 43% ]
```
- Capsule shape
- Purple background
- Updates in real-time
- Calculated as: (current / target) × 100

#### 3. Progress Bar
- **Design:** Rounded capsule
- **Background:** Dark gray/black
- **Fill:** Purple gradient (left to right)
- **Glow:** Purple shadow around fill
- **Height:** 12px
- **Animation:** Smooth, spring-based
- **Colors:** cosmicPurple → mysticPurple → galaxyViolet

### Calculations

```swift
progress = min(currentCount / targetCount, 1.0)
percentage = progress × 100
barWidth = containerWidth × progress
```

### Visual Feedback
- Progress bar fills left to right
- Smooth animation on updates
- Glows more as it fills
- 100% = full width
- Over 100% capped at full width

### Real-Time Updates
- Manual taps: Instant update
- Auto-count: Updates every interval
- Background processing: Updates on app resume
- Smooth transitions for all changes

---

## Completion System

### Overview
Mark manifestations as completed when they've manifested.

### How to Complete

#### Method 1: Automatic
- Reach the target count
- App automatically marks as completed
- Moves to "Completed" tab
- Auto-count stops
- Success haptic plays

#### Method 2: Manual
1. Tap the **⋯** menu button
2. Select "Mark as Manifested"
3. Confirmation happens immediately
4. Moves to "Completed" tab

### Completed State

#### Visual Changes:
- "✓ Manifested" badge appears
- Card remains visible in Completed tab
- Affirm button is hidden
- Auto-count button is hidden
- Menu still accessible

#### Data Changes:
- `isCompleted = true`
- `completedAt = Date()`
- `isAutoCountEnabled = false`
- Timer is stopped

### Uncomplete Feature
- Tap **⋯** menu
- Select "Unmark Completion"
- Returns to Active tab
- Buttons reappear
- Can continue affirming

### Use Cases
- **Manual Early Completion:** Manifestation came true before target
- **Milestone Celebration:** Want to mark achievement
- **Reassessment:** Realized goal is complete
- **Testing:** During development/testing

---

## Data Persistence

### Overview
All manifestation data is automatically saved to your device.

### Technology: SwiftData
- Modern iOS persistence framework
- Automatic change tracking
- Efficient database management
- Built on SQLite

### What's Saved

#### Manifestation Properties:
- ✅ ID (UUID)
- ✅ Title
- ✅ Affirmation text
- ✅ Current count
- ✅ Target count
- ✅ Completion status
- ✅ Auto-count enabled state
- ✅ Auto-count interval
- ✅ Created date
- ✅ Completed date (if completed)
- ✅ Last auto-count date

### When Data Saves
- After creating new manifestation
- After every count increment
- When toggling auto-count
- When marking as completed
- When deleting manifestation
- On app backgrounding (automatically)

### Data Location
```
App Container/
  └── Library/
      └── Application Support/
          └── default.store (SwiftData database)
```

### Persistence Guarantees
- ✅ **Survives app closure**
- ✅ **Survives phone restart**
- ✅ **Survives iOS updates**
- ❌ **Not synced across devices** (local only)
- ❌ **Lost if app is deleted**

### Backup Recommendations
(Future enhancement - not yet implemented)
- Export to JSON
- iCloud backup
- Share/AirDrop to other devices

---

## Background Processing

### Overview
Auto-count timers continue (with limitations) when app is in background.

### iOS Background Limitations

#### What iOS Allows:
- Limited background execution time (~30 seconds to 3 minutes)
- Background fetch (system-determined)
- Background processing (scheduled)

#### What iOS Restricts:
- No indefinite background timers
- Battery preservation
- User privacy

### App Strategy

#### 1. Background Task
When app enters background:
```
1. Request background time from iOS
2. Continue timers for ~30-180 seconds
3. iOS terminates background execution
```

#### 2. Time Calculation
When app returns to foreground:
```
1. Calculate time elapsed since last count
2. Determine how many intervals passed
3. Add all missed counts at once
4. Update UI
```

#### Example:
```
Last count: 2:00 PM
App backgrounded: 2:00 PM
App resumed: 2:10 PM
Interval: 5 seconds
Time elapsed: 10 minutes = 600 seconds
Missed counts: 600 / 5 = 120 counts
Add 120 to current count
```

### Best Practices

#### For Users:
- Keep app in foreground for accurate timing
- Use shorter intervals (they're more forgiving)
- Check back periodically
- Understand iOS limitations

#### For Developers:
- Always calculate background time on resume
- Don't rely on indefinite background execution
- Use `lastAutoCountDate` to track time
- Request background time efficiently

### Notification Alternative
(Future enhancement - not yet implemented)
- Local notifications when target reached
- Reminder notifications to check app
- Daily progress notifications

---

## Haptic Feedback

### Overview
Rich tactile feedback enhances interactions throughout the app.

### Haptic Types

#### 1. Affirmation Tap
- **Type:** Medium Impact
- **When:** Tapping the Affirm button
- **Feel:** Satisfying thunk
- **Purpose:** Confirm action, add mindfulness

#### 2. Success
- **Type:** Notification Success
- **When:** Manifestation completes
- **Feel:** Three quick taps
- **Purpose:** Celebrate achievement

#### 3. Selection
- **Type:** Selection Feedback
- **When:** Toggling switches, selecting tabs
- **Feel:** Light click
- **Purpose:** Confirm selection change

#### 4. Warning
- **Type:** Notification Warning
- **When:** Confirming delete
- **Feel:** Two firm taps
- **Purpose:** Signal important action

#### 5. Light Tap
- **Type:** Light Impact
- **When:** General UI interactions
- **Feel:** Gentle tap
- **Purpose:** Subtle feedback

### Implementation

#### HapticManager Class:
```swift
HapticManager.shared.affirmationTap()
HapticManager.shared.manifestationCompleted()
HapticManager.shared.selection()
HapticManager.shared.warning()
```

#### View Extension:
```swift
Button("Action") { }
    .hapticTap(.medium)
```

### Device Support
- ✅ **iPhone 6s and later:** Full haptic support
- ✅ **iPhone 8 and later:** Taptic Engine (best experience)
- ❌ **Simulator:** No haptic feedback
- ❌ **iPad:** Limited/no haptic support

### User Preferences
- Haptics respect system settings
- Users can disable in iOS Settings
- App cannot override user preferences

---

## UI/UX Design

### Overview
Cosmic purple theme with ethereal, mystical aesthetics.

### Color Palette

#### Primary Colors:
- **Cosmic Purple:** `#8A2BE2` - Primary actions, accents
- **Deep Indigo:** `#4B0082` - Background, depth
- **Dark Slate Blue:** `#483D8B` - Cards, surfaces

#### Secondary Colors:
- **Mystic Purple:** `#9370DB` - Gradients, highlights
- **Galaxy Violet:** `#7B68EE` - Gradients, progress
- **Lavender Mist:** `#E6E6FA` - Text, subtle accents

#### Utility Colors:
- **Cosmic Black:** `#0A0A0F` - Deep backgrounds
- **Star White:** `#F8F8FF` - Primary text

### Typography

#### Font Family: System Serif
- **Title:** 28-34pt, Bold, Serif
- **Headline:** 20pt, Semibold, Serif
- **Body:** 15-16pt, Regular, Serif
- **Caption:** 12-14pt, Medium, Rounded

#### Why Serif?
- Elegant, mystical feel
- Distinct from standard iOS apps
- Reads well at larger sizes
- Pairs well with rounded icons

### Gradients

#### Background Gradient:
```
Deep Indigo (top-left)
    ↓
Cosmic Purple (center)
    ↓
Dark Slate Blue (bottom-right)
```

#### Card Gradient:
```
Dark Slate Blue 60% (top-left)
    ↓
Deep Indigo 40% (bottom-right)
```

#### Progress Gradient:
```
Cosmic Purple → Mystic Purple → Galaxy Violet
(left to right)
```

### Visual Effects

#### 1. Cosmic Glow
- Multiple layered shadows
- Purple color
- Varying opacity and radius
- Applied to interactive elements

#### 2. Ethereal Shadow
- Two-layer shadow system
- Purple top layer
- Indigo bottom layer
- Creates depth and dimension

#### 3. Animated Background
- Subtle hue rotation
- Slow vertical movement
- Random particle stars
- 8-second loop animation

### Animations

#### Spring Animation (cosmic):
- **Response:** 0.6s
- **Damping:** 0.7
- **Use:** Interactive elements, state changes

#### Ease Animation (ethereal):
- **Duration:** 0.8s
- **Curve:** Ease in-out
- **Use:** Transitions, fades

#### Gentle Animation:
- **Duration:** 0.3s
- **Curve:** Ease in-out
- **Use:** Quick UI changes

### Layout Principles

#### Spacing:
- **Cards:** 20pt padding inside
- **Between cards:** 20pt
- **Horizontal margins:** 16-24pt
- **Section spacing:** 24pt

#### Corner Radius:
- **Cards:** 24pt
- **Buttons:** 16-20pt
- **Input fields:** 16pt
- **Badges:** Full capsule

#### Safe Areas:
- Content respects all safe areas
- Cosmic background extends to edges
- Proper handling of notch
- Bottom tab bar clearance

### Accessibility

#### Current Support:
- System font scaling
- High contrast colors
- VoiceOver-friendly structure
- Dynamic Type support (partial)

#### Future Enhancements:
- Reduce motion support
- Custom VoiceOver labels
- Larger tap targets option
- High contrast mode

---

## Feature Interaction Matrix

| Feature | Works With | Conflicts With |
|---------|------------|----------------|
| Manual Tap | Auto-count, Progress | None |
| Auto-count | Manual tap, Progress | Completion |
| Completion | All (disables others) | Auto-count |
| Delete | None | None (confirmation) |
| Progress | Manual, Auto-count | None |

---

## Future Features

Potential enhancements (not yet implemented):

### High Priority:
- [ ] Local notifications
- [ ] Statistics dashboard
- [ ] Export/import data
- [ ] iCloud sync

### Medium Priority:
- [ ] Custom themes
- [ ] Widget support
- [ ] Apple Watch app
- [ ] Siri shortcuts

### Low Priority:
- [ ] Social sharing
- [ ] Achievement badges
- [ ] Daily reminders
- [ ] Audio affirmations

---

**Manifestation app features are designed to support your Law of Assumption practice with elegance and efficiency.** ✨
