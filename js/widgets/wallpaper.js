import { STORAGE_KEYS } from '../core/storage.js';
import { isOnline } from '../core/storage.js';

// Enhanced wallpaper system with preloading
const localWallpapers = Array.from({ length: 8 }, (_, i) => `wallpaper/bg${i + 1}.webp`);

// Custom wallpaper management
export function getCustomWallpapers() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.customWallpapers);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.warn('Failed to load custom wallpapers:', e);
        return [];
    }
}

export function saveCustomWallpaper(imageData) {
    try {
        const wallpapers = getCustomWallpapers();
        const newWallpaper = {
            id: Date.now().toString(),
            data: imageData,
            createdAt: new Date().toISOString()
        };
        wallpapers.push(newWallpaper);
        localStorage.setItem(STORAGE_KEYS.customWallpapers, JSON.stringify(wallpapers));
        return newWallpaper;
    } catch (e) {
        console.error('Failed to save custom wallpaper:', e);
        if (e.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Try uploading a smaller image or delete some existing wallpapers.');
        }
        return null;
    }
}

export function deleteCustomWallpaper(id) {
    try {
        const wallpapers = getCustomWallpapers();
        const filtered = wallpapers.filter(w => w.id !== id);
        localStorage.setItem(STORAGE_KEYS.customWallpapers, JSON.stringify(filtered));
        return true;
    } catch (e) {
        console.error('Failed to delete custom wallpaper:', e);
        return false;
    }
}

export async function setCustomWallpaper(imageData, bgPreloader) {
    const success = await bgPreloader.setBackground(imageData, true);
    if (success) {
        // Lock the wallpaper to prevent it from changing
        bgPreloader.isLocked = true;
        localStorage.setItem('lockedWallpaper', imageData);
    }
    return success;
}

export async function pickLocalWallpaper(bgPreloader) {
    // If wallpaper is locked (custom wallpaper set), just use it
    if (bgPreloader.isWallpaperLocked()) {
        const locked = localStorage.getItem('lockedWallpaper');
        if (locked) {
            await bgPreloader.setBackground(locked, true);
            return;
        }
    }
    
    let idx = Number(localStorage.getItem(STORAGE_KEYS.wallpaperIndex) || 0);
    const wallpaperUrl = localWallpapers[idx];
    
    const success = await bgPreloader.setBackground(wallpaperUrl);
    if (success) {
        localStorage.setItem(STORAGE_KEYS.wallpaperIndex, (idx + 1) % localWallpapers.length);
    } else {
        // Try next local wallpaper as fallback
        const nextIdx = (idx + 1) % localWallpapers.length;
        const fallbackUrl = localWallpapers[nextIdx];
        await bgPreloader.setBackground(fallbackUrl);
        console.warn(`Failed to load wallpaper: ${wallpaperUrl}, using local fallback`);
    }
}

// Wallpaper theme categories
// Note: Using local wallpapers since Unsplash URLs need proper photo IDs
const wallpaperThemes = {
    nature: [
        'https://images.unsplash.com/photo-1612981453053-184fd648b66b?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1619266465172-02a857c3556d?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503993656770-0479a287559e?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515961896317-adf9e14bdcc0?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1608592077365-c6399182e63c?w=1920&q=95&auto=format&fit=crop'
    ],
    dark: [
        'https://images.unsplash.com/photo-1507486435406-33d376619b3d?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1672141566599-680a508f8041?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573059225035-dcef0018bcc5?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571343220742-bdfa3b4e20c0?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1652344959967-a43a9f1cf668?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1651833757675-ac8580cf4ffd?w=1920&q=95&auto=format&fit=crop'
    ],
    summer: [
        'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&q=95&auto=format&fit=crop'
    ],
    abstract: [
        'https://images.unsplash.com/photo-1606054512716-fb198b6686c9?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1668455199701-284281127a87?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1655841439659-0afc60676b70?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=1920&q=95&auto=format&fit=crop'
    ],
    urban: [],
    space: [
        'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&q=95&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=95&auto=format&fit=crop'
    ]
};

