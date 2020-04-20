
import "./style.css";
import cards from './cards.js';


class MenuCard {
  constructor(categoryName) {
    let imageName = cards[categoryName][1].image;

    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'p-4 col-sm-6 col-md-4 col-lg-3';

    this.card = document.createElement('div');
    this.card.className = 'card';
    this.cardContainer.append(this.card);

    let imageContainer = document.createElement('div');
    imageContainer.className = 'image';
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
    this.cardContainer.className = 'p-3';
    
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
    link.setAttribute('data', 'audioLink');
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
let cardDeck = document.getElementById('mainPage');
Object.keys(cards).forEach(element => {
  let menuCard = new MenuCard(element);
  cardDeck.append(menuCard.getHtmlElement());
  menuCards.push(menuCard);
});

let categoryCards = [];
let firstCategory = Object.keys(cards)[0];
let category = document.getElementById('category-page');
cards[firstCategory].forEach(element => {
  let card = new CategoryCard(element)
  category.append(card.getHtmlElement());
  categoryCards.push(card);
});

const container = document.getElementById('pageContainer');
const categoryPage = document.getElementById('category');

const MENU = document.querySelector('.nav'); 
const navLinks = document.querySelectorAll('.nav-link');
const menuIcon = document.querySelector('.menu');


MENU.addEventListener('click', (event) => {
    navLinks.forEach(a => {
        a.classList.remove('active');
    })

    event.target.classList.add('active');
    if (event.target.classList.contains('menu')) {
        categoryPage.style.display = 'none';
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
        categoryPage.style.display = 'block';
    }
    let getNameCategory = event.target.innerText;
    updateCards(getNameCategory);
});

// change Play/Train mode
let gameMode;
let switcher = document.querySelector('.tgl');
switcher.addEventListener('change', (event) => {
  gameMode = event.target.checked;
  game();
});

function changeButton() {
  button.classList.remove('btn-lg');
  button.classList.add('btn-rounded');
  button.setAttribute('data', 'repeat');
  button.innerText = "";
  button.append(icon);
  buttonPressed = true;
}

function restoreButton() {
  button.classList.remove('btn-rounded');
  button.classList.add('btn-lg');
  button.removeAttribute('data', 'repeat');
  button.setAttribute('data', 'startGame')
  icon.remove(icon);
  button.innerText = "Start game";
  icon.removeAttribute('id');
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
  }
  else {
    let mainCads = container.querySelectorAll('.card');
    mainCads.forEach(element => {
      element.classList.remove('page-game');
    });
    htmlCards.forEach(element => {
      element.getElementsByTagName('div')[2].classList.remove('none');
      element.getElementsByTagName('img')[0].classList.remove('card-cover');
    });
    button.classList.remove('btn-active');
  }
}

//flipping a card when clicking on the icon
let icon = categoryPage.getElementsByClassName('fa-redo')[0];
let cardActive = categoryPage.getElementsByClassName('card-active');
let rating = document.getElementById('rating');
let ignore = false;
let gameResult = true;
let buttonPressed = false;
let currentCard;

categoryPage.addEventListener('click', (event) => {
  if (event.target.getAttribute('data') === 'flip') {
    event.target.closest('.card').classList.add("flipped");
  }
  else if ((event.target.getAttribute('data') === 'audioLink') && !gameMode) {
    event.target.firstElementChild.play();
  }
  else if ((event.target.getAttribute('data') === 'audioLink') && gameMode && buttonPressed && !ignore) {
    
    if (event.target.closest('.card').innerText === currentCard.innerText) {
      ignore = true;
      let star = document.createElement('i');
      star.className = "fas fa-2x fa-star";
      rating.append(star);
      let audio = new Audio('../audio/correct.mp3');
      event.target.closest('.card').classList.remove('card-active');
      event.target.closest('.card').classList.add('card-inactive');
      audio.play();
      randomCard();
      setTimeout(playAudio, 1000);
      gameResult = gameResult && true;
    }
    else {
      let star = document.createElement('i');
      star.className = "far fa-2x fa-star";
      rating.append(star);
      let audio = new Audio('../audio/error.mp3');
      audio.play();
      gameResult = gameResult && false;
    }
  }

  else if (event.target.getAttribute('id') === 'repeat') {
    currentCard.getElementsByTagName('audio')[0].play();
  }
  else if (event.target.classList.contains('btn')) {
    changeButton();
    randomCard();
    setTimeout(playAudio, 1000);
  }
});

function returnMain() {
  if (!gameResult)
    document.body.classList.remove('failure');
  else
    document.body.classList.remove('success');

  categoryPage.style.display = 'none';
  container.style.display = 'block';
  switcher.checked = false;
  game();
}

function finishGame() {
  // let failResult = rating.querySelectorAll('.far').length;
  let audio;
  if (!gameResult) {
    document.body.classList.add('failure');
    // document.body.innerText = failResult + ' errors';
    audio = new Audio('../audio/failure.mp3');
  }
  else {
    document.body.classList.add('success');
    audio = new Audio('../audio/success.mp3');
  }
  audio.play();
  setTimeout(returnMain, 3000);

}

let button = document.querySelector('.btn');

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
});


function updateCards(categoryName) {
  while (rating.firstChild) {
    rating.removeChild(rating.lastChild);
  }

  let index = 0;
  cards[categoryName].forEach(element => {
    categoryCards[index].update(element);
    index++;
  });

  // for (let i = 0; i < htmlCards.length; i++) {
  //   htmlCards[i].classList.remove('card-inactive');
  //   htmlCards[i].classList.add('card-active');
  //   htmlCards[i].getElementsByTagName('img').forEach(element => {
  //     element.src = '../' + cards[categoryName][i].image;
  //   });
  //   htmlCards[i].getElementsByTagName('h2')[0].innerText = cards[categoryName][i].word;
  //   htmlCards[i].getElementsByClassName('translation')[0].innerText = cards[categoryName][i].translation;
  //   htmlCards[i].getElementsByTagName('audio')[0].src = '../' + cards[categoryName][i].audioSrc;
  // }
  restoreButton();
};

// const SWITCHER = document.getElementById('display-address');

// SWITCHER.addEventListener('click', (event) => {

// });







