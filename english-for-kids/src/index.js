
import "./style.css";
import cards from './cards.js';


class MenuCard {
  constructor(categoryName) {
    let imageName = cards[categoryName][1].image;

    this.cardContainer = document.createElement('div');
    // this.cardContainer.className = 'p-3';

    this.card = document.createElement('div');
    this.card.className = 'card';
    this.cardContainer.append(this.card);

    let imageContainer = document.createElement('div');
    imageContainer.className = 'image p-4';
    this.card.append(imageContainer);

    let image = document.createElement('img');
    image.className = 'rounded-circle img-thumbnail';
    image.setAttribute('src', '../' + imageName);
    imageContainer.append(image);

    let cardLink = document.createElement('a');
    cardLink.className = 'stretched-link';
    cardLink.setAttribute('href', '#');
    this.card.append(cardLink);

    let cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card-inner';
    cardLink.append(cardTextContainer);

    this.cardText = document.createElement('h2');
    this.cardText.innerText = categoryName;
    cardTextContainer.append(this.cardText);
  }

  getHtmlElement() {
    return this.cardContainer;
  }

};

class CategoryCard {
  constructor({word, translation, image, audioSrc}) {

    this.cardContainer = document.createElement('div');
    // this.cardContainer.className = 'p-3';
    
    this.card = document.createElement('div');
    this.card.className = 'card card-active';
    this.cardContainer.append(this.card);

    this.cardFront = document.createElement('div');
    this.cardFront.className = 'front';
    this.card.append(this.cardFront);

    let imageContainerFront = document.createElement('div');
    imageContainerFront.className = 'image';
    this.cardFront.append(imageContainerFront);

    this.imgFront = document.createElement('img');
    this.imgFront.setAttribute('src', '../' + image);
    imageContainerFront.append(this.imgFront);

    let description = document.createElement('div');
    description.setAttribute('id', 'description');
    description.className = 'd-flex justify-content-end px-2';
    this.cardFront.append(description);

    this.textEN = document.createElement('div');
    this.textEN.className = 'card-inner';
    description.append(this.textEN);

    this.wordEN = document.createElement('h2');
    this.wordEN.innerText = word;
    this.textEN.append(this.wordEN);

    this.iconContainer = document.createElement('div');
    this.iconContainer.className = 'icon fa-2x color-light';
    description.append(this.iconContainer);

    let icon = document.createElement('i');
    icon.className = 'fas fa-redo';
    icon.setAttribute('data', 'flip');
    this.iconContainer.append(icon);

    let link = document.createElement('a');
    link.className = 'stretched-link';
    link.setAttribute('href', '#');
    link.setAttribute('data', 'cardLink');
    this.cardFront.append(link);

    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', '../' + audioSrc);
    link.append(this.audio);

    /* Card back side */
    this.cardBack = document.createElement('div');
    this.cardBack.className = 'back';
    this.card.append(this.cardBack);

    let imageContainerBack = document.createElement('div');
    imageContainerBack.className = 'image';
    this.cardBack.append(imageContainerBack);

    this.imgBack = document.createElement('img');
    this.imgBack.setAttribute('src', '../' + image);
    imageContainerBack.append(this.imgBack);

    let descriptionBack= document.createElement('div');
    descriptionBack.className = 'd-flex justify-content-center px-2';
    this.cardBack.append(descriptionBack);

    let cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card-inner';
    descriptionBack.append(cardTextContainer);

    this.wordRU = document.createElement('h2');
    this.wordRU.innerText = translation;
    cardTextContainer.append(this.wordRU);
  }

  getHtmlElement() {
    return this.cardContainer;
  }

  update({word, translation, image, audioSrc}) {
    this.card.classList.remove('card-inactive');
    this.card.classList.add('card-active');
    this.wordEN.innerText = word;
    this.wordRU.innerText = translation;
    this.imgFront.setAttribute('src', '../' + image);
    this.imgBack.setAttribute('src', '../' + image);
    this.audio.setAttribute('src', '../' + audioSrc);
  }
};

