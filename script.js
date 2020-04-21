const main_menu_switch = document.getElementById("main-menu-switch-js"); // указатель на квадратик для обработчика клика для отображения меню
const main_menu_container = document.getElementById("main-menu-container-js"); // указатель на выдвижное меню

const cards_container = document.getElementById("cards-container-js"); // указатель на контейнер карточек
const default_class_card = "card"; // стандартный класс карточек
const default_class_img_card = "card-image";
const default_class_text = "card-text";
const default_class_container_img = "rotate-button";
const default_class_arrow = "rotate-button__img";
const default_class_main_card = "item";
const switch_trainin_play = document.querySelector(".switch-play-training__round"); // получили наш переключатель
const switch_trainin_play_text = document.querySelector(".switch-text");
const body_element = document.querySelector("body");
const container_star = document.querySelector(".container-star");


// объект индикатор игры
let object_train = {
  training_mode: false, // режим игры выключен изначально
  categoryes_page_mode: false, // изначально мы не на странице с категориями
  count_no: 0, // количество ложных кликов не по той самой карточке
  count_yes: 0, // количество удачных кликов по той самой карточке
  count_cards: 0, // количество удачных кликов по той самой карточке
  this_click: false, // текущий клик
  counts_button: 0, // количество кнопок
  this_word: false,  // текущее слово
  this_sound_play: false, // текущий трек
  reset_play() {
    this.count_no = 0; 
    this.count_yes = 0; 
    this.count_cards = 0; 
    this.this_click = false;
    this.this_word = false;
    this.this_sound_play = false;
  }
}



function add_cards(category) { // функция которая добавит карточки определённой категории


  // цикл по массиву объектов карточек
  array_objects_cards.forEach(element => {



    if (element.categories == category && category != "category-card") { // все карточки кроме главных
      object_train.categoryes_page_mode = true; // мы на странице с категориями



      let div_vrap_card = document.createElement("div"); // создали обёртку карточки
      div_vrap_card.classList.add("card_vrap-rotate"); // присвоили её класс

      let div_flipper_card = document.createElement("div"); // создали флиппер карточки
      div_flipper_card.classList.add("card_flipper-rotate"); // присвоили её класс


      // фронтальная часть карточки
      let card = document.createElement("figure"); // создали карточку
      card.classList.add(default_class_card, element.categories, "card-front") // присвоили ей 2 класса
      card.setAttribute("name", element.categories); // накинули атрибут name

      let img = document.createElement("img"); // создали картинку
      img.classList.add(default_class_img_card); // добавили картинке класс
      img.setAttribute("src", element.image); // дали ей путь
      card.append(img); // положили картинку в карточку

      let text = document.createElement("figcaption"); // создали figcaption Для текста
      text.classList.add(default_class_text, "card-text-angl"); // добавили ему класс
      text.innerText = element.word; // пооложили туда текст
      card.append(text); // положили текст в карточку

      let container_arrow = document.createElement("div"); // создали
      container_arrow.classList.add(default_class_container_img);


      let img_arrow = document.createElement('div'); // создаём стрелку
      img_arrow.classList.add('hand-drawn-arrow');


      container_arrow.appendChild(img_arrow); // положим её в её обёртку

      card.appendChild(container_arrow); // положим стрелку в карточку

      div_flipper_card.appendChild(card); // положили в флиппер карточку


      // задняя часть карточки
      card = document.createElement("figure"); // создали карточку
      card.classList.add(default_class_card, element.categories, "card-back") // присвоили ей 2 класса
      card.setAttribute("name", element.categories); // накинули атрибут name

      img = document.createElement("img"); // создали картинку
      img.classList.add(default_class_img_card); // добавили картинке класс
      img.setAttribute("src", element.image); // дали ей путь
      card.append(img); // положили картинку в карточку

      text = document.createElement("figcaption"); // создали figcaption Для текста
      text.classList.add(default_class_text); // добавили ему класс
      text.innerText = element.translation; // пооложили туда текст
      card.append(text); // положили текст в карточку

      container_arrow = document.createElement("div"); // создали
      container_arrow.classList.add(default_class_container_img);




      div_flipper_card.appendChild(card); // положили в флиппер карточку
      div_vrap_card.appendChild(div_flipper_card) // положили в контейнер флиппер


      cards_container.appendChild(div_vrap_card); // положили контейнер в контейнер, как ни странно
    }

  });

  toggle_button(object_train.categoryes_page_mode, object_train.training_mode); // первый аргумент true если мы на главной странице, второй аргумент если вых реж игр


}




