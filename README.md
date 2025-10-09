# BetterHome - Modular Homepage

A beautiful, customizable homepage with a modular architecture that makes it easy to add new widgets and features.

![Preview](preview.gif)

## 🎨 Features

- **Beautiful Design**: Glassmorphic UI with smooth animations and modern aesthetics
- **Dynamic Wallpapers**: Themed Unsplash collections with local fallbacks and custom upload support
- **Weather Widget**: Real-time weather with 3-day forecast and location customization
- **Moon Phase Widget**: Live lunar phases with practical guidance and interactive information
- **Customizable Bookmarks**: Add, edit, delete, and reorder with drag-and-drop
- **Search Bar**: Multiple search engines (Google, DuckDuckGo, Brave)
- **Custom Fonts**: 10+ font options including modern and gothic styles
- **Custom Wallpapers**: Upload and manage your own wallpaper collection
- **Wallpaper Themes**: Curated collections (Dark & Halloween, Nature, Summer, Abstract, Urban, Space)
- **Smart Rotation**: No-repeat wallpaper system ensures variety
- **Settings Panel**: Comprehensive customization with import/export functionality
- **Onboarding**: Easy setup instructions for all major browsers
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

## 📁 File Structure

```
BetterHomePage-main/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── css/                    # Modular CSS files
│   ├── main.css           # Core styles and variables
│   ├── clock.css          # Clock and greeting styles
│   ├── search.css         # Search bar styles
│   ├── bookmarks.css      # Bookmarks grid styles
│   ├── weather.css        # Weather widget styles
│   ├── moon.css           # Moon phase widget styles
│   ├── settings.css       # Settings panel styles
│   ├── wallpaper-lock.css # Wallpaper lock button styles
│   └── onboarding.css     # Onboarding overlay styles
├── js/                     # Modular JavaScript
│   ├── main.js            # Main initialization
│   ├── core/              # Core functionality
│   │   ├── storage.js     # Storage and settings management
│   │   └── background.js  # Background preloader system
│   └── widgets/           # Widget modules
│       ├── greeting.js    # Greeting and quotes
│       ├── clock.js       # Clock functionality
│       ├── weather.js     # Weather widget
│       ├── moon.js        # Moon phase calculations
│       ├── search.js      # Search functionality
│       ├── bookmarks.js   # Bookmarks management
│       ├── wallpaper.js   # Wallpaper system with themes
│       ├── settings.js    # Settings panel
│       └── onboarding.js  # Onboarding overlay
├── icons/                  # App icons
├── wallpaper/             # Local wallpaper images
└── backup/                # Old file backups

```

## 🚀 How to Use

1. **Local Usage**: Simply open `index.html` in your browser
2. **GitHub Pages**: Upload to a repository and enable GitHub Pages
3. **Web Server**: Host on any static web server

## 🧩 Adding New Widgets

The modular structure makes it easy to add new widgets:

1. Create a new widget module in `js/widgets/`
2. Create corresponding CSS in `css/`
3. Import and initialize in `js/main.js`
4. Add HTML structure to `index.html`

### Example Widget Module

```javascript
// js/widgets/mywidget.js
export function initMyWidget() {
    const widget = document.getElementById('myWidget');
    if (!widget) return;
    
    // Widget logic here
}
```

## ⚙️ Customization

### Settings Panel
- **Appearance Tab**:
  - Choose from 10+ font families (Inter, Poppins, Bebas Neue, Cinzel, etc.)
  - Upload custom wallpapers
  - Manage wallpaper gallery
  - Font selector with live preview
- **Features Tab**:
  - Toggle weather widget
  - Toggle moon phase widget
  - Toggle daily quotes
  - Toggle 12/24 hour format
  - Change temperature units (°C/°F)
- **Wallpaper Themes**:
  - Nature & Landscapes 🌿
  - Dark & Halloween 🎃
  - Summer ☀️
  - Abstract & Modern 🎨
  - Urban & Architecture 🏙️
  - Space & Cosmos 🌌
- **Data Management**:
  - Import/export all settings
  - Clear all data
  - Backup and restore

### Bookmarks
- Right-click to edit/delete
- Drag to reorder
- Click + to add new
- Custom icons and URLs
- Automatic favicon detection

### Wallpapers
- **Themed Collections**: 6 curated categories with high-quality images
- **Custom Upload**: Add your own wallpapers
- **Lock Feature**: Lock your favorite wallpaper
- **Smart Rotation**: No repeats until all wallpapers shown
- **Instant Preview**: Changes apply immediately

### Moon Phase Widget
- **Current Phase**: Shows today's moon phase with illumination percentage
- **Upcoming Phases**: Next 2 upcoming phases with dates
- **Interactive Info**: Click any phase for practical guidance
- **Realistic Visuals**: CSS-based moon phase representations
- **Live Updates**: Automatically calculated based on current date

### Search Engines
- Click engine icon to switch
- Supports Google, DuckDuckGo, Brave
- Press `/` or `Ctrl+K` to quick focus

## 🔧 Development

The code is organized for easy maintenance:

- **CSS Variables**: Customize colors and animations in `css/main.css`
- **Storage Keys**: All localStorage keys in `js/core/storage.js`
- **Widget System**: Modular widget architecture for easy additions
- **Font Scoping**: Fonts apply only to homepage elements, widgets use Poppins
- **Wallpaper Themes**: Organized theme system with no-repeat logic
- **Custom Uploads**: LocalStorage-based custom wallpaper management
- **Moon Calculations**: Accurate lunar phase calculations using astronomical data
- **Import/Export**: Complete backup and restore functionality

## 📱 Browser Support

- Chrome/Edge (Chromium)
- Firefox
- Safari
- Brave
- Opera

## 🌟 Tips & Keyboard Shortcuts

- **Search**: Press `/` or `Ctrl+K` to focus search
- **Bookmarks**: Press `Ctrl+B` to add new bookmark
- **Settings**: Press `Ctrl+,` to open settings panel
- **Close**: Press `ESC` to close any overlay
- **Moon Info**: Click any moon phase to see practical guidance
- **Wallpaper Lock**: Click the lock icon to keep your favorite wallpaper
- **Custom Upload**: Drag & drop images directly to custom wallpaper section
- **Theme Switching**: Wallpapers change instantly when selecting a new theme

## 🎯 Recent Updates

### Version 2.0
- ✨ Added Moon Phase Widget with interactive phase information
- 🎨 Custom wallpaper upload and management system
- 🌍 Themed wallpaper collections (6 categories)
- 🔄 Smart wallpaper rotation with no-repeat logic
- 🖋️ Extended font library with gothic and modern fonts
- 🎯 Font scoping - only affects homepage elements
- 🌙 Realistic moon phase visualizations with CSS
- 📱 Improved mobile responsiveness
- ⚡ Performance optimizations and smoother animations

## 📄 License

MIT License - feel free to customize and share!
