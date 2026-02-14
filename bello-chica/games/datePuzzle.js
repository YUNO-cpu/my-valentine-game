let currentLevel = 1;
let selectedPiece = null; // Сонгосон piece-ийг хадгалах

const levelConfig = {
    1: { grid: 3, img: 'assets/bella-1.jpg', label: 'The Library (3x3)' },
    2: { grid: 4, img: 'assets/bella-2.jpg', label: 'The Ballroom (4x4)' },
    3: { grid: 5, img: 'assets/bella-3.jpg', label: 'True Love (5x5)' }
};

function startDatePuzzle() {
    renderLevel(currentLevel);
}

function renderLevel(level) {
    const config = levelConfig[level];
    const size = config.grid;
    let pieces = [];
    
    for(let i=0; i < size * size; i++) pieces.push(i);
    pieces.sort(() => Math.random() - 0.5); // Холих

    window.gameCanvas.innerHTML = `
        <div class="puzzle-container" id="puzzle-container">
            <div class="puzzle-header">
                <span class="level-badge">Level ${level}: ${config.label}</span>
            </div>
            <div class="puzzle-board" id="puzzle-board" style="grid-template-columns: repeat(${size}, 1fr);">
                ${pieces.map((p, index) => `
                    <div class="p-piece" 
                         onclick="handlePieceClick(this)" 
                         data-correct="${p}" 
                         data-current="${index}">
                        <div class="piece-content" style="background-image: url('${config.img}'); 
                             background-size: ${size * 100}% ${size * 100}%; 
                             background-position: ${(p % size) * (100/(size-1))}% ${Math.floor(p / size) * (100/(size-1))}%">
                        </div>
                    </div>
                `).join('')}
            </div>
            <p class="hint">ХАЙРТАЙ ДАА❤️</p>
        </div>
    `;
}

function handlePieceClick(element) {
    if (!selectedPiece) {
        // Эхний piece-ийг сонгох
        selectedPiece = element;
        element.classList.add('selected');
    } else {
        // Хоёр дахь piece-ийг сонгоод байрыг нь солих
        swapPieces(selectedPiece, element);
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        
        // Хожсон эсэхийг шалгах
        checkWin();
    }
}

function swapPieces(piece1, piece2) {
    const content1 = piece1.innerHTML;
    const correct1 = piece1.getAttribute('data-correct');
    
    // HTML агуулга болон data-correct утгуудыг солих
    piece1.innerHTML = piece2.innerHTML;
    piece1.setAttribute('data-correct', piece2.getAttribute('data-correct'));
    
    piece2.innerHTML = content1;
    piece2.setAttribute('data-correct', correct1);
}

function checkWin() {
    const pieces = document.querySelectorAll('.p-piece');
    let isCorrect = true;
    
    pieces.forEach((p, index) => {
        if (parseInt(p.getAttribute('data-correct')) !== index) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        if (currentLevel < 3) {
            alert("Амжилттай! Дараагийн үе рүү...");
            currentLevel++;
            setTimeout(() => renderLevel(currentLevel), 500);
        } else {
            alert("❤️");
        }
    }
}