function add_main_cards(category) { // функция которая добавит главные карточки



  array_objects_cards.forEach(element => {

    if (element.categories == category && category == "category-card") { // если карточка та самая и главная
      object_train.categoryes_page_mode = false; // мы не на странице с карточками категорий

      let card = document.createElement("figure"); // создали карточку
      card.classList.add(default_class_card, default_class_main_card, element.categories) // присвоили ей 2 класса
      card.setAttribute("name", element.name); // накинули атрибут name

      let card_fill = document.createElement("div"); // создали блок заливки
      card_fill.classList.add("main-card-text-fill-training"); // дали ему класс
      card.append(card_fill); // положили блок с заливкой в мою карточку

      let img = document.createElement("img"); // создали картинку
      img.classList.add(default_class_img_card); // добавили картинке класс
      img.setAttribute("src", element.image); // дали ей путь
      card.append(img); // положили картинку в карточку

      let text = document.createElement("figcaption"); // создали figcaption Для текста
      text.classList.add(default_class_text); // добавили ему класс
      text.innerText = element.word; // пооложили туда текст

      card.append(text); // положили текст в карточку

      let container_arrow = document.createElement("div"); // создали
      container_arrow.classList.add(default_class_container_img);

      cards_container.appendChild(card); // положим готовую карточку в контейнер карточек
    }

  });

}


// функция которая закрасит карточки в текущий режим, если режим игры то в 1 цвет, если тренеровка то в другой
function card_text_added_fill(flag) {

  let collection_fill_card_text_main = cards_container.querySelectorAll(".category-card div");
  let collection_card_text_main = cards_container.querySelectorAll(".category-card .card-text");

  if (flag) {
    collection_fill_card_text_main.forEach(element => {
      element.classList.add("main-card-text-fill-play");
    });

    collection_card_text_main.forEach(element => {
      element.classList.add("main-card-color-text-play");
    });
  } else {
    collection_fill_card_text_main.forEach(element => {
      element.classList.remove("main-card-text-fill-play");
    });

    collection_card_text_main.forEach(element => {
      element.classList.remove("main-card-color-text-play");
    });
  }
}













// функция которая удалит карточки
function delete_cards() {
  while (cards_container.firstChild) {
    cards_container.removeChild(cards_container.firstChild);
  }
}

// функция для воспроизведения аудио
function soundPlay(src) {
  let audio = new Audio(); // Создаём новый элемент Audio
  audio.src = src; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}


