let popScore = 0;
function startHeartPop() {
    popScore = 0;
    window.gameCanvas.innerHTML = `
        <div class="pop-container">
            <div class="pop-header">Hearts: <span id="p-score">0</span></div>
            <div id="pop-zone" class="pop-zone"></div>
        </div>
    `;
    const interval = setInterval(() => {
        const zone = document.getElementById('pop-zone');
        if(!zone) { clearInterval(interval); return; }
        
        const h = document.createElement('div');
        h.className = 'pop-item';
        h.innerHTML = `<svg viewBox="0 0 24 24" fill="#f5576c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        h.style.left = Math.random() * 80 + '%';
        h.style.top = Math.random() * 80 + '%';
        
        h.onclick = () => {
            popScore++;
            document.getElementById('p-score').innerText = popScore;
            h.remove();
        };
        zone.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }, 800);
}