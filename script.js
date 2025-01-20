const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");
const chatBtn = document.getElementById("chat-btn");

const welcomeMessage = "¡Bienvenido a Tecnoinnovación! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?";
const optionsMessage = "Por favor, elige una opción:";

const mainOptions = [
    "Horarios de atención",
    "Ubicación",
    "Atención al cliente",
    "Reseñas",
    "Asesoramiento personalizado"
];

function addMessage(content, sender = "bot", scrollToBottom = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = content;
    chatBox.appendChild(messageDiv);

    if (scrollToBottom) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function showMainOptions() {
    addMessage(optionsMessage, "bot", false);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    mainOptions.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-button");
        optionButton.innerText = option;
        optionButton.onclick = function() {
            processOption(option);
        };
        optionsContainer.appendChild(optionButton);
    });

    chatBox.appendChild(optionsContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processOption(option) {
    addMessage(`Cliente: He seleccionado la opción: "${option}"`, "user");

    let response = '';
    switch (option) {
        case "Horarios de atención":
            response = "Nuestro horario de atención es de lunes a viernes de 9:00 am a 6:00 pm. ¡Te esperamos!";
            break;
        case "Ubicación":
            response = "Nos encontramos en la Calle Innovación, Edificio Tecnoinnovación, Ciudad, Estado, País.";
            break;
        case "Atención al cliente":
            response = "Si tienes alguna duda, contáctanos al número <strong>+123 456 789</strong> o vía WhatsApp en nuestra página web.";
            break;
        case "Reseñas":
            response = "Esto dicen nuestros clientes:<br><strong>Juan Pérez</strong>: \"Los mejores gadgets que he comprado!\"<br><strong>María López</strong>: \"Excelente atención y productos innovadores.\"";
            break;
        default:
            response = "Opción no válida, por favor selecciona una opción del menú.";
    }

    addMessage(response, "bot");
    askIfWantMore();
}

function askIfWantMore() {
    addMessage("¿Deseas saber algo más? Si es así, responde solo 'Si'.", "bot", true);
}

function processUserResponse(response) {
    // Verifica si la respuesta es "gracias" y no cierra el chat
    if (response.toLowerCase() === "si") {
        showMainOptions();
    } else if (response.toLowerCase() === "gracias") {
        addMessage("¡De nada! Si necesitas algo más, no dudes en preguntar.", "bot");
        askIfWantMore(); // Mantén la conversación abierta después de "gracias"
    } else {
        addMessage("¡Gracias por visitarnos! Te esperamos pronto en Tecnoinnovación.", "bot");
        toggleChat();
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
        addMessage(message, "user");
        userInput.value = "";
        processUserResponse(message);
    }
}

function toggleChat() {
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex";  // Muestra el chat
        chatBtn.style.display = "none";  // Oculta el botón flotante
    } else {
        chatContainer.style.display = "none";  // Oculta el chat
        chatBtn.style.display = "block";  // Muestra el botón flotante
    }
}

document.addEventListener("DOMContentLoaded", () => {
    addMessage(welcomeMessage, "bot", false);
    showMainOptions();
});

document.getElementById("send-btn").onclick = sendMessage;