const array_objects_cards = [{
    categories: 'category-card',
    word: 'Action (set A)',
    image: 'images/cry.jpg',
    name: 'action-set-a',
  },
  {
    categories: 'category-card',
    word: 'Action (set B)',
    image: 'images/open.jpg',
    name: 'action-set-b',
  },
  {
    categories: 'category-card',
    word: 'Animal (set A)',
    image: 'images/cat.jpg',
    name: 'animal-set-a',
  },
  {
    categories: 'category-card',
    word: 'Animal (set B)',
    image: 'images/bird.jpg',
    name: 'animal-set-b',
  },
  {
    categories: 'category-card',
    word: 'Clothes',
    image: 'images/skirt.jpg',
    name: 'clothes',
  },
  {
    categories: 'category-card',
    word: 'Emotions',
    image: 'images/sad.jpg',
    name: 'emotions',
  },
  {
    categories: 'category-card',
    word: 'Study',
    image: 'images/book.jpg',
    name: 'study',
  },
  {
    categories: 'category-card',
    word: 'Equipment',
    image: 'images/elevator.jpg',
    name: 'equipment',
  },
  {
    categories: 'action-set-a',
    word: 'cry',
    translation: 'плакать',
    image: 'images/cry.jpg',
    audioSrc: 'audio/cry.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'dance',
    translation: 'танцевать',
    image: 'images/dance.jpg',
    audioSrc: 'audio/dance.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'dive',
    translation: 'нырять',
    image: 'images/dive.jpg',
    audioSrc: 'audio/dive.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'draw',
    translation: 'рисовать',
    image: 'images/draw.jpg',
    audioSrc: 'audio/draw.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'fish',
    translation: 'ловить рыбу',
    image: 'images/fish.jpg',
    audioSrc: 'audio/fish.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'fly',
    translation: 'летать',
    image: 'images/fly.jpg',
    audioSrc: 'audio/fly.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'hug',
    translation: 'обнимать',
    image: 'images/hug.jpg',
    audioSrc: 'audio/hug.mp3'
  },
  {
    categories: 'action-set-a',
    word: 'jump',
    translation: 'прыгать',
    image: 'images/jump.jpg',
    audioSrc: 'audio/jump.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'open',
    translation: 'открывать',
    image: 'images/open.jpg',
    audioSrc: 'audio/open.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'play',
    translation: 'играть',
    image: 'images/play.jpg',
    audioSrc: 'audio/play.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'point',
    translation: 'указывать',
    image: 'images/point.jpg',
    audioSrc: 'audio/point.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'ride',
    translation: 'ездить',
    image: 'images/ride.jpg',
    audioSrc: 'audio/ride.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'run',
    translation: 'бегать',
    image: 'images/run.jpg',
    audioSrc: 'audio/run.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'sing',
    translation: 'петь',
    image: 'images/sing.jpg',
    audioSrc: 'audio/sing.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'skip',
    translation: 'пропускать, прыгать',
    image: 'images/skip.jpg',
    audioSrc: 'audio/skip.mp3'
  },
  {
    categories: 'action-set-b',
    word: 'swim',
    translation: 'плавать',
    image: 'images/swim.jpg',
    audioSrc: 'audio/swim.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'cat',
    translation: 'кот',
    image: 'images/cat.jpg',
    audioSrc: 'audio/cat.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'chick',
    translation: 'цыплёнок',
    image: 'images/chick.jpg',
    audioSrc: 'audio/chick.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'chicken',
    translation: 'курица',
    image: 'images/chicken.jpg',
    audioSrc: 'audio/chicken.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'dog',
    translation: 'собака',
    image: 'images/dog.jpg',
    audioSrc: 'audio/dog.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'horse',
    translation: 'лошадь',
    image: 'images/horse.jpg',
    audioSrc: 'audio/horse.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'pig',
    translation: 'свинья',
    image: 'images/pig.jpg',
    audioSrc: 'audio/pig.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'rabbit',
    translation: 'кролик',
    image: 'images/rabbit.jpg',
    audioSrc: 'audio/rabbit.mp3'
  },
  {
    categories: 'animal-set-a',
    word: 'sheep',
    translation: 'овца',
    image: 'images/sheep.jpg',
    audioSrc: 'audio/sheep.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'bird',
    translation: 'птица',
    image: 'images/bird.jpg',
    audioSrc: 'audio/bird.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'fish',
    translation: 'рыба',
    image: 'images/fish1.jpg',
    audioSrc: 'audio/fish.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'frog',
    translation: 'жаба',
    image: 'images/frog.jpg',
    audioSrc: 'audio/frog.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'giraffe',
    translation: 'жирафа',
    image: 'images/giraffe.jpg',
    audioSrc: 'audio/giraffe.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'lion',
    translation: 'лев',
    image: 'images/lion.jpg',
    audioSrc: 'audio/lion.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'mouse',
    translation: 'мышь',
    image: 'images/mouse.jpg',
    audioSrc: 'audio/mouse.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'turtle',
    translation: 'черепаха',
    image: 'images/turtle.jpg',
    audioSrc: 'audio/turtle.mp3'
  },
  {
    categories: 'animal-set-b',
    word: 'dolphin',
    translation: 'дельфин',
    image: 'images/dolphin.jpg',
    audioSrc: 'audio/dolphin.mp3'
  },
  {
    categories: 'clothes',
    word: 'skirt',
    translation: 'юбка',
    image: 'images/skirt.jpg',
    audioSrc: 'audio/skirt.mp3'
  },
  {
    categories: 'clothes',
    word: 'pants',
    translation: 'брюки',
    image: 'images/pants.jpg',
    audioSrc: 'audio/pants.mp3'
  },
  {
    categories: 'clothes',
    word: 'blouse',
    translation: 'блузка',
    image: 'images/blouse.jpg',
    audioSrc: 'audio/blouse.mp3'
  },
  {
    categories: 'clothes',
    word: 'dress',
    translation: 'платье',
    image: 'images/dress.jpg',
    audioSrc: 'audio/dress.mp3'
  },
  {
    categories: 'clothes',
    word: 'boot',
    translation: 'ботинок',
    image: 'images/boot.jpg',
    audioSrc: 'audio/boot.mp3'
  },
  {
    categories: 'clothes',
    word: 'shirt',
    translation: 'рубашка',
    image: 'images/shirt.jpg',
    audioSrc: 'audio/shirt.mp3'
  },
  {
    categories: 'clothes',
    word: 'coat',
    translation: 'пальто',
    image: 'images/coat.jpg',
    audioSrc: 'audio/coat.mp3'
  },
  {
    categories: 'clothes',
    word: 'shoe',
    translation: 'туфли',
    image: 'images/shoe.jpg',
    audioSrc: 'audio/shoe.mp3'
  },
  {
    categories: 'emotions',
    word: 'sad',
    translation: 'грустный',
    image: 'images/sad.jpg',
    audioSrc: 'audio/sad.mp3'
  },
  {
    categories: 'emotions',
    word: 'angry',
    translation: 'сердитый',
    image: 'images/angry.jpg',
    audioSrc: 'audio/angry.mp3'
  },
  {
    categories: 'emotions',
    word: 'happy',
    translation: 'счастливый',
    image: 'images/happy.jpg',
    audioSrc: 'audio/happy.mp3'
  },
  {
    categories: 'emotions',
    word: 'tired',
    translation: 'уставший',
    image: 'images/tired.jpg',
    audioSrc: 'audio/tired.mp3'
  },
  {
    categories: 'emotions',
    word: 'surprised',
    translation: 'удивлённый',
    image: 'images/surprised.jpg',
    audioSrc: 'audio/surprised.mp3'
  },
  {
    categories: 'emotions',
    word: 'scared',
    translation: 'испуганный',
    image: 'images/scared.jpg',
    audioSrc: 'audio/scared.mp3'
  },
  {
    categories: 'emotions',
    word: 'smile',
    translation: 'улыбка',
    image: 'images/smile.jpg',
    audioSrc: 'audio/smile.mp3'
  },
  {
    categories: 'emotions',
    word: 'laugh',
    translation: 'смех',
    image: 'images/laugh.jpg',
    audioSrc: 'audio/laugh.mp3'
  },
  {
    categories: 'study',
    word: 'book',
    translation: 'книга',
    image: 'images/book.jpg',
    audioSrc: 'audio/book.mp3'
  },
  {
    categories: 'study',
    word: 'pencil',
    translation: 'карандаш',
    image: 'images/pencil.jpg',
    audioSrc: 'audio/pencil.mp3'
  },
  {
    categories: 'study',
    word: 'pen',
    translation: 'ручка',
    image: 'images/pen.jpg',
    audioSrc: 'audio/pen.mp3'
  },
  {
    categories: 'study',
    word: 'school',
    translation: 'школа',
    image: 'images/school.jpg',
    audioSrc: 'audio/school.mp3'
  },
  {
    categories: 'study',
    word: 'diary',
    translation: 'дневник',
    image: 'images/diary.jpg',
    audioSrc: 'audio/diary.mp3'
  },
  {
    categories: 'study',
    word: 'class',
    translation: 'класс',
    image: 'images/class.jpg',
    audioSrc: 'audio/class.mp3'
  },
  {
    categories: 'study',
    word: 'blackboard',
    translation: 'доска',
    image: 'images/blackboard.jpg',
    audioSrc: 'audio/blackboard.mp3'
  },
  {
    categories: 'study',
    word: 'teacher',
    translation: 'учитель',
    image: 'images/teacher.jpg',
    audioSrc: 'audio/teacher.mp3'
  },
  {
    categories: 'study',
    word: 'student',
    translation: 'студент',
    image: 'images/student.jpg',
    audioSrc: 'audio/student.mp3'
  },
  {
    categories: 'study',
    word: 'computer',
    translation: 'компъютер',
    image: 'images/computer.jpg',
    audioSrc: 'audio/computer.mp3'
  },
  {
    categories: 'equipment',
    word: 'elevator',
    translation: 'лифт',
    image: 'images/elevator.jpg',
    audioSrc: 'audio/elevator.mp3'
  },
  {
    categories: 'equipment',
    word: 'rocket',
    translation: 'ракета',
    image: 'images/rocket.jpg',
    audioSrc: 'audio/rocket.mp3'
  },
  {
    categories: 'equipment',
    word: 'kettle',
    translation: 'чайник',
    image: 'images/kettle.jpg',
    audioSrc: 'audio/kettle.mp3'
  },
  {
    categories: 'equipment',
    word: 'tank',
    translation: 'танк',
    image: 'images/tank.jpg',
    audioSrc: 'audio/tank.mp3'
  },
  {
    categories: 'equipment',
    word: 'fan',
    translation: 'вентилятор',
    image: 'images/fan.jpg',
    audioSrc: 'audio/fan.mp3'
  },
  {
    categories: 'equipment',
    word: 'hoover',
    translation: 'пылесос',
    image: 'images/hoover.jpg',
    audioSrc: 'audio/hoover.mp3'
  },
  {
    categories: 'equipment',
    word: 'helicopter',
    translation: 'вертолёт',
    image: 'images/helicopter.jpg',
    audioSrc: 'audio/helicopter.mp3'
  },
  {
    categories: 'equipment',
    word: 'aircraft',
    translation: 'самолёт',
    image: 'images/aircraft.jpg',
    audioSrc: 'audio/aircraft.mp3'
  },
  {
    categories: 'equipment',
    word: 'pistol',
    translation: 'пистолет',
    image: 'images/pistol.jpg',
    audioSrc: 'audio/pistol.mp3'
  },
  {
    categories: 'equipment',
    word: 'motorcycle',
    translation: 'мотоцикл',
    image: 'images/motorcycle.jpg',
    audioSrc: 'audio/motorcycle.mp3'
  },
];



