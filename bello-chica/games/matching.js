function startMatching() {
    window.gameCanvas.innerHTML = '<div class="matching-grid" id="matching-grid"></div>';
    const grid = document.getElementById('matching-grid');
    matchedPairs = 0;

    // 13 хос = 26 карт
    let cards = [];
    for (let i = 0; i < 13; i++) {
        cards.push(i, i);
    }
    cards.sort(() => Math.random() - 0.5);

    // 27 цэгийн байрлал (26 карт + 1 төв "R")
    // 5x7 эсвэл 6x7 grid дээр төгс зүрх
    const heartPattern = [
        {r:0, c:1}, {r:0, c:2}, {r:0, c:4}, {r:0, c:5},
        {r:1, c:0}, {r:1, c:1}, {r:1, c:2}, {r:1, c:3}, {r:1, c:4}, {r:1, c:5}, {r:1, c:6},
        {r:2, c:0}, {r:2, c:1}, {r:2, c:2}, {r:2, c:4}, {r:2, c:5}, {r:2, c:6}, // c:3-ыг алгасав (Төв)
        {r:3, c:1}, {r:3, c:2}, {r:3, c:3}, {r:3, c:4}, {r:3, c:5},
        {r:4, c:2}, {r:4, c:3}, {r:4, c:4},
        {r:5, c:3}
    ];

    // 1. Төв хэсэгт "R" үсэг байрлуулах
    const centerCard = document.createElement('div');
    centerCard.className = 'static-card'; // Эргэдэггүй класс
    centerCard.style.gridRow = "3"; // (r:2 + 1)
    centerCard.style.gridColumn = "4"; // (c:3 + 1)
    centerCard.innerHTML = 'R';
    grid.appendChild(centerCard);

    // 2. Бусад 26 картыг байрлуулах
    cards.forEach((id, index) => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.dataset.id = id;
        
        const pos = heartPattern[index];
        card.style.gridRow = pos.r + 1;
        card.style.gridColumn = pos.c + 1;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"><div class="minimal-logo"></div></div>
                <div class="card-back">
                    <img src="assets/p${id + 1}.png" style="width:100%; height:100%; border-radius:8px; object-fit:cover;">
                </div>
            </div>
        `;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}


let flippedCards = [];
let matchedPairs = 0; // Таарсан хосыг тоолох

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.id === flippedCards[1].dataset.id) {
                // ТААРЛАА! 
                matchedPairs++;
                flippedCards = [];
                
                // Хэрэв бүх 13 хос таарвал:
                if (matchedPairs === 13) {
                    showWinEffect();
                }
            } else {
                // ТААРСАНГҮЙ... 
                setTimeout(() => {
                    flippedCards.forEach(c => c.classList.remove('flipped'));
                    flippedCards = [];
                }, 800);
            }
        }
    }
}

function showWinEffect() {
    // 1. Голын R үсгийг лугшуулж эхлэх
    const centerCard = document.querySelector('.static-card');
    centerCard.classList.add('win-pulse');

    // 2. Дэлгэц дүүрэн баярын бичиг
    const canvas = document.getElementById('game-canvas');
    const winMsg = document.createElement('div');
    winMsg.className = 'win-message';
    winMsg.innerHTML = `
        <h2 class="win-text">PRO ymaaaaa</h2>
        <p class="win-subtext">All pairs matched except us.</p>
        <button onclick="startMatching()" class="retry-btn">PLAY AGAIN</button>
    `;
    canvas.appendChild(winMsg);

    // 3. Конфетти эффект (Энгийн CSS-ээр)
    createConfetti();
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.backgroundColor = ['#9B1B30', '#FFF0F3', '#FFD700'][Math.floor(Math.random() * 3)];
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}