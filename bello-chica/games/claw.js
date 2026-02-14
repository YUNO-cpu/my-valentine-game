let clawMoving = false;
let isClawDescending = false;
let clawMoveTimer;
let isDraggingJoystick = false;

function startClaw() {
    if (!window.gameCanvas) {
        window.gameCanvas = document.getElementById('game-canvas');
    }
    
    window.gameCanvas.innerHTML = `
        <div class="claw-machine-shell">
            <div class="machine-glass">
                <div id="claw" class="claw-mechanism" style="left: 50%;">
                    <div class="claw-string" id="claw-string"></div>
                    <div id="claw-head" class="claw-head">
                        <div class="claw-core"></div>
                        <div class="claw-arm arm-1"></div>
                        <div class="claw-arm arm-2"></div>
                        <div id="caught-prize-container"></div>
                    </div>
                </div>
                <div class="plushies-bed" id="plushies-bed"></div>
            </div>

            <div class="machine-bottom">
                <div class="controls-row">
                    <div class="joystick-base">
                        <div class="joystick" id="joystick-stick" 
                             onmousedown="startJoystickDrag(event)" 
                             ontouchstart="startJoystickDrag(event)">
                        </div>
                        <span class="js-dir dir-up">▲</span>
                        <span class="js-dir dir-left">◀</span>
                        <span class="js-dir dir-right">▶</span>
                        <span class="js-dir dir-down">▼</span>
                    </div>
                    <button id="push-btn" class="push-btn" onclick="dropClaw()">PUSH</button>
                </div>
            </div>
        </div>

        <div class="claw-controls">
            <button class="dir-btn" 
                onmousedown="handleClawMove(-1)" 
                ontouchstart="handleClawMove(-1)" 
                onmouseup="stopClawMove()" 
                ontouchend="stopClawMove()">◀</button>
            <button class="dir-btn" 
                onmousedown="handleClawMove(1)" 
                ontouchstart="handleClawMove(1)" 
                onmouseup="stopClawMove()" 
                ontouchend="stopClawMove()">▶</button>
        </div>
    `;
    populatePlushies();
    isClawDescending = false;
}

// --- ЖОЙСТИК ЧИРЭХ ЛОГИК ---

function startJoystickDrag(e) {
    if (isClawDescending) return;
    isDraggingJoystick = true;
    
    document.addEventListener('mousemove', handleJoystickMove);
    document.addEventListener('mouseup', stopJoystickDrag);
    document.addEventListener('touchmove', handleJoystickMove, { passive: false });
    document.addEventListener('touchend', stopJoystickDrag);
}

function handleJoystickMove(e) {
    if (!isDraggingJoystick) return;
    e.preventDefault();

    const stick = document.getElementById('joystick-stick');
    const base = document.querySelector('.joystick-base');
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - centerX;
    
    // Хазайлтын өнцөг (35 градусаар хязгаарлав)
    let angle = diffX * 0.7;
    if (angle > 35) angle = 35;
    if (angle < -35) angle = -35;
    
    stick.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    // Хөдөлгөөний чиглэл (Мэдрэмж: 8 градусаас илүү хазайвал хөдөлнө)
    const dir = angle > 8 ? 1 : (angle < -8 ? -1 : 0);
    
    if (dir !== 0) {
        startMovingClaw(dir);
    } else {
        clearInterval(clawMoveTimer);
        clawMoving = false;
    }
}

function stopJoystickDrag() {
    isDraggingJoystick = false;
    stopClawMove(); // Таймер зогсоож, савааг цэх болгоно
    
    document.removeEventListener('mousemove', handleJoystickMove);
    document.removeEventListener('mouseup', stopJoystickDrag);
    document.removeEventListener('touchmove', handleJoystickMove);
    document.removeEventListener('touchend', stopJoystickDrag);
}

// --- КРАН ХӨДӨЛГӨХ ҮНДСЭН ФУНКЦУУД ---

