// Moon Phase Widget
// Calculates moon phases and displays current, previous, and next phases

const MOON_PHASES = [
    { 
        name: 'New Moon', 
        icon: 'circle', 
        style: 'empty', 
        description: 'New cycle begins',
        info: 'Best for: New beginnings, setting intentions, planning projects. A time for rest and reflection. Good for starting new habits or ventures.'
    },
    { 
        name: 'Waxing Crescent', 
        icon: 'circle', 
        style: 'waxing-25', 
        description: 'Growing light',
        info: 'Best for: Taking action on goals, building momentum, creative work. Energy is building. Good time for starting projects and making decisions.'
    },
    { 
        name: 'First Quarter', 
        icon: 'circle', 
        style: 'half', 
        description: 'Half illuminated',
        info: 'Best for: Overcoming challenges, making adjustments, problem-solving. Time of action and commitment. Push through obstacles.'
    },
    { 
        name: 'Waxing Gibbous', 
        icon: 'circle', 
        style: 'waxing-75', 
        description: 'Nearly full',
        info: 'Best for: Refinement, editing, perfecting details. Nearly there! Good for fine-tuning projects and preparing for completion.'
    },
    { 
        name: 'Full Moon', 
        icon: 'circle', 
        style: 'full', 
        description: 'Fully illuminated',
        info: 'Best for: Celebration, harvest, completion, releasing what no longer serves. Peak energy. Great for social activities and culmination of efforts.'
    },
    { 
        name: 'Waning Gibbous', 
        icon: 'circle', 
        style: 'waning-75', 
        description: 'Light decreasing',
        info: 'Best for: Gratitude, sharing wisdom, teaching others. Time to give back. Good for reflection and helping others with what you have learned.'
    },
    { 
        name: 'Last Quarter', 
        icon: 'circle', 
        style: 'half-reverse', 
        description: 'Half illuminated',
        info: 'Best for: Breaking bad habits, releasing negative patterns, letting go. Time to shed what is not working. Good for clearing and cleansing.'
    },
    { 
        name: 'Waning Crescent', 
        icon: 'circle', 
        style: 'waning-25', 
        description: 'Fading light',
        info: 'Best for: Rest, recuperation, surrender, meditation. Final release before renewal. Good for spiritual practices and deep rest.'
    }
];

// Known new moon date (January 11, 2024)
const KNOWN_NEW_MOON = new Date('2024-01-11T11:57:00Z');
const LUNAR_CYCLE = 29.53059; // Average lunar cycle in days

