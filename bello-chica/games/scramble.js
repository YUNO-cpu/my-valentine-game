function startScramble() {
    const words = ['TIANA', 'LILIES', 'BABLACK', 'RYSHOLIC', 'HIPPOPOTOMONSTROSESQUIPEDALIOPHOBIA', 'PNEUMONOULTRAMICROSCOPICSILICOVOCANOCONIOSIS'];
    const targetWord = words[Math.floor(Math.random() * words.length)];
    let scrambled = targetWord.split('').sort(() => Math.random() - 0.5).join('');
    
    window.gameCanvas.innerHTML = `
        <div class="scramble-container">
            <div id="word-display" class="word-slots"></div>
            <div id="letters-pool" class="letters-grid"></div>
            <div class="scramble-controls">
                <button onclick="startScramble()" class="reset-btn">NEXT</button>
            </div>
        </div>
    `;

    const display = document.getElementById('word-display');
    const pool = document.getElementById('letters-pool');
    let currentGuess = [];

    // Үсэг бүрийг товчлуур болгож үүсгэх
    scrambled.split('').forEach((char, i) => {
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

    function updateDisplay() {
        display.innerText = currentGuess.join(' ');
        if (currentGuess.length === targetWord.length) {
            if (currentGuess.join('') === targetWord) {
                display.style.color = 'var(--cherry)';
                setTimeout(() => alert('SUPERCALIFRAGILISTICEXPIALIDOCIOUS!'), 200);
            } else {
                setTimeout(() => {
                    alert('TRY AGAIN!');
                    startScramble();
                }, 500);
            }
        }
    }
}
