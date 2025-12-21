# Instagram Preview

A React implementation of the Instagram posting flow with 6 screens, matching the Figma designs exactly.

## Features

- **6 Complete Screens**: Feed, Image Selection, Multi-select, Edit Post, Add Caption, and Profile
- **Design System**: JSON-based design system for easy editing
- **Exact Figma Match**: Uses spacing, colors, typography, and border radius from Figma variables
- **Responsive**: Max-width 375px container for desktop viewing
- **Interactive Flow**: Full navigation between screens

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Screen Flow

1. **Screen 1 (Feed)**: Click the plus button to go to image selection
2. **Screen 2 (Image Selection)**: Click the gallery button (right of "Recents >") to enable multi-select
3. **Screen 3 (Multi-select)**: Select multiple images, then click Next
4. **Screen 4 (Edit Post)**: Edit your post with filters, music, etc., then click Next
5. **Screen 5 (Add Caption)**: Add a caption and configure post settings, then click Share
6. **Screen 6 (Profile)**: View your profile with the new post added

## Design System

All design tokens are stored in `design-system.json` including:
- Colors (background, text, icons, borders)
- Spacing (0px to 80px)
- Border radius (0px to 100px)
- Typography (font families, sizes, weights, letter spacing)

## Project Structure

```
instagram-preview/
├── design-system.json    # Design tokens
├── src/
│   ├── components/       # Reusable components (StatusBar, HomeIndicator)
│   ├── screens/          # Screen components (Screen1-6)
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # Entry point
└── package.json
```

## Notes

- Images are loaded from localhost:3845 (Figma asset server)
- All spacing, padding, and border radius values match Figma exactly
- The app uses a max-width container of 375px for desktop viewing