let menuCards = [];
const cardDeck = document.getElementById('mainPage');
Object.keys(cards).forEach(element => {
  let menuCard = new MenuCard(element);
  cardDeck.append(menuCard.getHtmlElement());
  menuCards.push(menuCard);
});

let categoryCards = [];
let firstCategory = Object.keys(cards)[0];
const category = document.getElementById('category-page');
cards[firstCategory].forEach(element => {
  let card = new CategoryCard(element)
  category.append(card.getHtmlElement());
  categoryCards.push(card);
});

let container = document.getElementById('pageContainer');
let categoryPage = document.getElementById('category');
let navLinks = document.querySelectorAll('.nav-link');
function hiddenSidebar() {
  let sidebar = document.getElementById('sidebar');
  let hiddenSidebar = document.getElementById('hiddenSidebar');
  sidebar.classList.remove('show');
  hiddenSidebar.classList.add('show');
}
/* sideBar click */
document.querySelector('.nav').addEventListener('click', (event) => {
    navLinks.forEach(a => {
        a.classList.remove('active');
    })
    event.target.classList.add('active');
    if (event.target.classList.contains('menu')) {
        categoryPage.style.display = 'none';
        container.style.display = 'block';
        hiddenSidebar();
    } else {
        container.style.display = 'none';
        categoryPage.style.display = 'block';
        hiddenSidebar();

    }
    let getNameCategory = event.target.innerText;
    updateCards(getNameCategory);
});

// change Play/Train mode
let gameMode;
let switcher = document.querySelector('.tgl');
switcher.addEventListener('change', (event) => {
  gameMode = event.target.checked;
  // event.target.checked;
  game();
});

let button = document.querySelector('.btn');
let iconRepeat =  document.createElement('i');

function createIconRepeat() {
  iconRepeat.className = 'fas fa-3x fa-redo icon-repeat';
  iconRepeat.setAttribute('data', 'repeat');
  button.append(iconRepeat);
}

function changeButton() {
  button.classList.remove('btn-lg');
  button.classList.add('btn-rounded');
  button.setAttribute('data', 'repeat');
  button.innerText = "";
  createIconRepeat();
  buttonPressed = true;
}

function restoreButton() {
  button.classList.remove('btn-rounded');
  button.classList.add('btn-lg');
  button.removeAttribute('data', 'repeat');
  button.setAttribute('data', 'startGame')
  iconRepeat.remove();
  button.innerText = "Start game";
  buttonPressed = false;
}

const htmlCards = categoryPage.getElementsByClassName('card');
function game() {
   if (gameMode) {
    let mainCads = container.querySelectorAll('.card');
    mainCads.forEach(element => {
      element.classList.add('page-game');
    });
    htmlCards.forEach(element => {
      element.getElementsByTagName('div')[2].classList.add('none');
      element.getElementsByTagName('img')[0].classList.add('card-cover');
    });
    button.classList.add('btn-active');
    document.getElementById('nav').classList.add('page-game');
  }
  else {
    let mainCads = container.querySelectorAll('.card');
    mainCads.forEach(element => {
      element.classList.remove('page-game');
    });
    htmlCards.forEach(element => {
      element.getElementsByTagName('div')[2].classList.remove('none');
      element.getElementsByTagName('img')[0].classList.remove('card-cover');
      element.classList.remove('card-inactive');
      
    });
    button.classList.remove('btn-active');
    document.getElementById('nav').classList.remove('page-game');
    clearRaiting();
  }
}

//flipping a card when clicking on the icon
let cardActive = categoryPage.getElementsByClassName('card-active');
let rating = document.getElementById('rating');
let ignore = false;
let gameResult = true;
let buttonPressed = false;
let currentCard;


function createIconStarTrue() {
  let star = document.createElement('i');
  star.className = "fas fa-2x fa-star";
  rating.append(star);
}

function createIconStarFalse() {
  let star = document.createElement('i');
  star.className = "far fa-2x fa-star";
  rating.append(star);
}

