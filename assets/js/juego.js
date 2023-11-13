const juego = (() => {
  "use strict";
  /**
   * Archivo que contiene la lógica del juego de BlackJack.
   * @file
   * @summary Contiene la lógica del juego de BlackJack.
   * @description Este archivo contiene la lógica del juego de BlackJack, incluyendo la creación de la baraja, la mezcla de las cartas, la adición de cartas a la mano del jugador y del ordenador, la suma de los valores de las cartas, y la finalización del juego.
   * @requires module:DOM
   * @requires module:shuffleDeck
   * @requires module:sumCards
   * @requires module:resetGame
   * @requires module:createDeck
   * @requires module:askCard
   * @requires module:stopGame
   */
  const userCards = document.querySelector(".user__cards");
  const computerCars = document.querySelector(".computer__cards");
  const newPlay = document.querySelector(".buttons__button--newGame");
  const ask = document.querySelector(".buttons__button--askCard");
  const stop = document.querySelector(".buttons__button--stop");
  const scoreuser = document.querySelector(".score__user");
  const scorecomputer = document.querySelector(".score__computer");
  const deck = [];
  const suits = ["P", "C", "D", "T"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  ask.style.display = "none";
  stop.style.display = "none";

  let scoreUser = 0,
    scoreComputer = 0;

  let player = "user";

  newPlay.addEventListener("click", () => {
    resetGame();
    createDeck();
    newPlay.style.display = "none";
    ask.style.display = "block";
    stop.style.display = "block";
  });

  // ask.addEventListener("click", askCard(player));
  ask.addEventListener("click", () => askCard("user"));
  stop.addEventListener("click", () => askCard("computer"));

  /**Función para reinicilizar el juego */
  function resetGame() {
    userCards.innerHTML = "";
    computerCars.innerHTML = "";
    scoreuser.innerHTML = "";
    scorecomputer.innerHTML = "";
    scoreUser = 0;
    scoreComputer = 0;
  }

  /**
   * Crea una baraja de cartas españolas barajada de forma aleatoria.
   * @returns {Array} - Baraja de cartas españolas barajada.
   */
  function createDeck() {
    for (const suit of suits) {
      for (const value of values) {
        deck.push(value + suit);
      }
    }
    return shuffleDeck(deck);
  }

  /**Crear una función para ordenar aleatoriamente el arreglo de cartas */
  function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  /**Crear una función para pedir una carta y la agrega a la página */
  function askCard(player) {
    let card = deck.pop();
    if (player === "user") {
      scoreUser += sumCards(card);
      userCards.innerHTML += `<img src="./assets/img/${card}.png" alt="${card}" class="card">`;
      scoreuser.innerHTML = scoreUser;
      scoreUser > 21
        ? ((scoreuser.innerHTML = "Perdiste"),
          (scorecomputer.innerHTML = "Ganaste"),
          (newPlay.style.display = "block"),
          (ask.style.display = "none"),
          (stop.style.display = "none"))
        : scoreUser === 21
        ? ((scoreuser.innerHTML = "Ganaste"),
          (scorecomputer.innerHTML = "Perdiste"),
          (newPlay.style.display = "block"),
          (ask.style.display = "none"),
          (stop.style.display = "none"))
        : null;
    } else if (player === "computer") {
      scoreComputer += sumCards(card);
      computerCars.innerHTML += `<img src="./assets/img/${card}.png" alt="${card}" class="card">`; // Agregar la carta a la mano del ordenador en la página
      scorecomputer.innerHTML = scoreComputer;
      while (scoreComputer <= 17) {
        card = deck.pop();
        scoreComputer += sumCards(card);
        computerCars.innerHTML += `<img src="./assets/img/${card}.png" alt="${card}" class="card">`; // Agregar la carta a la mano del ordenador en la página
        scorecomputer.innerHTML = scoreComputer;
      }
      if (scoreComputer > 21) {
        scorecomputer.innerHTML = "Perdiste";
        scoreuser.innerHTML = "Ganaste";
        newPlay.style.display = "block";
        ask.style.display = "none";
        stop.style.display = "none";
      } else if (scoreComputer === 21) {
        scorecomputer.innerHTML = "Ganaste";
        scoreuser.innerHTML = "Perdiste";
        newPlay.style.display = "block";
        ask.style.display = "none";
        stop.style.display = "none";
      } else if (scoreComputer > scoreUser) {
        scorecomputer.innerHTML = "Ganaste";
        scoreuser.innerHTML = "Perdiste";
        newPlay.style.display = "block";
        ask.style.display = "none";
        stop.style.display = "none";
      } else if (scoreComputer < scoreUser) {
        scorecomputer.innerHTML = "Perdiste";
        scoreuser.innerHTML = "Ganaste";
        newPlay.style.display = "block";
        ask.style.display = "none";
        stop.style.display = "none";
      } else if (scoreComputer === scoreUser) {
        scorecomputer.innerHTML = "Empate";
        scoreuser.innerHTML = "Empate";
        newPlay.style.display = "block";
        ask.style.display = "none";
        stop.style.display = "none";
      }
    }
    return card;
  }

  /**Crear una función para sumar el valor de las cartas */
  function sumCards(card) {
    let value = card.substring(0, card.length - 1);
    let sum =
      value === "A"
        ? 11
        : value === "J" || value === "Q" || value === "K"
        ? 10
        : parseInt(value);
    return sum;
  }

  /**Crear una función para detener el juego */
  function stopGame() {
    let card = deck.pop();
    countComputer += sumCards(card);
    return card;
  }

  return {
    resetGame,
    createDeck,
    askCard,
    sumCards,
    stopGame,
  };
})();