add_main_cards('category-card'); // добавить главные карточки при загрузке страницы


// обработчик событий клика по любому месту
document.addEventListener("click", element => {

  // если был клик по любому месту кроме 
  if (!element.target.classList.toString().includes("main-menu-list") && !element.target.parentNode.classList.toString().includes("main-menu-switch")) {

    main_menu_switch.classList.remove("main-menu-switch-active"); // повернуть обратно квадратик
    main_menu_container.classList.remove("main-menu-container-active"); // убрать меню
  }
});



// обработчик событий для клика по квадратику, отображаем меню или прячем его
main_menu_switch.addEventListener("click", element => {
  main_menu_switch.classList.toggle("main-menu-switch-active");
  main_menu_container.classList.toggle("main-menu-container-active");
});



// обработчик собитий клика по меню
main_menu_container.addEventListener("click", element => {

  if (!element.target.classList.toString().includes(default_class_main_card)) return; // если клик был не по карточке меню

  if (object_train.categoryes_page_mode && object_train.counts_button) {
    object_train.counts_button = 0; // если мы на странице с категор и кнопка есть, удалить
    this_sound = false; // а если удалили кнопку то игра окончена в любом случае даже если не началась
    object_train.reset_play(); // сбросили игровой объект
    
    while (container_star.firstChild) { // тогда удалим все звёздочки, даже если их нет
      container_star.removeChild(container_star.firstChild);
     }
    
  }


  delete_cards(); // удалить все карточки 

  add_main_cards(element.target.getAttribute("name").toString()); // добавить главные карточки

  add_cards(element.target.getAttribute("name").toString()); // добавить карточки определённой категории

  card_text_added_fill(object_train.training_mode); // если режим игры то закрасить главные карточки
  card_input_mod_game(object_train.training_mode); // если режим игры то закрасить карточки стандартные

  main_menu_switch.classList.remove("main-menu-switch-active"); // повернуть обратно квадратик
  main_menu_container.classList.remove("main-menu-container-active"); // убрать меню

});



