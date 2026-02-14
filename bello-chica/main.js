// 1. Хамгийн дээр нь зарлана
window.gameCanvas = null;

const games = [
    { name: 'Love Match', 
        func: 'startMatching', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' },
    { name: 'Claw Machine', 
        func: 'startClaw', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3m18 0a3 3 0 01-6 0m6 0h-6m-8 0a3 3 0 01-6 0m6 0H5m7-5v10m0 0l-3 3m3-3l3 3"/></svg>' },
    { name: 'Word Scramble', 
        func: 'startScramble', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 19h16M4 15h16M4 11h16M4 7h16"/></svg>' },
    { name: 'Map Nav', 
        func: 'startMapNav', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { name: 'Love Meter', 
        func: 'startLoveMeter', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
    { name: 'ZODIAC SIGN', 
        func: 'startStarConnect', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
    { name: 'Tic Tac Toe', 
        func: 'startXO', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M18 6L6 18M6 6l12 12"/></svg>' },
    { name: 'Heart Pop', 
        func: 'startHeartPop', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>' },
    { name: 'Puzzle', 
        func: 'startDatePuzzle', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 3H5a2 2 0 00-2 2v5m14-7h5a2 2 0 012 2v5m-2 11h-5a2 2 0 01-2-2v-5m-14 7h5a2 2 0 002-2v-5"/></svg>' },
    { name: 'Catch Heart', 
        func: 'startCatchHeart', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><path d="M3 6h18m-11 4v6m4-6v6"/></svg>' },
    { 
        name: 'Love Thermometer', 
        func: 'startLoveThermometer', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 1 1 4 0z"/><path d="M12 7v4"/><path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>' 
    },
    { 
        name: 'Secret Bottle', 
        func: 'startBottle', 
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 3h6v3h-6V3zM7 6h10v13a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V6h10"/><path d="M12 11v5m-2-2l2 2 2-2" stroke-linecap="round"/></svg>' 
    }
];

// 2. Цэс үүсгэх хэсэг
window.onload = () => {
    window.gameCanvas = document.getElementById('game-canvas');
    const grid = document.getElementById('grid-container');

    games.forEach((game, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="card-icon-wrapper">${game.icon}</div><span class="card-title">${game.name}</span>`;
        card.onclick = () => launchGame(i); // i+1 биш шууд i (индекс)
        grid.appendChild(card);
    });
};

// 3. Тоглоом эхлүүлэх функц (Dynamic)
function launchGame(index) {
    const game = games[index];
    const mainMenu = document.getElementById('main-menu');
    const gameOverlay = document.getElementById('game-overlay');
    const gameTitle = document.getElementById('current-game-title');
    
    mainMenu.classList.add('hidden');
    gameOverlay.classList.remove('hidden');
    gameTitle.innerText = game.name.toUpperCase();
    
    window.gameCanvas.innerHTML = ''; 

    // Жагсаалтад байгаа функцийн нэрээр дуудах
    const functionName = game.func;
    
    if (typeof window[functionName] === 'function') {
        window[functionName]();
    } else {
        window.gameCanvas.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <p class="soon-text">${game.name} COMING SOON ✨</p>
                <small style="color: #888;">Function ${functionName} not found</small>
            </div>
        `;
    }
}

function backToMenu() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    window.gameCanvas.innerHTML = ''; 
}