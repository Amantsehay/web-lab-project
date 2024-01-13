"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rotateWheel() {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.play-button');
    let deg = 0;
    startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', () => {
        startButton.style.pointerEvents = 'none';
        if (wheel) {
            wheel.style.transition = 'all 10s ease-out';
            deg += Math.floor(5000 + Math.random() * 5000);
            wheel.style.transform = `rotate(${deg}deg)`;
            wheel.classList.add('blur');
        }
    });
    wheel === null || wheel === void 0 ? void 0 : wheel.addEventListener('transitionend', () => {
        wheel.classList.remove('blur');
        if (startButton) {
            startButton.style.pointerEvents = 'auto';
        }
        wheel.style.transition = 'none';
        const actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        let result = document.querySelector('.result');
        // if (actualDeg >= 0 && actualDeg < 10 ){
        if (result) {
            result.innerHTML = '1';
        }
        // }
    });
}
exports.default = rotateWheel;
