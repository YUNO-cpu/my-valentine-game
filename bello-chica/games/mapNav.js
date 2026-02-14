let mazeLevel = 1;
let mazeMoves = 0;
let mazeSize = 7;
let mazeData = [];
let playerPos = { x: 0, y: 0 };
let exitPos = { x: 0, y: 0 };

function startMapNav() {
    mazeLevel = 1;
    mazeMoves = 0;
    mazeSize = 7;
    initMazeUI();
    setupMaze();
}

function initMazeUI() {
    window.gameCanvas.innerHTML = `
        <div class="maze-game-container">
            <div class="maze-stats">
                <div class="stat-pill">LVL: <span id="m-lvl">${mazeLevel}</span></div>
                <div class="stat-pill">MOVES: <span id="m-moves">0</span></div>
            </div>
            <div class="maze-wrapper">
                <canvas id="mazeCanvas"></canvas>
            </div>
            <div class="maze-controls">
                <button class="m-btn left" onclick="moveMazePlayer('left')">◀</button>
                <button class="m-btn up" onclick="moveMazePlayer('up')">▲</button>
                <button class="m-btn down" onclick="moveMazePlayer('down')">▼</button>
                <button class="m-btn right" onclick="moveMazePlayer('right')">▶</button>
            </div>
        </div>
    `;
}

function setupMaze() {
    const canvas = document.getElementById('mazeCanvas');
    if(!canvas) return;
    
    // Canvas-ийн хэмжээг гар утасны дэлгэцэнд илүү сайн тааруулах (300px-ээс ихгүй)
    const containerWidth = window.gameCanvas.clientWidth;
    const size = Math.min(containerWidth - 60, 300); 
    canvas.width = size;
    canvas.height = size;
    
    generateMazeData();
    drawMaze();
}

function generateMazeData() {
    mazeData = Array(mazeSize).fill().map(() => Array(mazeSize).fill(0));
    const stack = [];
    const visited = Array(mazeSize).fill().map(() => Array(mazeSize).fill(false));
    
    let current = { x: 0, y: 0 };
    visited[0][0] = true;
    stack.push(current);
    
    const directions = [
        { dx: 0, dy: -1, bit: 1 }, // UP
        { dx: 1, dy: 0, bit: 2 },  // RIGHT
        { dx: 0, dy: 1, bit: 4 },  // DOWN
        { dx: -1, dy: 0, bit: 8 }  // LEFT
    ];
    
    while (stack.length > 0) {
        current = stack[stack.length - 1];
        const neighbors = directions.filter(d => {
            const nx = current.x + d.dx;
            const ny = current.y + d.dy;
            return nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize && !visited[ny][nx];
        });

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            mazeData[current.y][current.x] |= next.bit;
            const reverseBit = next.bit === 1 ? 4 : next.bit === 2 ? 8 : next.bit === 4 ? 1 : 2;
            mazeData[current.y + next.dy][current.x + next.dx] |= reverseBit;
            visited[current.y + next.dy][current.x + next.dx] = true;
            stack.push({ x: current.x + next.dx, y: current.y + next.dy });
        } else {
            stack.pop();
        }
    }
    playerPos = { x: 0, y: 0 };
    exitPos = { x: mazeSize - 1, y: mazeSize - 1 };
}

function drawMaze() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / mazeSize;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Төөрдөг байшингийн хана зурах
    ctx.strokeStyle = '#fb7185'; // Өнгийг чиний Cherry өнгөтэй ижил болгов
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            const cell = mazeData[y][x];
            const px = x * cellSize;
            const py = y * cellSize;
            
            // Зам байхгүй бол хана зурна
            if (!(cell & 1)) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + cellSize, py); ctx.stroke(); }
            if (!(cell & 2)) { ctx.beginPath(); ctx.moveTo(px + cellSize, py); ctx.lineTo(px + cellSize, py + cellSize); ctx.stroke(); }
            if (!(cell & 4)) { ctx.beginPath(); ctx.moveTo(px, py + cellSize); ctx.lineTo(px + cellSize, py + cellSize); ctx.stroke(); }
            if (!(cell & 8)) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + cellSize); ctx.stroke(); }
        }
    }

    // Зүрх зурах (Target)
    ctx.font = `${cellSize * 0.5}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("❤️", (exitPos.x + 0.5) * cellSize, (exitPos.y + 0.5) * cellSize);

    // Туулай зурах (Player)
    ctx.font = `${cellSize * 0.6}px serif`;
    ctx.fillText("🐰", (playerPos.x + 0.5) * cellSize, (playerPos.y + 0.5) * cellSize);
}

function moveMazePlayer(dir) {
    const bitMap = { up: 1, right: 2, down: 4, left: 8 };
    const moveMap = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
    
    // Хана мөргөөгүй бол хөдөлнө
    if (mazeData[playerPos.y][playerPos.x] & bitMap[dir]) {
        playerPos.x += moveMap[dir][0];
        playerPos.y += moveMap[dir][1];
        mazeMoves++;
        
        const moveEl = document.getElementById('m-moves');
        if(moveEl) moveEl.innerText = mazeMoves;
        
        drawMaze();
        
        // Хожсон эсэхийг шалгах
        if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
            setTimeout(() => {
                alert(`🐰❤️ Bunny found the heart in ${mazeMoves} moves!`);
                mazeLevel++;
                mazeSize = Math.min(mazeSize + 1, 12); // Үе нэмэгдэх тусам томорно
                mazeMoves = 0;
                initMazeUI();
                setupMaze();
            }, 100);
        }
    }
}