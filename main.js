// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
// const count = 4;
function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i < count + 1; i++) {
        arr.push(i, i);
    }
    return arr;

}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

let count;

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.


class Card {
  constructor(container, cardNumber) {
    this._container = container;
    this._cardNumber = cardNumber;
    this._open = false;
    this._success = false;
    let temp = Math.floor(Math.random()*100);
    this.id =  temp;
    this._createElement()
  }
  get cardNumber() {
    return this._cardNumber;
  }
  set cardNumber(value) {
    if (typeof value === 'number' && value >=0) {
        this._cardNumber = value;
        this._updateCard();
    }
  }
  set open(value) {
    if (this._success) return;
    if (typeof value === 'boolean') {
        this._open = value;
        this._updateCardDisplay();
    }
  }
  get open() {
    return this._open;
  }
  set success(value) {
    if (typeof value === "boolean") {
        this._success = value;
        this._updateCardSuccess();
    }
  }
  get success() {
    return this._success;
  }
  _createElement(){
    this._cardElement = document.createElement('button');
    this._cardElement.classList.add( "btn-start", "button");
    this._cardElement.setAttribute('id', this.id);
    this._cardElement.innerHTML = this._open ? this._cardNumber : '';
    this._cardElement.addEventListener ('click', () => {
        this._onCardClick()
    })
    document.getElementById(this._container).append(this._cardElement);
  }
  _updateCard() {
    this._cardElement.textContent = this._open ? this._cardNumber : ''; // Обновляем текст карточки
    }
  _updateCardDisplay() {
    if (this._open) {
        this._cardElement.classList.add('flipped'); // Добавляем класс для переворота
        this._cardElement.textContent = this._cardNumber; // Отображаем номер
    } else {
        this._cardElement.classList.remove('flipped'); // Убираем класс переворота
        this._cardElement.textContent = ''; // Скрываем номер
    }
  }
  _updateCardSuccess() {
    this._cardElement.classList.add('success'); // Добавляем класс успеха
    this._cardElement.textContent = this._cardNumber; // Отображаем номер
    this._cardElement.style.pointerEvents = 'none'; // Запрещаем клики по карточке
  }
    // Метод для обработки клика по карточке
  _onCardClick() {
    this._open = true; // Открываем карточку
    this._cardElement.innerHTML = this._open ? this._cardNumber : '';
    this._updateCardDisplay();
  }
}

class CardAmazing extends Card {
  constructor(container, cardNumber) {
    super(container);
    this.cardNumber = cardNumber;
  }

  get cardNumber() {
    return this._cardNumber;
  }
  set cardNumber(value) {
    if (typeof value === 'number' && value >=0) {
      const cardsImgArray = [
        "./img/1.svg",
        "./img/2.svg",
        "./img/3.svg",
        "./img/4.svg",
        "./img/5.svg",
        "./img/6.svg",
        "./img/7.svg",
        "./img/8.svg",
      ]
      this._cardNumber = cardsImgArray[value];
      this._updateCard();
    }
  }

  _createElement() {
    this._cardElement = document.createElement('button');
    this._cardElement.classList.add( "btn-start", "button");
    this._cardElement.setAttribute('id', this.id);
    this._cardElement.addEventListener ('click', () => {
      this._onCardClick()
  })
    document.getElementById(this._container).append(this._cardElement);
  }
  _updateCard() {
    if (this._open) {
      console.log(this._cardNumber)
      this._cardElement.style.backgroundImage = `url(${this._cardNumber})`;
      this._cardElement.textContent = "";
    } else {
      this._cardElement.style.backgroundImage = "none";
      this._cardElement.textContent = "";
    }
  }

  _updateCardDisplay() {
    if (this._open) {
      this._cardElement.classList.add('flipped'); // Добавляем класс для переворота
      this._cardElement.style.backgroundImage = `url(${this._cardNumber})`; // Отображаем картинку
  } else {
      this._cardElement.classList.remove('flipped'); // Убираем класс переворота
      this._cardElement.textContent = '';
      this._cardElement.style.backgroundImage = "none"; // Скрываем картинку
    }
  }

  _onCardClick() {
    this._open = true; // Открываем карточку
    if (this._open) {
      console.log(this._cardNumber)
      this._cardElement.style.backgroundImage = `url(${this._cardNumber})`;
      this._cardElement.textContent = "";
    } else {
      this._cardElement.style.backgroundImage = "none";
      this._cardElement.textContent = "";
    }
    this._updateCardDisplay();
  }

  _updateCardSuccess() {
    this._cardElement.classList.add('success'); // Добавляем класс успеха
    this._cardElement.style.pointerEvents = 'none'; // Запрещаем клики по карточке
  }
}


function startGame() {
  StartedWindow();
}

function Timer() {
  const div = document.createElement('div');
  document.body.append(div);
  div.classList.add('contTimer')
  div.textContent = 'Before staring the game again:'
  const span = document.createElement('span');
  span.setAttribute('id', 'timer');
  span.classList.add('timer');
  span.textContent = '60';
  div.append(span);
  let timer = document.getElementById('timer');
  let seconds = timer.innerHTML;

  function countdown() {
      --seconds;
      timer.innerHTML = seconds;
      if (seconds == 0) {

          document.location.reload();
      }
  }
  setInterval(countdown,1000);
}

