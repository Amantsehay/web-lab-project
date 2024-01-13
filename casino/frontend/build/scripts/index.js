// import {getCurentBalanec} from './login-register.ts'
const rotateWheel = () => {
    const currentBet = document.getElementById('bet-number').valueAsNumber;
    console.log(currentBet, 'this is the current bet');
    const currentBalance = Number(document.getElementById('current-amount').querySelector('span').innerText);
    console.log(currentBalance, 'this is the current balance');
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.play-button');
    let deg = 0;
    const clickHandler = () => {
        startButton?.removeEventListener('click', clickHandler); // Remove the click event listener to prevent accumulation
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
        wheel?.addEventListener('transitionend', transitionEndHandler);
    };
    const transitionEndHandler = (e) => {
        console.log('Transition ended:', e.propertyName);
        if (wheel)
            wheel?.classList.remove('blur');
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
        startButton?.addEventListener('click', clickHandler);
    };
    if (currentBet > currentBalance) {
        alert('You do not have enough money to place this bet');
        return;
    }
    wheel?.removeEventListener('transitionend', transitionEndHandler);
    startButton?.addEventListener('click', clickHandler);
};
const startButton = document.querySelector('.play-button');
startButton?.addEventListener('click', (e) => {
    e.preventDefault();
    rotateWheel();
});
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
