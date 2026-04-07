import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "cumple-50-e24ab.firebaseapp.com",
    projectId: "cumple-50-e24ab",
    storageBucket: "cumple-50-e24ab.firebasestorage.app",
    messagingSenderId: "685516815788",
    appId: "1:685516815788:web:babbf02169de0f3f8fce09",
    measurementId: "G-83HJX5TTWK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cargarLista = async () => {
    const contenedor = document.getElementById('tabla-invitados');
    
    try {
        const querySnapshot = await getDocs(collection(db, "invitados"));
        
        if (querySnapshot.empty) {
            contenedor.innerHTML = "<p>Aún no hay nadie anotado.</p>";
            return;
        }

        let html = `
            <table class="tabla-simple">
                <thead>
                    <tr>
                        <th style="width: 50px;">#</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th style="text-align: center;">¿Viene?</th>
                    </tr>
                </thead>
                <tbody>
        `;

        querySnapshot.docs.forEach((doc, index) => {
            const d = doc.data();
            const iconoAsiste = d.asiste === 'si' ? '✅' : '❌';
            
            html += `
                <tr>
                    <td style="color: var(--neon-pink); font-weight: bold; text-align: center;">${index + 1}</td>
                    <td style="text-transform: uppercase;">${d.nombre}</td>
                    <td style="font-family: monospace;">${d.id}</td>
                    <td class="status-icon">${iconoAsiste}</td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        contenedor.innerHTML = html;

    } catch (error) {
        console.error("Error:", error);
        contenedor.innerHTML = "<p>Error al cargar los datos.</p>";
    }
};
cargarLista();