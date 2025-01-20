const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");
  const chatBtn = document.getElementById("chat-btn");

  const welcomeMessage = "¡Bienvenido a Luna Mágica! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?";
  const optionsMessage = "Por favor, elige una opción:";

  const mainOptions = [
      "Horarios",
      "Menú",
      "Ubicación",
      "Reservaciones",
      "Contacto",
      "Reseñas",
      "Chef Principal"
  ];

  const menuOptions = [
      "Entradas",
      "Platos Fuertes",
      "Postres",
      "Bebidas"
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

  function showMenuOptions() {
      addMessage("Estos son los tipos de menús que ofrecemos. Por favor, selecciona una categoría.", "bot", false);

      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("options-container");

      menuOptions.forEach(menu => {
          const menuButton = document.createElement("button");
          menuButton.classList.add("option-button");
          menuButton.innerText = menu;
          menuButton.onclick = function() {
              processMenu(menu);
          };
          optionsContainer.appendChild(menuButton);
      });

      chatBox.appendChild(optionsContainer);
      addMessage("Selecciona una categoría para más detalles.", "bot", true);
  }

  function processOption(option) {
      addMessage(`Cliente: He seleccionado la opción: "${option}"`, "user");

      let response = '';
      switch (option) {
          case "Horarios":
              response = "Nuestro horario es de lunes a domingo de 12:00 pm a 11:00 pm. ¡Te esperamos!";
              break;
          case "Menú":
              showMenuOptions();
              return;
          case "Ubicación":
              response = "Estamos en la Avenida Central, Edificio Luna Mágica, Ciudad, Estado, Venezuela.";
              break;
          case "Reservaciones":
              response = "Para reservaciones, llámanos al <strong>+58 987 654 321</strong> o reserva a través de nuestra página web.";
              break;
          case "Contacto":
              response = "Contáctanos al número <strong>+58 987 654 321</strong> o en nuestras redes sociales @lunaMagicaRestaurante.";
              break;
          case "Reseñas":
              response = "Esto dicen nuestros clientes:<br><strong>Juan Pérez</strong>: \"La comida es espectacular y el ambiente mágico.\"<br><strong>María López</strong>: \"¡El mejor restaurante para una cena romántica!\"";
              break;
          case "Chef Principal":
              response = "Nuestro Chef Principal, <strong>Chef Gustavo Luna</strong>, es conocido por sus recetas únicas y creativas.";
              break;
          default:
              response = "Opción no válida, por favor selecciona una opción del menú.";
      }

      addMessage(response, "bot");
      askIfWantMore();
  }

  function processMenu(menu) {
      addMessage(`Cliente: He seleccionado el menú: "${menu}"`, "user");

      let response = '';
      switch (menu) {
          case "Entradas":
              response = "Entradas destacadas:<br>- Bruschettas al estilo Luna: $8<br>- Carpaccio de res: $12<br>- Crema de calabaza: $6";
              break;
          case "Platos Fuertes":
              response = "Platos fuertes:<br>- Filete Luna con salsa de hongos: $20<br>- Risotto de camarones: $18<br>- Costillas BBQ: $22";
              break;
          case "Postres":
              response = "Postres:<br>- Cheesecake de frutos rojos: $7<br>- Tiramisú: $6<br>- Helado artesanal: $5";
              break;
          case "Bebidas":
              response = "Bebidas:<br>- Cocteles exclusivos: $10<br>- Vinos de la casa: $15<br>- Jugos naturales: $4";
              break;
          default:
              response = "Opción de menú no válida.";
      }

      addMessage(response, "bot");
      askIfWantMore();
  }

  function askIfWantMore() {
      addMessage("¿Deseas saber algo más? Si es así, responde solo 'Si'.", "bot", true);
  }

  function processUserResponse(response) {
      if (response.toLowerCase() === "si") {
          showMainOptions();
      } else {
          addMessage("¡Gracias por visitarnos! Te esperamos pronto en Luna Mágica.", "bot");
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
