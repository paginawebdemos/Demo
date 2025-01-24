import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Nueva configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBl_hQ0ThEXecRb8nNcA9tubxX3Dj6PAe0",
    authDomain: "tecnolandia-7c8da.firebaseapp.com",
    projectId: "tecnolandia-7c8da",
    storageBucket: "tecnolandia-7c8da.firebasestorage.app",
    messagingSenderId: "135539004176",
    appId: "1:135539004176:web:082d9979fbac5433afcb95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuSection = document.getElementById("menu");
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];  // Aquí guardamos el botón de cerrar
const searchBox = document.getElementById("search");
const categoryFilterSelect = document.getElementById("category-filter-select");

let menuItems = [];  // Array para guardar los platos

// Cargar platos desde Firestore
async function loadMenu() {
    const querySnapshot = await getDocs(collection(db, "menu"));
    menuItems = [];
    querySnapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() });
    });
    renderMenu(menuItems);
}

function renderMenu(items) {
    menuSection.innerHTML = "";  // Limpiar la sección del menú

    items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Precio: <strong>${item.price}</strong></p>
            <button onclick="goToOrderPage('${item.id}')">Pedir</button>
            <button onclick="showDescription('${item.id}')">Leer más</button>
        `;
        menuSection.appendChild(menuItem);
    });

    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = "none";
}

window.goToOrderPage = function(id) {
    const selectedItem = menuItems.find(item => item.id === id);
    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    window.location.href = "order.html";  // Redirigir a la página de pedidos
};

window.showDescription = function(id) {
    const item = menuItems.find(i => i.id === id);
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.description;
    modalImg.src = item.img;
    document.getElementById("orderButton").onclick = () => goToOrderPage(id);
    modal.style.display = "block";
};

window.showDescription = function(id, event) {
    const item = menuItems.find(i => i.id === id);
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.description;
    modalImg.src = item.img;
    document.getElementById("orderButton").onclick = () => goToOrderPage(id);

    // Obtener la posición del clic
    const clickY = event.clientY;
    const clickX = event.clientX;

    // Posicionar el modal
    const modalContent = modal.querySelector(".modal-content");
    modal.style.display = "block";

    const modalHeight = modalContent.offsetHeight;
    const modalWidth = modalContent.offsetWidth;

    const top = Math.min(
        window.innerHeight - modalHeight,
        Math.max(0, clickY - modalHeight / 2)
    );
    const left = Math.min(
        window.innerWidth - modalWidth,
        Math.max(0, clickX - modalWidth / 2)
    );

    modalContent.style.top = `${top}px`;
    modalContent.style.left = `${left}px`;
    modalContent.style.position = "absolute";
};

// Cerrar el modal cuando se haga clic en la "X"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none"; // Ocultar el modal
});


// Filtrar y buscar platos
function filterMenu() {
    const searchQuery = searchBox.value.toLowerCase();  
    const selectedCategory = categoryFilterSelect.value;  

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);  
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;  
        return matchesSearch && matchesCategory;
    });

    renderMenu(filteredItems);  
}

searchBox.addEventListener("input", filterMenu);   
categoryFilterSelect.addEventListener("change", filterMenu);   

loadMenu();  // Cargar los platos iniciales