// обработчик событий клика по карточке меню
cards_container.addEventListener("click", element => {

  if (!element.target.parentNode.classList.toString().includes("item")) return;

  delete_cards(); // удалить все карточки

  add_cards(element.target.parentNode.getAttribute("name")); // добавить карточки той самой категории
  card_input_mod_game(object_train.training_mode); // закрасить карточки стандартные





  main_menu_switch.classList.remove("main-menu-switch-active"); // повернуть обратно квадратик
  main_menu_container.classList.remove("main-menu-container-active"); // убрать меню

});


// обработчик событий клика по контейнеру для поворота карточек
cards_container.addEventListener("click", element => {



  if (!element.target.classList.toString().includes("hand-drawn-arrow")) { // если не стрелочка то выкл листенер
    return;
  }


  element.target.parentNode.parentNode.parentNode.parentNode.classList.add("card_vrap-rotate-click-hover"); // добавить класс поворота



  // обработчик событий: если кликнули всё таки по стрелочке и убрали с карточки мышку то убираем этот класс и возвращаем карточку на место
  element.target.parentNode.parentNode.parentNode.parentNode.addEventListener("mouseleave", element => {

    element.target.classList.remove("card_vrap-rotate-click-hover"); // добавить класс поворота

  });


});






// обработчик событий клика по карточке, тоесть её картинке (воспроизвести аудио)
cards_container.addEventListener("click", element => {

  if (object_train.training_mode) return; // не воспроизводить звуки в режиме игры при клике по картинке


  let src; // путь к аудиозаписи
  // если кликнули по клавной карточке или не по картинке карточки то сразу завершить досрочно
  if (element.target.parentNode.classList.toString().includes("item") || !element.target.classList.toString().includes("card-image")) {
    return;
  }

  // в этом цикле перебираем всё содержимое карточки, находим текст и присваиваем его переменной
  for (let i of element.target.parentNode.children) {
    if (i.tagName == "FIGCAPTION") {
      object_train.this_word = i.innerText.toString();
    }
  };

  // перебираем массив объектов и находим текущую карточку
  for (let i = 0; i < array_objects_cards.length; i++) {
    src = array_objects_cards[i].audioSrc;
    if (array_objects_cards[i].word == object_train.this_word) break;
    if (i == array_objects_cards.length - 1 && array_objects_cards[i].word != object_train.this_word) src = undefined;
  }

  soundPlay(src);
});



