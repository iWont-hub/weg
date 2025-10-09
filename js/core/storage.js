// Storage management
export const STORAGE_KEYS = {
    bookmarks: 'customBookmarks',
    username: 'username',
    wallpaperIndex: 'wallpaperIndex',
    searchHistory: 'searchHistory',
    settings: 'betterHomeSettings',
    customWallpapers: 'customWallpapers'
};

// Default settings
export const DEFAULT_SETTINGS = {
    fontFamily: 'Inter',
    weatherEnabled: true,
    moonEnabled: true,
    quoteEnabled: true,
    temperatureUnit: 'C', // C for Celsius, F for Fahrenheit
    timeFormat: '12', // 12 or 24 hour format
    wallpaperTheme: 'dark' // dark, summer, abstract, urban, space (nature is empty)
};

// Load settings
export function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.settings);
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
        return DEFAULT_SETTINGS;
    }
}

// Save settings
export function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch (e) {
        console.warn('Settings save failed:', e);
    }
}

// Apply settings to page
export function applySettings(settings) {
    // Apply font family globally via CSS variable
    document.documentElement.style.setProperty('--font-family', `"${settings.fontFamily}"`);
    
    // Also apply directly to body for immediate effect
    document.body.style.fontFamily = `"${settings.fontFamily}", -apple-system, BlinkMacSystemFont, sans-serif`;
    document.body.style.transition = 'font-family 0.3s ease';
    
    // Toggle widgets with animations
    const weatherWidget = document.getElementById('weatherWidget');
    const moonWidget = document.getElementById('moonWidget');
    const quoteEl = document.getElementById('quote');
    
    // Helper function to show/hide widgets
    function toggleWidget(widget, enabled) {
        if (!widget) return;
        
        if (enabled) {
            widget.classList.remove('widget-hidden');
            widget.style.animation = 'slideInLeft 0.5s ease forwards';
        } else {
            widget.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => widget.classList.add('widget-hidden'), 300);
        }
    }
    
    toggleWidget(weatherWidget, settings.weatherEnabled);
    toggleWidget(moonWidget, settings.moonEnabled);
    
    if (quoteEl) {
        if (settings.quoteEnabled) {
            quoteEl.classList.remove('widget-hidden');
            quoteEl.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            quoteEl.classList.add('updating');
            setTimeout(() => quoteEl.classList.add('widget-hidden'), 300);
        }
    }
}

// Check if online
export let isOnline = navigator.onLine;
window.addEventListener('online', () => { isOnline = true; });
window.addEventListener('offline', () => { isOnline = false; });

// Enhanced icon refresh with error handling
let iconRefreshTimer = null;
export function refreshIcons() {
    if (iconRefreshTimer) return;
    iconRefreshTimer = requestAnimationFrame(() => {
        iconRefreshTimer = null;
        try {
            if (window.lucide && typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        } catch (e) {
            console.warn('Icon refresh failed:', e);
        }
    });
}
