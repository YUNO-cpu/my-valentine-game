function startScramble() {
    // Чиний шинэчилсэн богино үгнүүд
    const words = ['TIANA', 'LILIES', 'BABLACK', 'RYSHOLIC', 'NOMARTIN', 'YESJAEHYUN'];
    const targetWord = words[Math.floor(Math.random() * words.length)];
    
    // Үсэг холих
    let scrambled = targetWord.split('').sort(() => Math.random() - 0.5).join('');
    
    // Canvas-ийг цэвэрлэж бүтэц үүсгэх
    window.gameCanvas.innerHTML = `
        <div class="scramble-container">
            <div id="word-display" class="word-slots"></div>
            <div id="letters-pool" class="letters-grid"></div>
            <div class="scramble-controls">
                <button id="next-game-btn" class="reset-btn">NEXT</button>
            </div>
        </div>
    `;

    const display = document.getElementById('word-display');
    const pool = document.getElementById('letters-pool');
    let currentGuess = [];

    function updateDisplay() {
        // Дэлгэц дээр зайтай харуулна
        display.innerText = currentGuess.join(' ');

        // Бүх үсгийг бөглөж дууссан бол
        if (currentGuess.length === targetWord.length) {
            if (currentGuess.join('') === targetWord) {
                display.style.color = 'var(--cherry)';
                setTimeout(() => {
                    alert('SUPERDUPER!');
                    startScramble(); // Шууд дараагийнх руу
                }, 200);
            } else {
                setTimeout(() => {
                    alert('TRY AGAIN!');
                    startScramble(); // Алдсан бол дахиж эхлүүлнэ
                }, 500);
            }
        }
    }

    // Үсэг бүрийг товчлуур болгож үүсгэх
    scrambled.split('').forEach((char) => {
        const btn = document.createElement('button');
        btn.className = 'letter-tile';
        btn.innerText = char;
        btn.onclick = () => {
            if (!btn.classList.contains('used')) {
                btn.classList.add('used');
                currentGuess.push(char);
                updateDisplay();
            }
        };
        pool.appendChild(btn);
    });

    // Event Listener ашиглах нь HTML-д onclick бичсэнээс илүү найдвартай
    document.getElementById('next-game-btn').addEventListener('click', startScramble);
}

// Анхны удаа ажиллуулах
startScramble();