// /* режим игры */




// обработчик событий клика по переключателю

switch_trainin_play.addEventListener("click", element => {
  

  
  // стукнули по переключателю и включили режим игры, стукнули снова выключили режим игры
  object_train.training_mode = object_train.training_mode ? false : true;

  if ( object_train.training_mode )  {
    switch_trainin_play_text.style.display = "none";
    setTimeout( () => { 
      switch_trainin_play_text.innerText = "Train";
      switch_trainin_play_text.classList.add("switch-text-active");
    }, 210);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.1"; }, 400);
    setTimeout( () => { switch_trainin_play_text.style.display = "block"; }, 450);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.2"; }, 500);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.3"; }, 550);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.4"; }, 600);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.5"; }, 650);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.6"; }, 700);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.7"; }, 750);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.8"; }, 800);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.9"; }, 850);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "1"; }, 900);
  } else {
    switch_trainin_play_text.style.display = "none";
    setTimeout( () => { 
    switch_trainin_play_text.innerText = "Play";
    switch_trainin_play_text.classList.remove("switch-text-active");
    }, 210);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.1"; }, 400);
    setTimeout( () => { switch_trainin_play_text.style.display = "block"; }, 450);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.2"; }, 500);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.3"; }, 550);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.4"; }, 600);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.5"; }, 650);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.6"; }, 700);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.7"; }, 750);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.8"; }, 800);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "0.9"; }, 850);
    setTimeout( () => { switch_trainin_play_text.style.opacity = "1"; }, 900);
  }

  // если стукнули по выключателю то закрасили или вернули в исходное состояние меню
  main_menu_container.classList.toggle("main-menu-container-play");


  // если стукнули по выключателю то закрасили или вернули в исходное состояние главные карточки
  card_text_added_fill(object_train.training_mode);

  card_input_mod_game(object_train.training_mode); // закрасить карточки стандартные

  toggle_button(object_train.categoryes_page_mode, object_train.training_mode); // первый аргумент true если мы на главной странице, второй аргумент если вых реж игр



});









