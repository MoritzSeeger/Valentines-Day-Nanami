document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const content = document.getElementById('content');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const flowerContainer = document.getElementById('flower-container');
    const dog = document.getElementById('dog'); 

    // --- Funktion: Tulpen-Strauß (luftig mit 15 Tulpen) ---
    function createTulips() {
        const tulipCount = 15;
        const colors = ['#ffb7c5', '#ff8da1', '#e75480', '#ffffff', '#f8f4e3', '#fc89ac', '#ff69b4'];
        const fragment = document.createDocumentFragment();
        const createdTulips = [];

        for (let i = 0; i < tulipCount; i++) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('tulip-wrapper');
            const head = document.createElement('div');
            head.classList.add('tulip-head');
            const stem = document.createElement('div');
            stem.classList.add('tulip-stem');
            const leaf = document.createElement('div');
            leaf.classList.add('tulip-leaf');

            const color = colors[Math.floor(Math.random() * colors.length)];
            wrapper.style.setProperty('--tulip-color', color);
            
            const rotation = -45 + (90 / (tulipCount - 1) * i) + (Math.random() * 10 - 5);
            const scaleBase = 0.8 + (Math.floor(Math.random() * 10) / 30); 
            stem.style.height = `${220 + Math.random() * 100}px`;

            stem.appendChild(leaf);
            wrapper.appendChild(head);
            wrapper.appendChild(stem);
            fragment.appendChild(wrapper);
            wrapper.style.transform = `rotate(${rotation}deg) scale(${scaleBase})`;
            createdTulips.push(wrapper);
        }
        flowerContainer.appendChild(fragment);
        createdTulips.forEach((wrapper) => {
            setTimeout(() => { wrapper.classList.add('bloom'); }, 50 + (Math.random() * 1500));
        });
    }

    // --- FUNKTION: Flüssiges Wandern in Kurven für den Shiba Inu ---
    function startDogWalking() {
        if (!dog) return;

        let posX = window.innerWidth / 2;
        let posY = window.innerHeight / 2;
        let targetX = posX;
        let targetY = posY;
        let speed = 2; 
        let angle = Math.random() * Math.PI * 2;

        function updatePosition() {
            const dx = targetX - posX;
            const dy = targetY - posY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 5 || Math.random() < 0.005) {
                const margin = 100;
                targetX = margin + Math.random() * (window.innerWidth - margin * 2);
                targetY = margin + Math.random() * (window.innerHeight - margin * 2);
            }

            const targetAngle = Math.atan2(dy, dx);
            let angleDiff = targetAngle - angle;
            
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            
            angle += angleDiff * 0.05; 

            posX += Math.cos(angle) * speed;
            posY += Math.sin(angle) * speed;

            const isMovingLeft = Math.cos(angle) < 0;
            dog.style.transform = `scaleX(${isMovingLeft ? -1 : 1})`;

            dog.style.left = posX + 'px';
            dog.style.top = posY + 'px';

            requestAnimationFrame(updatePosition);
        }
        requestAnimationFrame(updatePosition);
    }

    // --- Öffnungs-Logik des Briefes ---
    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            content.classList.remove('hidden');
            createTulips();
        }, 1500); 
    });

    // --- Logik für den flüchtenden Nein-Button ---
    noBtn.addEventListener('mouseover', () => {
        const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth - 100) + 50; 
        const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight - 100) + 50;
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.transform = 'none';
    });

    noBtn.addEventListener('click', () => { 
        alert("Versuch es doch mal mit dem anderen Button! 😉"); 
    });

    // --- JA-Logik: Finale Seite, Konfetti, Hund & E-Mail Benachrichtigung ---
    yesBtn.addEventListener('click', () => {
        flowerContainer.style.display = 'none';
        const overlay = document.querySelector('.text-overlay');
        if (overlay) overlay.style.display = 'none';

        // --- NEU: E-Mail Benachrichtigung via Formspree ---
        fetch("https://formspree.io/f/xwvnvdpo", {
            method: "POST",
            body: JSON.stringify({
                antwort: "Nanami hat JA gesagt! 🎉",
                event: "Valentinstag 2026",
                details: "Treffpunkt 14:00 Uhr"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(err => console.log("Mail-Fehler:", err));

        // Konfetti Feier-Funktion
        function celebrate() {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0, y: 1 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: 1, y: 1 } }));
            }, 250);
        }

        celebrate();

        content.innerHTML = `
            <div style="animation: fadeIn 1s; z-index: 100; position: relative; display: flex; flex-direction: column; align-items: center; gap: 40px; justify-content: center; height: 100%;">
                <h1 style="font-size: 2.5rem; color: #e91e63; animation: gentleFloat 3s ease-in-out infinite; font-family: 'Playfair Display', serif; text-shadow: 0 0 15px rgba(255,255,255,0.9); margin: 0; background-color: rgba(255, 255, 255, 0.4); backdrop-filter: blur(4px); padding: 15px 30px; border-radius: 20px; line-height: 1.2; text-align: center;">
                    Treffpunkt: 14.02. 2026<br>14:00 Uhr hol ich dich ab
                </h1>
                <h1 style="font-size: 2.2rem; color: #c2185b; animation: gentleFloat 3.5s ease-in-out infinite; font-family: 'Playfair Display', serif; text-shadow: 0 0 15px rgba(255,255,255,0.9); margin: 0; background-color: rgba(255, 255, 255, 0.4); backdrop-filter: blur(4px); padding: 15px 30px; border-radius: 20px; font-style: italic; text-align: center;">
                    Kleidung? So wie du dich wohl fühlst
                </h1>
            </div>
        `;
        
        document.body.style.backgroundColor = "#ffc1e3";
        document.body.style.transition = "background 2s ease-in-out";

        if (dog) {
            dog.classList.remove('hidden');
            startDogWalking();
        }
    });
});