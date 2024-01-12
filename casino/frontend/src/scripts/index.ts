const rotateWheel = (): void => {
    const wheel: HTMLElement | null = document.querySelector('.wheel');
    const startButton: HTMLButtonElement | null = document.querySelector('.play-button');

    let deg = 0;

    const clickHandler = () => {
        startButton?.removeEventListener('click', clickHandler); // Remove the click event listener to prevent accumulation
        if (startButton){
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

    const transitionEndHandler = (e: TransitionEvent) => {
        console.log('Transition ended:', e.propertyName);
        if (wheel)
        wheel?.classList.remove('blur');
        if (startButton) {
            startButton.style.pointerEvents = 'auto';
        }
        if (wheel){

            wheel.style.transition = 'none';
            const actualDeg = deg % 360;
            wheel.style.transform = `rotate(${actualDeg}deg)`;
            console.log(actualDeg, 'this is the actual');
        }

        let result: HTMLElement | null = document.querySelector('.result');

        if (result) {
            result.innerHTML = '1';
        }

        
        wheel?.removeEventListener('transitionend', transitionEndHandler);
      
        startButton?.addEventListener('click', clickHandler);
    };


    startButton?.addEventListener('click', clickHandler);
};


rotateWheel();

const menuIcon: HTMLElement | null = document.querySelector('.menu-icon');
const navBar: HTMLElement | null = document.querySelector('.nav-bar');

if (menuIcon && navBar) {
  menuIcon.addEventListener('click', function() {
    navBar.classList.toggle('show');
  });
}

function displayRegistrationForm(): void {
  const registrationForm: HTMLElement | null = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.style.display = "block";
  }
}

  const closeRegistrationForm = (): void => {
  const registrationForm: HTMLElement | null = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.style.display = "none";
  }
}

const displayLoginForm = (): void => {
  const loginForm: HTMLElement | null = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.style.display = "block";
  }
}

const closeLoginForm = (): void => {
  const loginForm: HTMLElement | null = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.style.display = "none";
  }
}


// export default rotateWheel;


 