// функция которая в зависимости от того главные карточки или просто карточки добавит или удалит кнопку
function toggle_button(cards_main_in_page, mode_play) {



  if (cards_main_in_page && mode_play && !object_train.counts_button) { // если не карточки с главным меню на странице и режим игры

    let button_mode_game = document.createElement("button"); // создали кнопку
    button_mode_game.classList.add("button-mode-game"); // дали ей класс
    button_mode_game.innerText = "Play";
    cards_container.append(button_mode_game); // добавить кнопку 
    object_train.training_mode = true;
    object_train.counts_button++;
    return;
  }
  if (cards_container.lastElementChild.tagName == "BUTTON") { // если не режим игры или не на главной странице то удалить кнопку
    cards_container.removeChild(cards_container.lastElementChild); // удалить кнопку
    object_train.training_mode = false;
    object_train.counts_button--;
    return;
  }
}








// функция которая переключит все стандартные карточки в режим игры
function card_input_mod_game(flag) {

  if ( true ) { // если переключили режим игры в любом случае игровой ресет
    this_sound = false; // а если удалили кнопку то игра окончена в любом случае даже если не началась
    object_train.reset_play(); // сбросили игровой объект
    document.querySelectorAll(".card-front").forEach( element => { // снять выделение с карточек
      element.classList.remove("cards-container-active");
     });
    while (container_star.firstChild) { // тогда удалим все звёздочки, даже если их нет
      container_star.removeChild(container_star.firstChild);
     }
  }

  const card_items_text = document.querySelectorAll(".card_vrap-rotate .card-text"); // все тексты карточек
  const card_items_arrow = document.querySelectorAll(".card_vrap-rotate .rotate-button"); // все стрелки карточек
  const card_items_image = document.querySelectorAll(".card_vrap-rotate .card-image"); // все картинки карточек

  if (flag) { // если режим игры то убираем всё и оставляем только картинку

    card_items_text.forEach(element => {
      element.classList.add("card-text-hidden");
    });

    card_items_arrow.forEach(element => {
      element.classList.add("rotate-button-hidden");
    })

    card_items_image.forEach(element => {
      element.classList.add("card-image-play");
    });



  } else { // если режим тренировки то возвращаем стрелки надписи и так далее
    card_items_text.forEach(element => {
      element.classList.remove("card-text-hidden");
    });

    card_items_arrow.forEach(element => {
      element.classList.remove("rotate-button-hidden");
    })

    card_items_image.forEach(element => {
      element.classList.remove("card-image-play");
    });

  }

}





// функция перемешает все мои слова
function shuffle__arry(arr) {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}




let array_sound = []; // объявили массив для сбора треков
let this_sound; // временная переменная
document.addEventListener("click", element => {
  if (!element.target.classList.contains("button-mode-game") || this_sound ) return; // если клик не по кнопке завершить или уже игра
  array_sound.length = 0; // обнулить массив звуков

  document.querySelector(".button-mode-game").classList.add("button-mode-game-active");
  document.querySelector(".button-mode-game").innerText = "";

  let collection_text_card = document.querySelectorAll(".card-text-angl"); // получили список слов

  collection_text_card.forEach(element => { // положили все слова в массив
    array_sound.push( 
                   { 
                     src: "audio/" + element.innerText.toString() + ".mp3", 
                     word: element.innerText.toString(), 
                     flag: false, 
                    });
  });
  array_sound = shuffle__arry(array_sound); // перемешали все слова
   
  
  object_train.count_cards = array_sound.length; // количество карточек всего
  this_sound = array_sound.pop(); // забрать последний трек
  soundPlay(this_sound.src); // воспроизвести его
   

});







