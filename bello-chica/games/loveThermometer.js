let thermometerLevel = 0;

function startLoveThermometer() {
    thermometerLevel = 0;
    window.gameCanvas.innerHTML = `
        <div class="thermo-container">
            <h2 class="title">Heat Level</h2>
            
            <div class="thermometer-visual">
                <div class="glass-tube">
                    <div id="mercury" class="mercury" style="height: 0%;"></div>
                </div>
                <div class="bulb">
                    <svg viewBox="0 0 24 24" fill="#f5576c">
                        <circle cx="12" cy="12" r="10"/>
                    </svg>
                </div>
            </div>

            <button class="tap-btn" onmousedown="increaseHeat()" ontouchstart="increaseHeat(event)">
                TAP FAST! 
            </button>
            
            <div id="kiss-overlay" class="kiss-overlay hidden">
                <div class="sticker-content">
                    <div class="kiss-animation">
                        <svg class="heart-kiss" viewBox="0 0 24 24" fill="#f5576c">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <svg class="kiss-lips" viewBox="0 0 24 24" fill="#ff4d6d">
                            <path d="M12 22c3.5 0 7-2 7-5.5 0-1-.5-1.5-1.5-2-1-.5-2.5-.5-5.5-.5s-4.5 0-5.5.5c-1 .5-1.5 1-1.5 2 0 3.5 3.5 5.5 7 5.5z"/>
                        </svg>
                    </div>
                    <h3>I Love You So Much!</h3>
                    <button onclick="resetThermo()" class="close-sticker-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function increaseHeat(e) {
    if(e) e.preventDefault();
    
    thermometerLevel = Math.min(100, thermometerLevel + 5);
    const mercury = document.getElementById('mercury');
    const tube = document.querySelector('.glass-tube');
    
    if (mercury) {
        mercury.style.height = thermometerLevel + '%';
        
        // Дарж байх үед чичирнэ
        tube.classList.add('shake');
        setTimeout(() => tube.classList.remove('shake'), 100);
    }
    
    if (thermometerLevel >= 100) {
        setTimeout(showKissSticker, 300);
    }
}

function showKissSticker() {
    const overlay = document.getElementById('kiss-overlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('active');
}

function resetThermo() {
    const overlay = document.getElementById('kiss-overlay');
    overlay.classList.remove('active');
    setTimeout(() => {
        thermometerLevel = 0;
        const mercury = document.getElementById('mercury');
        if (mercury) mercury.style.height = '0%';
        overlay.classList.add('hidden');
    }, 300);
}