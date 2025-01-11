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

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.


class Card {
  constructor(container, cardNumber) {
    this._container = container;
    this._cardNumber = cardNumber;
    this._open = false;
    this.success = false;
    this.cardElement = document.createElement('div');
    let temp = Math.floor(Math.random()*100);
    this.cardElement.id =  temp;
    this._createElement()
  }
  get cardNumber() {
    return this._cardNumber;
  }

  set cardNumber(value) {
    if (typeof value === 'number' || value >=0) {
        this._cardNumber = value;
        this._updateCard()
    }
  }

  set open(value) {
    if (this._success) return;
    if (typeof value === 'boolean') {
        this._open = value;
        this._updateCardDisplay();
        if (value) {
            this._onCardClick(this);
        }
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

    this.cardElement.className = 'card';
    this.cardElement.textContent = this._open ? this.cardNumber : '';
    this.cardElement.addEventListener ('click', () => {
        this._onCardClick()
    })
    this._container.appendChild(this.cardElement);
  }

  _updateCard() {
    this.cardElement.textContent = this._open ? this._cardNumber : ''; // Обновляем текст карточки
    }

  _updateCardDisplay() {
    if (this._open) {
        this.cardElement.classList.add('flipped'); // Добавляем класс для переворота
        this.cardElement.textContent = this._cardNumber; // Отображаем номер
    } else {
        this.cardElement.classList.remove('flipped'); // Убираем класс переворота
        this.cardElement.textContent = ''; // Скрываем номер
    }
  }

  _updateCardSuccess() {
    this.cardElement.classList.add('success'); // Добавляем класс успеха
    this.cardElement.textContent = this._cardNumber; // Отображаем номер
    this.cardElement.style.pointerEvents = 'none'; // Запрещаем клики по карточке
  }

    // Метод для обработки клика по карточке
  _onCardClick() {
    this.open = true; // Открываем карточку
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

  function countdown() {;
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
  div.setAttribute('id','containerStart')
  const p = document.createElement('p');
  p.classList.add('start-descr');
  p.textContent = 'Select the number of cards vertically/horizontally (the number must be a multiple of 2): ';
  const button = document.createElement('button');
  button.classList.add('start-but');
  button.setAttribute('type', 'submit');
  button.textContent = 'Start the game';
  document.body.append(div);
  const form = document.createElement('form');
  const label = document.createElement('label');
  const input = document.createElement('input');
  form.setAttribute('onsubmit',"event.preventDefault();");
  input.setAttribute('type','number');
  input.setAttribute('id','number');
  input.setAttribute('max', '10');
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

    const startedContainer = document.getElementById('containerStart');
    startedContainer.classList.add('none');
    const arrNew = shuffle(createNumbersArray(count));


    const createCarts = count => {
      const div = document.createElement('div');
      document.body.append(div);
      div.classList.add('container');
      if (count == 2) {
          div.classList.add('for2cards');
      } else if (count == 8) {
          div.classList.add('for8cards');
      } else if (count == 18) {
          div.classList.add('for18cards');
      } else if (count == 32) {
          div.classList.add('for32cards');
      } else if (count == 50) {
          div.classList.add('for50cards');
      };
      let NumArr = [];
      let countNum = 0;
      let index = 0;
      let idArr = [];

      for (let i = 0; i < count * 2; i++) {
        const card = new Card(div, arrNew[i]);
        card.cardElement.addEventListener('click', function () {
          if (card.open) return; // Игнорировать клик, если кнопку уже нажали
          NumArr.unshift(card.cardNumber);
          idArr.unshift(card.cardElement.id);
          index++;
          card.cardElement.classList.remove('btn-start');
          card.cardElement.classList.add('btn-active');
          card.cardElement.disabled = true; // Деактивируем кнопку

          const elem1 = document.getElementById(idArr[0]);
          const elem2 = document.getElementById(idArr[1]);

          if (index == 2) {
            if (NumArr[0] == NumArr[1]) {
              countNum += 2;
              elem1.classList.add('btn-done');
              elem2.classList.add('btn-done');
            } else {
              setTimeout(() => {
                  elem1.classList.remove('btn-active');
                  elem2.classList.remove('btn-active');
                  elem1.classList.add('btn-start');
                  elem2.classList.add('btn-start');
                  elem1.disabled = false;
                  elem2.disabled = false;
              }, 100);
            }
            idArr = [];
            index = 0;

              // Проверка на окончание игры

            if (countNum == count * 2) {
              const finalWindow = document.createElement('div');
              document.body.append(finalWindow);
              finalWindow.classList.add('finalWindow');
              finalWindow.textContent = "You win! Do you want to restart the game?";
              const buttonRestart = document.createElement('button');
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

  // Timer();
};

