let starLevel = 1;
let points = [];
let connections = [];
let isDragging = false;
let currentPoint = null;

const levelShapes = [
    { icon: "❤️", points: [[150,80], [190,40], [240,60], [250,120], [150,230], [50,120], [60,60], [110,40]] },
    { icon: "🍒", points: [[150,50], [180,30], [220,60], [190,140], [220,190], [180,230], [140,200], [110,230], [70,190], [100,140]] },
    { icon: "🌸", points: [[150,100], [180,40], [230,80], [210,140], [250,200], [150,170], [50,200], [90,140], [70,80], [120,40]] }
];

function startStarConnect() {
    starLevel = 1;
    initStarUI();
}

function initStarUI() {
    // 1. Өгөгдлийг бүрэн шинэчлэх (Reset)
    connections = [];
    isDragging = false;
    currentPoint = null;

    // 2. HTML-ийг шинээр үүсгэх
    window.gameCanvas.innerHTML = `
        <div class="star-game-layout">
            <div class="level-indicator">LEVEL 0${starLevel} — 03</div>
            
            <div class="canvas-holder">
                <canvas id="starCanvas"></canvas>
                <div id="result-emoji" class="result-display"></div>
            </div>

            <div class="bottom-area" style="height: 60px; display: flex; align-items: center; justify-content: center;">
                <h2 id="connect-text" class="bottom-label">CONNECT</h2>
                <button id="next-btn" class="btn-next-step">NEXT</button>
            </div>
        </div>
    `;
    
    // NEXT товчлуур дээр дарахад дараагийн түвшин рүү
    document.getElementById('next-btn').onclick = () => {
        if (starLevel < 3) {
            starLevel++;
            initStarUI(); // Дараагийн дүрсийг ачаалах
        } else {
            backToMenu(); // Тоглоом дуусах
        }
    };
    
    setTimeout(setupStarCanvas, 20);
}

function setupStarCanvas() {
    const canvas = document.getElementById('starCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    const shape = levelShapes[starLevel-1];
    points = shape.points.map((p, i) => ({ x: p[0], y: p[1], id: i }));

    const render = (mousePos = null) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Шугам зурах
        ctx.beginPath();
        ctx.strokeStyle = "#9B1B30"; // Cherry Red
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        connections.forEach(c => {
            ctx.moveTo(points[c.from].x, points[c.from].y);
            ctx.lineTo(points[c.to].x, points[c.to].y);
        });
        ctx.stroke();

        // Dragging Line
        if (isDragging && mousePos && currentPoint) {
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "rgba(155, 27, 48, 0.3)";
            ctx.moveTo(currentPoint.x, currentPoint.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Цэгүүд зурах
        points.forEach(p => {
            const isConnected = connections.some(c => c.from === p.id || c.to === p.id);
            const active = currentPoint && p.id === currentPoint.id;
            
            ctx.fillStyle = active || isConnected ? "#9B1B30" : "#D1D1D1";
            ctx.beginPath();
            ctx.arc(p.x, p.y, active ? 6 : 4, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x: cx, y: cy };
    };

    canvas.onmousedown = canvas.ontouchstart = (e) => {
        e.preventDefault();
        const pos = getPos(e);
        const hit = points.find(p => Math.hypot(p.x - pos.x, p.y - pos.y) < 25);
        if (hit) { 
            isDragging = true; 
            currentPoint = hit; 
            render(pos); 
        }
    };

    window.onmousemove = window.ontouchmove = (e) => {
        if (!isDragging) return;
        const pos = getPos(e);
        const hit = points.find(p => Math.hypot(p.x - pos.x, p.y - pos.y) < 20);
        
        if (hit && hit.id !== currentPoint.id) {
            const exists = connections.some(c => 
                (c.from === currentPoint.id && c.to === hit.id) || 
                (c.from === hit.id && c.to === currentPoint.id)
            );

            if (!exists) {
                connections.push({ from: currentPoint.id, to: hit.id });
                currentPoint = hit;
                checkWin();
            }
        }
        render(pos);
    };

    window.onmouseup = window.ontouchend = () => {
        isDragging = false;
        currentPoint = null;
        render();
    };

    render();
}

function checkWin() {
    const connectedSet = new Set();
    connections.forEach(c => {
        connectedSet.add(c.from);
        connectedSet.add(c.to);
    });

    // Бүх цэгүүд холбогдсон уу?
    if (connectedSet.size === points.size) {
        // 1. Эможи харуулах
        const emoji = document.getElementById('result-emoji');
        if (emoji) {
            emoji.innerHTML = levelShapes[starLevel-1].icon;
            emoji.classList.add('show');
        }

        // 2. Текст болон Товчлуур солих
        document.getElementById('connect-text').style.display = 'none';
        document.getElementById('next-btn').style.display = 'block';
        
        isDragging = false;
    }
}