// Calculate moon phase for a given date
function calculateMoonPhase(date) {
    // Calculate days since known new moon
    const daysSinceNewMoon = (date - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
    
    // Normalize to lunar cycle (0-29.53059)
    const lunarAge = ((daysSinceNewMoon % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
    
    // Calculate illumination percentage
    const illumination = (1 + Math.cos(2 * Math.PI * lunarAge / LUNAR_CYCLE)) / 2;
    
    // Determine phase based on lunar age
    let phaseIndex;
    if (lunarAge < 1.84566) {
        phaseIndex = 0; // New Moon
    } else if (lunarAge < 5.53699) {
        phaseIndex = 1; // Waxing Crescent
    } else if (lunarAge < 9.22831) {
        phaseIndex = 2; // First Quarter
    } else if (lunarAge < 12.91963) {
        phaseIndex = 3; // Waxing Gibbous
    } else if (lunarAge < 16.61096) {
        phaseIndex = 4; // Full Moon
    } else if (lunarAge < 20.30228) {
        phaseIndex = 5; // Waning Gibbous
    } else if (lunarAge < 23.99361) {
        phaseIndex = 6; // Last Quarter
    } else {
        phaseIndex = 7; // Waning Crescent
    }
    
    return {
        phase: MOON_PHASES[phaseIndex],
        phaseIndex,
        illumination: Math.round(illumination * 100),
        lunarAge: Math.round(lunarAge * 100) / 100
    };
}

// Get next occurrence of a specific moon phase
function getNextPhase(currentDate, targetPhaseIndex) {
    const currentPhase = calculateMoonPhase(currentDate);
    let daysToAdd = 0;
    
    if (targetPhaseIndex === currentPhase.phaseIndex) {
        // If it's the same phase, find the next occurrence
        daysToAdd = LUNAR_CYCLE;
    } else if (targetPhaseIndex > currentPhase.phaseIndex) {
        // Phase is later in the cycle
        daysToAdd = (targetPhaseIndex - currentPhase.phaseIndex) * (LUNAR_CYCLE / 8);
    } else {
        // Phase is earlier in the cycle (next month)
        daysToAdd = (8 - currentPhase.phaseIndex + targetPhaseIndex) * (LUNAR_CYCLE / 8);
    }
    
    return new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
}

// Format date for display
function formatMoonDate(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const dateStr = date.toDateString();
    const todayStr = today.toDateString();
    const tomorrowStr = tomorrow.toDateString();
    const yesterdayStr = yesterday.toDateString();
    
    if (dateStr === todayStr) {
        return 'Today';
    } else if (dateStr === tomorrowStr) {
        return 'Tomorrow';
    } else if (dateStr === yesterdayStr) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Get moon phase data for display
export function getMoonPhaseData() {
    const today = new Date();
    const currentPhase = calculateMoonPhase(today);
    
    // Get next phase
    const nextPhaseIndex = (currentPhase.phaseIndex + 1) % 8;
    const nextPhaseDate = getNextPhase(today, nextPhaseIndex);
    const nextPhase = calculateMoonPhase(nextPhaseDate);
    
    // Get phase after next
    const nextNextPhaseIndex = (currentPhase.phaseIndex + 2) % 8;
    const nextNextPhaseDate = getNextPhase(today, nextNextPhaseIndex);
    const nextNextPhase = calculateMoonPhase(nextNextPhaseDate);
    
    return [
        {
            phase: currentPhase.phase,
            date: today,
            illumination: currentPhase.illumination,
            isCurrent: true,
            label: 'Current'
        },
        {
            phase: nextPhase.phase,
            date: nextPhaseDate,
            illumination: nextPhase.illumination,
            isCurrent: false,
            label: 'Next'
        },
        {
            phase: nextNextPhase.phase,
            date: nextNextPhaseDate,
            illumination: nextNextPhase.illumination,
            isCurrent: false,
            label: 'Upcoming'
        }
    ];
}

// Initialize moon phase widget
export function initMoonWidget() {
    console.log('Initializing moon widget...');
    const moonWidget = document.getElementById('moonWidget');
    const moonPhases = document.getElementById('moonPhases');
    
    console.log('Moon widget elements:', { moonWidget, moonPhases });
    
    if (!moonWidget || !moonPhases) {
        console.warn('Moon widget elements not found');
        return;
    }
    
    try {
        const moonData = getMoonPhaseData();
        console.log('Moon data generated:', moonData);
        
        moonPhases.innerHTML = moonData.map((data, index) => `
            <div class="moon-phase ${data.isCurrent ? 'current' : ''}">
                <div class="moon-phase-info" onclick="toggleMoonInfo(${index})" style="cursor: pointer;">
                    <div class="moon-visual ${data.phase.style}">
                        <div class="moon-circle">
                            <div class="moon-shadow"></div>
                        </div>
                    </div>
                    <div class="moon-details">
                        <div class="moon-phase-name">${data.phase.name}</div>
                        <div class="moon-date">${data.phase.description}</div>
                        <div class="moon-date-actual">${formatMoonDate(data.date)}</div>
                    </div>
                </div>
                <div class="moon-percentage">${data.illumination}%</div>
            </div>
            <div class="moon-phase-expanded" id="moonInfo${index}">
                <div class="moon-info-content">
                    <p>${data.phase.info}</p>
                </div>
            </div>
        `).join('');
        
        // Show widget with animation
        setTimeout(() => {
            moonWidget.classList.add('show');
            // Initialize Lucide icons for the moon widget
            if (window.lucide) {
                lucide.createIcons();
            }
        }, 100);
        
        console.log('Moon phase widget initialized');
        
    } catch (error) {
        console.error('Error initializing moon widget:', error);
        moonPhases.innerHTML = '<div class="moon-phase loading">Error loading moon phases</div>';
    }
}

// Update moon phases (can be called periodically)
export function updateMoonPhases() {
    initMoonWidget();
}

// Toggle moon phase info (global function)
window.toggleMoonInfo = function(index) {
    const infoEl = document.getElementById(`moonInfo${index}`);
    const allInfoEls = document.querySelectorAll('.moon-phase-expanded');
    
    // Close all other expanded sections
    allInfoEls.forEach((el, i) => {
        if (i !== index) {
            el.classList.remove('show');
        }
    });
    
    // Toggle current section
    if (infoEl) {
        infoEl.classList.toggle('show');
    }
};
