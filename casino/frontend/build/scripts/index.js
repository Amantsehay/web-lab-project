"use strict";
const rotateWheel = () => {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.play-button');
    let deg = 0;
    const clickHandler = () => {
        startButton === null || startButton === void 0 ? void 0 : startButton.removeEventListener('click', clickHandler); // Remove the click event listener to prevent accumulation
        if (startButton) {
            startButton.style.pointerEvents = 'none';
        }
        if (wheel) {
            wheel.style.transition = 'all 10s ease';
            deg = Math.floor(5000 + Math.random() * 5000);
            wheel.style.transform = `rotate(${deg}deg)`;
            wheel.classList.add('blur');
        }
        // Add the transitionend event listener after the rotation starts
        wheel === null || wheel === void 0 ? void 0 : wheel.addEventListener('transitionend', transitionEndHandler);
    };
    const transitionEndHandler = (e) => {
        console.log('Transition ended:', e.propertyName);
        if (wheel)
            wheel === null || wheel === void 0 ? void 0 : wheel.classList.remove('blur');
        if (startButton) {
            startButton.style.pointerEvents = 'auto';
        }
        if (wheel) {
            wheel.style.transition = 'none';
            const actualDeg = deg % 360;
            wheel.style.transform = `rotate(${actualDeg}deg)`;
            console.log(actualDeg, 'this is the actual');
        }
        let result = document.querySelector('.result');
        if (result) {
            result.innerHTML = '1';
        }
        wheel === null || wheel === void 0 ? void 0 : wheel.removeEventListener('transitionend', transitionEndHandler);
        startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', clickHandler);
    };
    startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', clickHandler);
};
rotateWheel();
const menuIcon = document.querySelector('.menu-icon');
const navBar = document.querySelector('.nav-bar');
if (menuIcon && navBar) {
    menuIcon.addEventListener('click', function () {
        navBar.classList.toggle('show');
    });
}
function displayRegistrationForm() {
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.style.display = "block";
    }
}
const closeRegistrationForm = () => {
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.style.display = "none";
    }
};
const displayLoginForm = () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.style.display = "block";
    }
};
const closeLoginForm = () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.style.display = "none";
    }
};
// export default rotateWheel;