const clickTargets = {
  flip: 'flip',
  cardLink: 'cardLink',
  repeat: 'repeat',
  startGame: 'startGame',
}

categoryPage.addEventListener('click', (event) => {
  let clickedTarget = event.target.getAttribute('data');
  let clickedCard = event.target.closest('.card');
  if (!clickedTarget) hiddenSidebar();
  if (clickedTarget === clickTargets.flip) {
    clickedCard.classList.add("flipped");
  }
  else if ((clickedTarget === clickTargets.cardLink) && !gameMode) {
    event.target.firstElementChild.play();
  }
  else if ((clickedTarget === clickTargets.cardLink) && gameMode && buttonPressed && !ignore) {
    
    if (clickedCard.innerText === currentCard.innerText) {
      ignore = true;
      createIconStarTrue();
      let audio = new Audio('../audio/correct.mp3');
      clickedCard.classList.remove('card-active');
      clickedCard.classList.add('card-inactive');
      audio.play();
      randomCard();
      setTimeout(playAudio, 1000);
      gameResult = gameResult && true;
    }
    else {
      createIconStarFalse(); 
      let audio = new Audio('../audio/error.mp3');
      audio.play();
      gameResult = gameResult && false;
    }
  }

  else if (clickedTarget === clickTargets.repeat) {
    currentCard.getElementsByTagName('audio')[0].play();
  }
  else if (clickedTarget === clickTargets.startGame) {
    changeButton();
    randomCard();
    setTimeout(playAudio, 1000);
  }
  hiddenSidebar();
});

function returnMain() {
  if (!gameResult) {
    document.body.classList.remove('failure');
    let errorText = document.body.getElementsByClassName('result')[0];
    errorText.remove();  
    document.getElementById('wrapper').classList.remove('hidden');
  }
  else {
    document.body.classList.remove('success');
  }
  categoryPage.style.display = 'none';
  container.style.display = 'block';
  switcher.checked = false;
  gameMode = switcher.checked;
  game();
}
function fail() {
  let failResult = rating.querySelectorAll('.far').length;
  document.getElementById('wrapper').classList.add('hidden');
  let errorText = document.createElement('h2');
  errorText.classList.add('result');
  errorText.innerText = failResult + ' errors';
  document.body.append(errorText);
  document.body.classList.add('failure');
}
function finishGame() {
  let audio;
  if (!gameResult) {
    fail();
    audio = new Audio('../audio/failure.mp3');
  }
  else {
    document.body.classList.add('success');
    audio = new Audio('../audio/success.mp3');
  }
  audio.play();
  setTimeout(returnMain, 3000);
}

function randomCard() {
  let x = Math.floor(Math.random() * cardActive.length);
  currentCard = cardActive[x];
}

function playAudio () {
  if (!currentCard) {
    finishGame();
  }
  else {
    currentCard.getElementsByTagName('audio')[0].play();
  }
  ignore = false;
}
//flip back a card on mouseout
categoryPage.addEventListener('mouseout', (event) => {
  if (!event.target || !event.relatedTarget) return;
  let card = event.target.closest('.card');
  let cardRelatedTarget = event.relatedTarget.closest('.card');
  if (card !== null && card != cardRelatedTarget)
  {
    card.classList.remove("flipped");
  } 
}); 

//transition to categories
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('stretched-link')) {
      let selectedLink = event.target.innerText;
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.innerText === selectedLink) {
          a.classList.add('active');
        }
      })
      container.style.display = 'none';
      categoryPage.style.display = 'block';
      updateCards(selectedLink);
    }
    hiddenSidebar();
});

function clearRaiting() {
  while (rating.firstChild) {
    rating.removeChild(rating.lastChild);
  }
};
function updateCards(categoryName) {
  clearRaiting();
  let index = 0;
  cards[categoryName].forEach(element => {
    categoryCards[index].update(element);
    index++;
  });
  restoreButton();
};








