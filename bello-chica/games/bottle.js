function startBottle() {
    window.gameCanvas.innerHTML = `
        <div class="bottle-game-container">
            <h2 class="title">A Message From The Sea</h2>
            <div class="ocean-area">
                <div class="wave wave1"></div>
                <div class="wave wave2"></div>
                
                <div id="magic-bottle" class="bottle-wrapper" onclick="openMessage()">
                    <div class="glass-bottle">
                        <div class="cork"></div>
                        <div class="scroll-paper"></div>
                    </div>
                </div>
            </div>
            
            <div id="letter-overlay" class="letter-overlay">
                <div class="scroll-content">
                    <div class="cherry-border">
                        <p class="love-text">My Dearest Supercalifragilisticexpialidocious,</p>
                        <h3 class="valentine-q">Will you be my Valentine?</h3>
                        
                        <div class="final-btns">
                            <button class="v-btn yes" onclick="celebrate(true)">YES!</button>
                            <button class="v-btn yes-2" onclick="celebrate(true)">DEFINITELY YES!</button>
                        </div>
                    </div>
                </div>
            </div>
            <p id="tap-hint" class="hint">Tap the floating bottle to open.</p>
        </div>
    `;
}

function openMessage() {
    const bottle = document.getElementById('magic-bottle');
    const hint = document.getElementById('tap-hint');
    const overlay = document.getElementById('letter-overlay');

    // Лонх алга болох эффект
    bottle.style.transition = "all 0.8s ease-out";
    bottle.style.transform = "scale(2) translateY(-50px)";
    bottle.style.opacity = "0";
    if(hint) hint.style.opacity = '0';
    
    setTimeout(() => {
        overlay.style.display = 'flex';
        // Style repaint хийх хугацаа олгох
        setTimeout(() => overlay.classList.add('active'), 50);
    }, 600);
}

function celebrate(isYes) {
    if(isYes) {
        window.gameCanvas.innerHTML = `
            <div class="final-celebration">
                <div class="magical-card">
                    <div class="final-text-area">
                        <p class="msg-line">No matter your answer...</p>
                        <p class="msg-line">I already like you a lot.</p>
                        <h2 class="final-valentine">Happy Valentine’s Day. ❤️</h2>
                        <p class="msg-line">Thank you for being you.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Зүрхнүүдийг үүсгэж эхлэх
        createFloatingHearts();
    }
}

function createFloatingHearts() {
    const container = document.querySelector('.final-celebration');
    if (!container) return;

    // Өмнө нь ажиллаж байсан интервал байвал устгах (давхардахгүй байх)
    if (window.heartTimer) clearInterval(window.heartTimer);

    window.heartTimer = setInterval(() => {
        // Хэрэв дэлгэц солигдсон бол зогсоох
        if (!document.querySelector('.final-celebration')) {
            clearInterval(window.heartTimer);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'floating-heart-particle';
        
        // SVG зүрх
        heart.innerHTML = `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#f5576c">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>`;
        
        // Санамсаргүй хэмжээ (15px - 35px)
        const size = Math.floor(Math.random() * 20) + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Санамсаргүй байрлал
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Санамсаргүй хурд (3s - 6s)
        const duration = (Math.random() * 3) + 3;
        heart.style.animationDuration = `${duration}s`;
        
        // Санамсаргүй тунгалаг байдал
        heart.style.opacity = (Math.random() * 0.5) + 0.5;

        container.appendChild(heart);

        // Animation дууссаны дараа DOM-оос устгах
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
        
    }, 300); // 0.3 секунд тутамд шинэ зүрх
}