function handleClawMove(dir) {
    if (isClawDescending) return; 
    const stick = document.getElementById('joystick-stick');
    if (stick) {
        stick.style.transform = `translate(-50%, -50%) rotate(${dir * 30}deg)`;
    }
    startMovingClaw(dir);
}

function startMovingClaw(dir) {
    if (clawMoving) return; 
    clawMoving = true;
    
    clearInterval(clawMoveTimer);
    clawMoveTimer = setInterval(() => {
        const claw = document.getElementById('claw');
        if (!claw) return;
        let currentLeft = parseFloat(claw.style.left);
        let newLeft = currentLeft + (dir * 1.5);
        if (newLeft > 8 && newLeft < 92) {
            claw.style.left = newLeft + '%';
        }
    }, 30);
}

function stopClawMove() {
    clearInterval(clawMoveTimer);
    clawMoving = false;
    const stick = document.getElementById('joystick-stick');
    if (stick) {
        stick.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }
}

// --- БУСАД ФУНКЦУУД (Тоглоом барих, Өрөх) ---

function populatePlushies() {
    const bed = document.getElementById('plushies-bed');
    if (!bed) return;
    bed.innerHTML = '';
    
    for (let i = 1; i <= 12; i++) {
        const toy = document.createElement('div');
        toy.className = 'plushie';
        toy.id = 'toy-' + i;
        toy.innerHTML = `<img src="assets/a${i}.png" class="plushie-img">`;
        
        const row = i > 6 ? 0 : 1; 
        const xPos = ((i - 1) % 6) * 15 + 10; 
        const yPos = row * 30 + (Math.random() * 10); 
        
        toy.style.left = xPos + '%';
        toy.style.bottom = yPos + 'px';
        toy.dataset.pos = xPos;
        toy.dataset.id = i;
        bed.appendChild(toy);
    }
}

function dropClaw() {
    if (isClawDescending) return;
    isClawDescending = true;
    stopClawMove(); // Буух үед хөдөлгөөнийг зогсооно

    const mechanism = document.getElementById('claw');
    const head = document.getElementById('claw-head');
    const pushBtn = document.getElementById('push-btn');

    if (pushBtn) pushBtn.disabled = true;

    mechanism.style.transition = "height 1.2s ease-out"; 
    mechanism.style.height = "300px"; 
    
    setTimeout(() => {
        head.classList.add('closed'); 
        checkCatch(); 
        
        setTimeout(() => {
            mechanism.style.transition = "height 1.2s ease-in"; 
            mechanism.style.height = "40px"; 
            
            setTimeout(() => {
                head.classList.remove('closed');
                isClawDescending = false;
                if (pushBtn) pushBtn.disabled = false;
            }, 1200);
        }, 800);
    }, 1200);
}

function checkCatch() {
    const claw = document.getElementById('claw');
    const clawX = parseFloat(claw.style.left);
    const plushies = document.querySelectorAll('.plushie');
    let caughtToy = null;

    plushies.forEach(toy => {
        const toyX = parseFloat(toy.dataset.pos);
        if (Math.abs(clawX - toyX) < 7) {
            caughtToy = toy;
        }
    });

    if (caughtToy) {
        const caughtContainer = document.getElementById('caught-prize-container');
        const toyId = caughtToy.dataset.id;
        
        caughtToy.style.visibility = 'hidden';
        caughtContainer.innerHTML = `<img src="assets/a${toyId}.png" class="plushie-img-caught" style="width: 50px; transform: translateY(15px);">`;
        
        setTimeout(() => {
            showClawWin(toyId);
            caughtContainer.innerHTML = '';
        }, 1800);
    }
}

function showClawWin(id) {
    const overlay = document.createElement('div');
    overlay.className = 'prize-reveal-overlay';
    overlay.innerHTML = `
        <div class="prize-card">
            <img src="assets/a${id}.png" class="win-prize-img" style="width: 120px;">
            <h2 class="win-text">TA-DA!</h2>
            <button onclick="this.parentElement.parentElement.remove(); startClaw();" class="claim-btn">АВАХ</button>
        </div>
    `;
    document.body.appendChild(overlay);
}