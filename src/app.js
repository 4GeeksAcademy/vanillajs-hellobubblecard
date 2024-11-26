/* eslint-disable */
// Genera una carta aleatoria
function getRandomCard() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

// Genera un número de cartas aleatorias
function generateCards(count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(getRandomCard());
  }
  return cards;
}

// Renderiza las cartas en pantalla con colores para los trajes rojos y diseño actualizado
function renderCards(cards, container) {
  container.innerHTML = "";
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // Establece el color rojo para ♥ y ♦
    if (card.suit === "♥" || card.suit === "♦") {
      cardDiv.style.color = "red";
    } else {
      cardDiv.style.color = "black";
    }

    // Texto principal de la carta (valor)
    const valueText = document.createElement("span");
    valueText.textContent = card.value;

    // Agrega el símbolo del palo en la esquina superior izquierda
    const suitTopLeft = document.createElement("div");
    suitTopLeft.classList.add("suit-top-left");
    suitTopLeft.textContent = card.suit;

    // Agrega el símbolo del palo en la esquina inferior derecha
    const suitBottomRight = document.createElement("div");
    suitBottomRight.classList.add("suit-bottom-right");
    suitBottomRight.textContent = card.suit;

    // Agrega los elementos al contenedor de la carta
    cardDiv.appendChild(suitTopLeft);
    cardDiv.appendChild(valueText);
    cardDiv.appendChild(suitBottomRight);

    container.appendChild(cardDiv);
  });
}

// Algoritmo de ordenamiento de burbuja como constante
const bubbleSort = cards => {
  const log = [];
  let swapped;
  const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  };

  do {
    swapped = false;
    for (let i = 0; i < cards.length - 1; i++) {
      if (cardValues[cards[i].value] > cardValues[cards[i + 1].value]) {
        [cards[i], cards[i + 1]] = [cards[i + 1], cards[i]];
        swapped = true;
        log.push([...cards]); // Guarda el estado actual
      }
    }
  } while (swapped);

  return log;
};

// Renderiza el registro de la burbuja
function renderBubbleLog(log, container) {
  container.innerHTML = "";
  log.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("card-container");
    const stepLabel = document.createElement("p");
    stepLabel.textContent = `${index}: `;
    container.appendChild(stepLabel);
    renderCards(step, stepDiv);
    container.appendChild(stepDiv);
  });
}

// Event listeners
document.getElementById("drawBtn").addEventListener("click", () => {
  const cardCount = parseInt(document.getElementById("cardCount").value) || 6;
  const cards = generateCards(cardCount);
  renderCards(cards, document.getElementById("originalCards"));
  window.cards = cards; // Guarda las cartas en una variable global
});

document.getElementById("sortBtn").addEventListener("click", () => {
  if (window.cards) {
    const log = bubbleSort(window.cards);
    renderBubbleLog(log, document.getElementById("bubbleLog"));
  }
});