// Wallpaper history tracking to prevent repeats
function getUsedWallpapers(theme) {
    const key = `usedWallpapers_${theme}`;
    const used = localStorage.getItem(key);
    return used ? JSON.parse(used) : [];
}

function addUsedWallpaper(theme, url) {
    const key = `usedWallpapers_${theme}`;
    const used = getUsedWallpapers(theme);
    if (!used.includes(url)) {
        used.push(url);
        localStorage.setItem(key, JSON.stringify(used));
    }
}

export function resetUsedWallpapers(theme) {
    const key = `usedWallpapers_${theme}`;
    localStorage.removeItem(key);
    console.log(`Reset wallpaper history for theme '${theme}'`);
}

function getNextUnusedWallpaper(theme) {
    const themeUrls = wallpaperThemes[theme] || wallpaperThemes.dark;
    const used = getUsedWallpapers(theme);
    
    // If all wallpapers have been used, reset the history
    if (used.length >= themeUrls.length) {
        console.log(`All ${themeUrls.length} wallpapers used for theme '${theme}', resetting history`);
        resetUsedWallpapers(theme);
        return themeUrls[0]; // Start fresh with first wallpaper
    }
    
    // Find unused wallpapers
    const unused = themeUrls.filter(url => !used.includes(url));
    
    // Select random from unused
    const selectedUrl = unused[Math.floor(Math.random() * unused.length)];
    return selectedUrl;
}

// Enhanced Unsplash wallpaper with preloading
export async function pickUnsplashWallpaper(bgPreloader, theme = 'dark') {
    console.log(`Loading wallpaper with theme: ${theme}`);
    
    // If wallpaper is locked (custom wallpaper set), just use it - don't load from web
    if (bgPreloader.isWallpaperLocked()) {
        const locked = localStorage.getItem('lockedWallpaper');
        if (locked) {
            console.log('Using locked custom wallpaper, skipping web load');
            await bgPreloader.setBackground(locked, true);
            return;
        }
    }
    
    // Try to use a preloaded wallpaper first
    const preloaded = await bgPreloader.getNextWallpaper();
    if (preloaded) {
        console.log('Using preloaded wallpaper');
        const success = await bgPreloader.setBackground(preloaded);
        if (success) return;
    }
    
    // Get URLs for selected theme
    const themeUrls = wallpaperThemes[theme] || wallpaperThemes.dark;
    console.log(`Theme has ${themeUrls.length} wallpaper options`);
    
    // If theme has no images, fall back to local wallpapers
    if (themeUrls.length === 0) {
        console.log(`Theme '${theme}' has no images, using local wallpapers`);
        await pickLocalWallpaper(bgPreloader);
        return;
    }
    
    // Select next unused wallpaper from the theme
    const selectedUrl = getNextUnusedWallpaper(theme);
    
    console.log(`Attempting to load: ${selectedUrl}`);
    const success = await bgPreloader.setBackground(selectedUrl);
    
    if (success) {
        // Mark this wallpaper as used
        addUsedWallpaper(theme, selectedUrl);
        console.log(`Marked wallpaper as used for theme '${theme}'`);
    }
    
    if (!success) {
        console.warn('Primary Unsplash failed, trying alternative...');
        await tryAlternativeUnsplash(bgPreloader, theme);
    }
}

async function tryAlternativeUnsplash(bgPreloader, theme = 'dark') {
    // Try to get another URL from the same theme
    const themeUrls = wallpaperThemes[theme] || wallpaperThemes.dark;
    
    // If no URLs available, fall back to local
    if (themeUrls.length === 0) {
        console.warn('No alternative URLs, falling back to local wallpapers');
        await pickLocalWallpaper(bgPreloader);
        return;
    }
    
    const alternativeUrl = getNextUnusedWallpaper(theme);
    
    console.log(`Trying alternative: ${alternativeUrl}`);
    const success = await bgPreloader.setBackground(alternativeUrl);
    
    if (success) {
        // Mark this wallpaper as used
        addUsedWallpaper(theme, alternativeUrl);
        console.log(`Marked alternative wallpaper as used for theme '${theme}'`);
    } else {
        console.warn('All Unsplash options failed, falling back to local wallpapers');
        await pickLocalWallpaper(bgPreloader);
    }
}
