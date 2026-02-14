function startLoveMeter() {
    window.gameCanvas.innerHTML = `
        <div class="love-meter-container">
            <div class="meter-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
            </div>
            <h2 class="title">Love Meter</h2>
            <div class="input-group">
                <input type="text" id="name1" placeholder="Your Name" autocomplete="off">
                <input type="text" id="name2" placeholder="His Name" autocomplete="off">
            </div>
            <button onclick="calculateLove()" class="calc-btn">CALCULATE</button>
            <div id="result-display" class="hidden">
                <div class="heart-rate-box">
                    <span id="love-percent">0</span>%
                </div>
                <p id="love-status"></p>
            </div>
        </div>
    `;
}

function calculateLove() {
    const n1 = document.getElementById('name1').value.trim();
    const n2 = document.getElementById('name2').value.trim();
    
    if (n1 === "" || n2 === "") return;

    const resultDiv = document.getElementById('result-display');
    const percentSpan = document.getElementById('love-percent');
    const statusP = document.getElementById('love-status');
    
    // Санамсаргүй боловч утгатай тоо гаргах
    const loveScore = Math.floor(Math.random() * (100 - 80 + 1)) + 80; // 80-100 хооронд
    
    resultDiv.classList.remove('hidden');
    
    let current = 0;
    const duration = 1500; 
    const stepTime = Math.abs(Math.floor(duration / loveScore));
    
    const timer = setInterval(() => {
        current++;
        percentSpan.innerText = current;
        if (current >= loveScore) {
            clearInterval(timer);
            statusP.innerText = loveScore > 90 ? "Soulmates! ✨" : "True Love! 💖";
        }
    }, stepTime);
}