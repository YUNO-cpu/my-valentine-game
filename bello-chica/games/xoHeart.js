let xoBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

function startXO() {
    xoBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    window.gameCanvas.innerHTML = `
        <div class="xo-container">
            <h2 class="title">PLAY WITH ME</h2>
            <div id="xo-status" class="status-text">Your turn (Heart)</div>
            <div class="xo-grid" id="xo-grid">
                ${xoBoard.map((_, i) => `<div class="xo-cell" onclick="handleCellClick(${i})"></div>`).join('')}
            </div>
            <button onclick="startXO()" class="reset-xo-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
            </button>
        </div>
    `;
}

function handleCellClick(i) {
    if (xoBoard[i] !== '' || !isGameActive) return;

    // Тоглогчийн нүүдэл (Heart)
    xoBoard[i] = 'H';
    renderXO();
    
    if (checkWinner()) {
        endXOGame('ХАЙР ЯЛЛАА❤️');
    } else if (!xoBoard.includes('')) {
        endXOGame('Draw!');
    } else {
        // Компьютерийн нүүдэл (X) - 500ms дараа
        isGameActive = false; 
        document.getElementById('xo-status').innerText = "Chico is thinking...";
        setTimeout(computerMove, 600);
    }
}

function computerMove() {
    let emptyCells = xoBoard.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        xoBoard[randomIndex] = 'X';
        renderXO();
        
        if (checkWinner()) {
            endXOGame('Chico won! 🥺');
        } else {
            isGameActive = true;
            document.getElementById('xo-status').innerText = "Your turn (Heart)";
        }
    }
}

function renderXO() {
    const cells = document.querySelectorAll('.xo-cell');
    const heartIcon = `<svg viewBox="0 0 24 24" fill="#f5576c" stroke="#f5576c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    const xIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    
    xoBoard.forEach((val, i) => {
        if (val === 'H') cells[i].innerHTML = heartIcon;
        else if (val === 'X') cells[i].innerHTML = xIcon;
        else cells[i].innerHTML = '';
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(p => xoBoard[p[0]] !== '' && xoBoard[p[0]] === xoBoard[p[1]] && xoBoard[p[0]] === xoBoard[p[2]]);
}

function endXOGame(msg) {
    isGameActive = false;
    document.getElementById('xo-status').innerText = msg;
}