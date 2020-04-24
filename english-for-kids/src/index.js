import "./style.css";
import cards from './cards';
import CardMenu from './CardMenu';
import CategoryCard from './CategoryCard';

const menuCards = [];
const cardDeck = document.getElementById('mainPage');
Object.keys(cards).forEach(element => {
  const menuCard = new CardMenu(element, cards[element][1].image);
  cardDeck.append(menuCard.getHtmlElement());
  menuCards.push(menuCard);
});

const categoryCards = [];
const firstCategory = Object.keys(cards)[0];
const category = document.getElementById('category-page');
cards[firstCategory].forEach(element => {
  const card = new CategoryCard(element)
  category.append(card.getHtmlElement());
  categoryCards.push(card);
});

const container = document.getElementById('pageContainer');
const categoryPage = document.getElementById('category');
const navLinks = document.querySelectorAll('.nav-link');
function hiddenSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('show');
}
// sideBar click 
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
    const getNameCategory = event.target.innerText;
    updateCards(getNameCategory);
});

// change Play/Train mode
let gameMode;
const switcher = document.querySelector('.tgl');
switcher.addEventListener('change', (event) => {
  gameMode = event.target.checked;
  game();
});

const button = document.querySelector('.btn');
const iconRepeat =  document.createElement('i');

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
    const mainCads = container.querySelectorAll('.card');
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
    const mainCads = container.querySelectorAll('.card');
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

// flipping a card when clicking on the icon
const cardActive = categoryPage.getElementsByClassName('card-active');
const rating = document.getElementById('rating');
let ignore = false;
let gameResult = true;
let buttonPressed = false;
let currentCard;


function createIconStarTrue() {
  const star = document.createElement('i');
  star.className = "fas fa-2x fa-star";
  rating.append(star);
}

function createIconStarFalse() {
  const star = document.createElement('i');
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
  const clickedTarget = event.target.getAttribute('data');
  const clickedCard = event.target.closest('.card');
  if (!clickedTarget) {
    hiddenSidebar();
  }
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
      const audio = new Audio('../audio/correct.mp3');
      clickedCard.classList.remove('card-active');
      clickedCard.classList.add('card-inactive');
      audio.play();
      randomCard();
      setTimeout(playAudio, 1000);
      gameResult = gameResult && true;
    }
    else {
      createIconStarFalse(); 
      const audio = new Audio('../audio/error.mp3');
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
    const errorText = document.body.getElementsByClassName('result')[0];
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
  const failResult = rating.querySelectorAll('.far').length;
  document.getElementById('wrapper').classList.add('hidden');
  const errorText = document.createElement('h2');
  errorText.classList.add('result');
  errorText.innerText = `${failResult  } errors`;
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
  const x = Math.floor(Math.random() * cardActive.length);
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
// flip back a card on mouseout
categoryPage.addEventListener('mouseout', (event) => {
  if (!event.target || !event.relatedTarget) return;
  const card = event.target.closest('.card');
  const cardRelatedTarget = event.relatedTarget.closest('.card');
  if (card !== null && card !== cardRelatedTarget)
  {
    card.classList.remove("flipped");
  } 
}); 

// transition to categories
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('stretched-link')) {
      const selectedLink = event.target.innerText;
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
    index += 1;
  });
  restoreButton();
};








