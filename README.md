# QUANTAFYRE 🔥

A modern, beautiful habit tracking app built with React Native and Expo. Build better habits, track your progress, and achieve your goals with an elegant dark-themed interface.

## 🌟 Features

### 📋 Habit Management
- **Create Custom Habits**: Add new habits with custom titles and descriptions
- **9 Habit Categories**: Health, Fitness, Mindfulness, Productivity, Learning, Social, Finance, Creativity, and Other
- **Edit & Delete**: Easily modify or remove habits anytime
- **Category Icons**: Beautiful gradient icons for each category

### ✅ Daily Tracking
- **One-Tap Completion**: Mark habits complete with a single tap
- **Week Calendar View**: Quick navigation through recent days
- **Visual Progress Indicators**: See your daily completion at a glance
- **Completion History**: Track which habits you completed each day

### 📅 Full Calendar View
- **Monthly Calendar**: View your entire month's progress
- **Navigate Between Months**: Swipe through past and future months
- **Completion Dots**: Visual indicators showing completed days
- **Daily Details**: Tap any date to see completed habits for that day

### 📊 Statistics & Analytics
- **Completion Rate**: Track your overall habit completion percentage
- **Current Streak**: See how many consecutive days you've completed habits
- **Longest Streak**: Your personal best streak record
- **Total Completions**: Lifetime count of completed habits
- **Days Active**: Track how long you've been using the app

### 🏆 Achievement System
- **5 Achievement Levels**: Beginner → Rising → Pro → Expert → Master
- **Progress-Based Unlocks**: Earn achievements based on total completions
- **Visual Badges**: Beautiful achievement badges in your profile

### 👤 Profile & Settings
- **Personal Dashboard**: View all your stats in one place
- **Notification Settings**: Toggle daily reminders
- **Dark Mode**: Always-on beautiful dark theme
- **Data Backup**: Sync your habit data (coming soon)
- **Share App**: Invite friends to build habits together

### 🎨 Modern UI/UX
- **Dark Theme**: Easy on the eyes, beautiful gradient backgrounds
- **Card-Based Design**: Clean, organized interface
- **Smooth Animations**: Polished user experience
- **Cross-Platform**: Works on iOS, Android, and Web

## 📱 Screenshots

*Add your screenshots here*

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (for iOS development on macOS) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QUANTAFYRE
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

## 📖 Usage

### Running on Different Platforms

- **iOS Simulator**: Press `i` in the terminal or run `yarn ios`
- **Android Emulator**: Press `a` in the terminal or run `yarn android`
- **Web Browser**: Press `w` in the terminal or run `yarn web`
- **Physical Device**: Scan the QR code with Expo Go app

### How to Use

1. **Add Your First Habit**: Tap the "Create First Habit" button or the + button
2. **Choose a Category**: Select from 9 different categories
3. **Track Daily**: Tap on a habit to mark it complete for the day
4. **View Progress**: Check the Calendar screen for your history
5. **Monitor Stats**: Visit Profile to see your achievements and statistics

## 🏗️ Project Structure

```
QUANTAFYRE/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── habits/          # Habit-specific components
│   │   │   ├── HabitCard.tsx
│   │   │   ├── CategorySelector.tsx
│   │   │   ├── WeekCalendar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── EmptyState.tsx
│   │   └── common/          # Shared components
│   │       └── GradientButton.tsx
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── AddHabitScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useHabits.ts     # Habit state management
│   ├── types/               # TypeScript type definitions
│   │   └── habit.ts
│   ├── utils/               # Utility functions
│   │   └── habitUtils.ts
│   └── constants/           # App constants and theme
│       └── theme.ts
├── assets/                  # Images and icons
├── App.tsx                  # Main app component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence
- **Linear Gradient** - Beautiful gradient effects
- **Ionicons** - Icon library

## 🎨 Design

### Color Palette
- **Primary**: Teal (#0D9488)
- **Secondary**: Amber (#F59E0B)
- **Background**: Deep slate gradient (#0F172A → #1E293B)
- **Success**: Emerald (#10B981)
- **Cards**: Semi-transparent slate

### Habit Categories
| Category | Color | Icon |
|----------|-------|------|
| Health | Red | Heart |
| Fitness | Orange | Dumbbell |
| Mindfulness | Green | Leaf |
| Productivity | Blue | Lightning |
| Learning | Purple | Book |
| Social | Pink | People |
| Finance | Teal | Wallet |
| Creativity | Amber | Palette |
| Other | Gray | Star |

## 📝 Scripts

- `yarn start` - Start Expo development server
- `yarn android` - Run on Android
- `yarn ios` - Run on iOS
- `yarn web` - Run on web browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Created with ❤️ using React Native and Expo

---

**QUANTAFYRE** - Build Better Habits, One Day at a Time 💫
