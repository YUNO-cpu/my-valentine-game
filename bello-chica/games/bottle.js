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
            
            <div id="letter-overlay" class="letter-overlay hidden">
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
    // Scale болон Fade эффектээр нээгдэнэ (эргэлдэж жижигрэхгүй)
    bottle.style.transform = "translate(-50%, -50%) scale(2)";
    bottle.style.opacity = "0";
    bottle.style.transition = "all 0.8s ease-out";
    
    document.getElementById('tap-hint').style.opacity = '0';
    
    setTimeout(() => {
        const overlay = document.getElementById('letter-overlay');
        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 50);
    }, 800);
}

function celebrate(isYes) {
    if(isYes) {
        window.gameCanvas.innerHTML = `
            <div class="final-celebration">
                <div class="magical-card">
                    <div class="final-text-area">
                        <p class="msg-line">No matter your answer...</p>
                        <p class="msg-line">I already like you a lot.</p>
                        <h2 class="final-valentine">Happy Valentine’s Day.❤️</h2>
                        <p class="msg-line">Thank you for being you.</p>
                    </div>
                </div>
            </div>
        `;
        createFloatingHearts();
    }
}

function createFloatingHearts() {
    const container = document.querySelector('.final-celebration');
    setInterval(() => {
        if(!container) return;
        const heart = document.createElement('div');
        heart.className = 'floating-heart-particle';
        heart.innerHTML = `<svg viewBox="0 0 24 24" width="25" fill="#f5576c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (2 + Math.random() * 3) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 300);
}