function StartedWindow(){
  const div = document.createElement('div');
  div.classList.add('containerStart');
  div.setAttribute('id','containerStart');
  const startPrewiew = document.createElement('div');
  const prewiew = document.createElement('p');
  prewiew.classList.add('prewiew')
  prewiew.textContent ="Choose: you want to play with numbers or with pictures?";
  const btnPictures = document.createElement("button");
  btnPictures.textContent = 'Pictures';
  const btnNumbers = document.createElement("button");
  btnNumbers.textContent = "Numbers";
  btnNumbers.classList.add('btn-choice');
  btnPictures.classList.add("btn-choice")
  startPrewiew.append(prewiew, btnNumbers, btnPictures);
  div.append(startPrewiew);
  document.body.append(div);
  function createStartForm(maxCount, type) {
    const p = document.createElement('p');
    p.classList.add('start-descr');
    p.textContent = `Select the number of cards vertically/horizontally (the number must be a multiple of 2, max: ${maxCount}): `;
    const button = document.createElement('button');
    button.classList.add('start-but');
    button.setAttribute('type', 'submit');
    button.textContent = 'Start the game';

    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    form.setAttribute('onsubmit',"event.preventDefault();");
    input.classList.add('input');
    input.setAttribute('type','number');
    input.setAttribute('id','number');
    input.setAttribute('max', maxCount);
    input.setAttribute('min', '2');
    div.append(p);
    div.append(form);
    form.append(label);
    label.append(input);
    form.append(button);

    form.addEventListener('submit', function createGame() {
      const num = Number(input.value);
      if (((num % 2) != 1) & (num !=0)) {
          if (num == 2) {
              count = 2;
          } else if (num == 4) {
              count = 8;
          } else if (num == 6) {
              count = 18;
          } else if (num == 8) {
              count = 32;
          } else if (num == 10) {
              count = 50;
          }
        }
        else {
          count = 8;
        }
      const startedContainer = document.getElementById('containerStart');
      startedContainer.classList.add('none');
      const arrNew = shuffle(createNumbersArray(count));
      let cards = [];

      const createCarts = (count) => {
        const div = document.createElement('div');
        div.setAttribute('id', 'div')
        document.body.append(div);
        div.classList.add('container');
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        gameContainer.setAttribute('id' , "gameContainer")
        div.append(gameContainer)
        if (count == 2) {
            gameContainer.classList.add('for2cards');
        } else if (count == 8) {
          gameContainer.classList.add('for8cards');
        } else if (count == 18) {
          gameContainer.classList.add('for18cards');
        } else if (count == 32) {
          gameContainer.classList.add('for32cards');
        } else if (count == 50) {
          gameContainer.classList.add('for50cards');
        };
        let NumArr = [];
        let countNum = 0;
        let index = 0;

        for (let i = 0; i < count * 2; i++) {
          const card = new type("gameContainer", arrNew[i]);
          cards.push(card);
          card._cardElement.addEventListener('click', function () {
            NumArr.push(card);
            index++;
            card.open = true;
            card._cardElement.classList.remove('btn-start');
            card._cardElement.classList.add('btn-active');
            const elem1 = NumArr[0];
            const elem2 = NumArr[1];
            card._cardElement.style.pointerEvents = "none"

            if (index == 2) {
              if (elem1.cardNumber === elem2.cardNumber) {
                countNum += 2;
                elem1._cardElement.classList.add('btn-done');
                elem2._cardElement.classList.add('btn-done');
                elem1.success = true;
                elem2.success = true;
              } else {
                setTimeout(() => {
                    elem1._cardElement.classList.remove('btn-active');
                    elem2._cardElement.classList.remove('btn-active');
                    elem1._cardElement.classList.add('btn-start');
                    elem2._cardElement.classList.add('btn-start');
                    elem1.open = false;
                    elem2.open = false;
                    elem1._cardElement.style.pointerEvents = "auto";
                    elem2._cardElement.style.pointerEvents = "auto";
                }, 1000);
              }
              index = 0;
              NumArr=[];

                // Проверка на окончание игры

              if (countNum == count * 2) {
                const finalWindow = document.createElement('div');
                document.body.append(finalWindow);
                finalWindow.classList.add('finalWindow');
                const p = document.createElement('p');
                p.textContent = "You win! Do you want to restart the game?";
                finalWindow.append(p)
                const buttonRestart = document.createElement('button');
                buttonRestart.classList.add("btn-restart");
                buttonRestart.textContent = 'Restart';
                buttonRestart.onclick = function () {
                    location.reload();
                };
                finalWindow.append(buttonRestart);
              }
            }
          });
        }
      }
      createCarts(count);
    }
    )
  }
  btnNumbers.addEventListener('click', () => {
    createStartForm(10, Card);
    startPrewiew.style.display = "none";
  });

  btnPictures.addEventListener("click", () => {
    createStartForm(6, CardAmazing);
    startPrewiew.style.display = "none";
  })

  // Timer();
};