document.addEventListener("click", element => {

  if ( !this_sound || element.target.classList.contains("button-mode-game") || !element.target.classList.contains("card-image") ) return; // если текущее слово false то выход
   

  let collection_children = element.target.parentNode.children; // получили коллекцию детей карточки

  
  // нашли в карточке текст и положили его в переменную текст зис
  for (let i of collection_children ) {
    if ( i.classList.contains("card-text-angl") ) {
      object_train.this_word = i.innerText;
    }
  };
  
  // если нажал на ту самую карточку 
  if (object_train.this_word == this_sound.word) {
    if ( element.target.parentNode.classList.contains("cards-container-active") ) return; // если кликнули по уже выбраной карте
    object_train.count_yes++; // количество правильных ответов увеличилось
    let abc = document.createElement("div");
    abc.classList.add("star-win");
    element.target.parentNode.classList.add("cards-container-active");
    container_star.append(abc);
    soundPlay("audio/true_click.mp3");
    object_train.this_click = true; // текущий выбор верный
  }
  else {
    if ( element.target.parentNode.classList.contains("cards-container-active") ) return; // если кликнули по уже выбраной карте
    object_train.count_no++; // количество правильных ответов уменьшилось
    let jj = document.createElement("div");
    jj.classList.add("star-lose");
    container_star.append(jj);
    soundPlay("audio/error_click.mp3");
    object_train.this_click = false; // текущий выбор неверный
  }
  


  if ( !object_train.this_click ) return; // если клик был неверный то досрочно заканчиваем обработчик

  



  // если количество верных ответов равно количеству карточек то перезагрузка
  if ( object_train.count_yes == object_train.count_cards ) {

    if ( object_train.count_no == 0 ) {
      setTimeout( () => { soundPlay("audio/fistful-of-frags-victory.mp3") }, 1500); // музыка победы
     
      while (body_element.firstChild) {
        body_element.removeChild(body_element.firstChild);
       }
    
       let create_element = document.createElement("div");
       create_element.classList.add("body-win");
       body_element.appendChild(create_element);


      // сооздали и положили текст победы
      let container_text = document.createElement("div");
      container_text.classList.add("count-error-container");
      let count_text_error = document.createElement("p");
      count_text_error.classList.add("count-error-text");
      count_text_error.innerText = "Поздравляем, you win!!!!";
      container_text.append(count_text_error);
      body_element.appendChild(container_text);
      // текст победы конец

  

       setTimeout(() => {window.location.pathname = 'English-for-kids/index.html'}, 18000) // перезагрузить страницу
    }
    else {
      setTimeout( () => { soundPlay("audio/you_lose.mp3") }, 1500); // музыка поражения
      
      while (body_element.firstChild) {
        body_element.removeChild(body_element.firstChild);
       }
       
      // создали и положили картинку поражения
       let create_element = document.createElement("div");
       create_element.classList.add("body-lose");
       body_element.appendChild(create_element);


       // сооздали и положили текст поражения
       let container_text = document.createElement("div");
       container_text.classList.add("count-error-container");
       let count_text_error = document.createElement("p");
       count_text_error.classList.add("count-error-text");
       count_text_error.innerText = "К сожалению you lose, количество ошибок: ";
       let count_value_error = document.createElement("span");
       count_value_error.classList.add("count-error-value");
       count_value_error.innerText = object_train.count_no;
       count_text_error.append(count_value_error);
       container_text.append(count_text_error);
       body_element.appendChild(container_text);
       // текст поражения конец




       setTimeout(() => {window.location.pathname = 'English-for-kids/index.html'}, 7000) // перезагрузить страницу
    }

    
  }

  this_sound = array_sound.pop(); // забрали следующее слово
  soundPlay(this_sound.src); // воспроизвели его
  
  
});


document.addEventListener("click", element => {
  if ( element.target.classList.contains("button-mode-game")  && this_sound) {
    soundPlay(this_sound.src); // повторить трек
    
  }

  

});


document.addEventListener("mousedown", element => {
  
  if ( !element.target.classList.contains("button-mode-game-active") ) return;
   
  element.target.classList.add("button-mode-game-click"); // разукрасить кнопку
  
});

document.addEventListener("mouseup", element => {
  
  if ( !element.target.classList.contains("button-mode-game-active") ) return;
   
  element.target.classList.remove("button-mode-game-click"); // разукрасить кнопку
  
});




// отлавливаем баг с переключателем
window.addEventListener('load', (event) => {
  if ( !document.querySelector(".switch-play-training__input-checkbox").checked && !document.querySelector(".switch-text").classList.contains(".switch-text-active") ) {
    document.querySelector(".switch-play-training__input-checkbox").checked = "false";
  }
});