function rotateWheel(){
    const wheel: HTMLElement | null = document.querySelector('.wheel');
    const startButton: HTMLButtonElement | null = document.querySelector('.play-button');

    let deg = 0;
    startButton?.addEventListener('click', ()=>{
        
        startButton.style.pointerEvents = 'none';
        if (wheel) {
            wheel.style.transition = 'all 10s ease-out';
            deg += Math.floor(5000 + Math.random()*5000);
            wheel.style.transform = `rotate(${deg}deg)`;
            wheel.classList.add('blur');
        }


     
    });

    wheel?.addEventListener('transitionend', ()=>{
        wheel.classList.remove('blur');
        if (startButton) {

            startButton.style.pointerEvents = 'auto';
        }
        wheel.style.transition = 'none';
        const actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;

        let result: HTMLElement | null = document.querySelector('.result');

        // if (actualDeg >= 0 && actualDeg < 10 ){

            if (result){

                result.innerHTML = '1';
            }

           
        // }
    });
}

export default rotateWheel;