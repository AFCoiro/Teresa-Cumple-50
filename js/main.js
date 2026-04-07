/*FIREBASE IMPORT*/
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB1SIno7bMdt696ZSy4kXGOmpI4yxXhKYs",
    authDomain: "cumple-50-e24ab.firebaseapp.com",
    projectId: "cumple-50-e24ab",
    storageBucket: "cumple-50-e24ab.firebasestorage.app",
    messagingSenderId: "685516815788",
    appId: "1:685516815788:web:babbf02169de0f3f8fce09",
    measurementId: "G-83HJX5TTWK"
  };


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
const modal = document.getElementById('modal');
const btnOpen = document.querySelectorAll('.btn-open-modal');
const modalContent = document.getElementById('modal-content');


btnOpen.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.showModal(); 
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-back')) {
        modalFinal.style.display = 'none';
        modalContent.style.display = 'block';
    }
    const dialogDimensions = modal.getBoundingClientRect();

    const clickAfuera = (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    );

    const clickEnBotonCerrar = e.target.classList.contains('close-modal');

    if (clickAfuera || clickEnBotonCerrar) {
        modal.close();
        document.body.style.overflow = '';
    }
});

modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
});

/* --- LÓGICA DE ASISTENCIA --- */
const modalFinal = document.getElementById('modal-final');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const EnviarAsistencia = async () => {
    const nombreInput = document.getElementById('nombre');
    const dniInput = document.getElementById('dni');
    const asistencia = document.querySelector('input[name="asistencia"]:checked');

    const btnSubmit = document.querySelector('.btn-submit');
    const spinner = document.getElementById('spinner');

    if (!asistencia) {
        alert("Por favor, selecciona una opción");
        return;
    }

    const datosInvitados = {
        nombre: nombreInput.value,
        id: dniInput.value,
        asiste: asistencia.value,
        fechaRegistro: new Date().toISOString()
    };

    btnSubmit.classList.add('hidden');
    spinner.style.display = 'block';

    try {
        await setDoc(doc(db, "invitados", datosInvitados.id), datosInvitados);
        console.log(`Se guardó en firebase a: ${datosInvitados.nombre}`);

        const pGracias = modalFinal.querySelector('p'); 
        pGracias.innerText = `Gracias por confirmar, ${datosInvitados.nombre}.`;

        modalContent.style.display = 'none';
        modalFinal.style.display = 'block';

    } catch(er) {
        console.error(`Error al confirmar: ${er}`);
        alert("Hubo un error al guardar. Reintentá.");

        btnSubmit.classList.remove('hidden');
        spinner.style.display = 'none';
    } finally {
        spinner.style.display = 'none';
        btnSubmit.classList.remove('hidden');
    }
}





const formulario = document.getElementById('form-modal');

formulario.addEventListener('submit', async (e)=>{
    e.preventDefault();
    await EnviarAsistencia();
})

