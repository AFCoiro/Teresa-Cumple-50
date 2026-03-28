/*COUNT-DOWN*/

const countdown = document.getElementById('countdown');
const hoursCopy = document.querySelector('.countdown-copy');

let date = new Date("2026-05-02T20:30:00-03:00").getTime(); 

const fnCountDown = () => {
    let now = new Date().getTime();
    let distance = date - now;

    if (distance <= 0) {
        if (countdown) countdown.innerHTML = "¡A festejar!🚌💨";
        if (hoursCopy) hoursCopy.style.display = 'none';
        clearInterval(interval);
        return; 
    }
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const d = days.toString().padStart(2, '0');
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');

    countdown.innerHTML = `${d}:${h}:${m}:${s}`;
};

const interval = setInterval(fnCountDown, 1000);
fnCountDown();

/*MODAL*/
const btnOpen = document.querySelectorAll('.btn-open-modal');
const btnClose = document.querySelector('.close-modal');

const modal = document.getElementById('modal');

    btnOpen.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block'; 
        });
    });
    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});