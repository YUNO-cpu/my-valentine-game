let basketPos = 50;
let catchScore = 0;
let catchGameActive = false;

function startCatchHeart() {
    catchScore = 0;
    catchGameActive = true;
    window.gameCanvas.innerHTML = `
        <div class="catch-container">
            <div class="pop-header">Hearts: <span id="c-score">0</span></div>
            <div id="catch-zone" class="catch-zone">
                <div id="basket" class="basket" style="left: 50%;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 10c0-1.1.9-2 2-2h8a2 2 0 012 2v2H6v-2zM4 12h16l-1.5 8h-13L4 12z"/>
                    </svg>
                </div>
            </div>
            <p class="hint-text">САГСАА ДҮҮРГЭ</p>
        </div>
    `;

    const zone = document.getElementById('catch-zone');
    
    // TOUCH & MOUSE CONTROL (Чирэх удирдлага)
    const handleMove = (e) => {
        if (!catchGameActive) return;
        const rect = zone.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;
        let newPos = (x / rect.width) * 100;
        
        if (newPos >= 5 && newPos <= 95) {
            basketPos = newPos;
            document.getElementById('basket').style.left = basketPos + '%';
        }
    };

    zone.addEventListener('mousemove', handleMove);
    zone.addEventListener('touchmove', (e) => { e.preventDefault(); handleMove(e); }, { passive: false });

    spawnHearts();
}

function spawnHearts() {
    const zone = document.getElementById('catch-zone');
    
    const interval = setInterval(() => {
        if (!document.getElementById('catch-zone')) { 
            clearInterval(interval); 
            catchGameActive = false;
            return; 
        }

        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        const startLeft = Math.random() * 90 + 5;
        heart.style.left = startLeft + '%';
        
        // Heart Icon
        heart.innerHTML = `
            <svg viewBox="0 0 24 24" fill="#f5576c">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;
        zone.appendChild(heart);

        // --- БОДИТ МӨРГӨЛДӨӨН ШАЛГАХ (Collision detection) ---
        let heartY = 0;
        const fallSpeed = 3 + (catchScore * 0.2); // Оноо ахих тусам хурдасна

        const fallInterval = setInterval(() => {
            heartY += fallSpeed;
            heart.style.top = heartY + 'px';

            const zoneHeight = zone.offsetHeight;
            const basketTop = zoneHeight - 70; // Сагсны байрлал

            // Сагсанд орсон эсэхийг шалгах
            if (heartY > basketTop && heartY < basketTop + 30) {
                if (Math.abs(startLeft - basketPos) < 10) {
                    catchScore++;
                    document.getElementById('c-score').innerText = catchScore;
                    heart.remove();
                    clearInterval(fallInterval);
                    return;
                }
            }

            // Газар унасан бол (Оноо нэмэхгүй!)
            if (heartY > zoneHeight) {
                heart.remove();
                clearInterval(fallInterval);
            }
        }, 20);

    }, 1000);
}