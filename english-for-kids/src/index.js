import "./style.css";
import cards from './cards';
import MenuCard from './MenuCard';
import CategoryCard from './CategoryCard';


const clickTargets = {
  flip: 'flip',
  cardLink: 'cardLink',
  repeat: 'repeat',
  startGame: 'startGame',
}

const gameResult = {
  status: false,
  erros: 0
};

const menuCards = [];
const cardDeck = document.getElementById('mainPage');
Object.keys(cards).forEach(element => {
  const menuCard = new MenuCard(element, cards[element][1].image);
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
function hideSidebar() {
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
        hideSidebar();
    } else {
        container.style.display = 'none';
        categoryPage.style.display = 'block';
        hideSidebar();

    }
    const getNameCategory = event.target.innerText;
    updateCards(getNameCategory);
});

// change Play/Train mode
let gameMode;
const switcher = document.querySelector('.tgl');
switcher.addEventListener('change', (event) => {
  gameMode = event.target.checked;
  checkGameMode();
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

// const htmlCards = categoryPage.getElementsByClassName('card');
function checkGameMode() {
   if (gameMode) {
    menuCards.forEach(element => {
      element.getHtmlElement().classList.add('page-game');
    });

    categoryCards.forEach(element => {
      element.getHtmlDescription().classList.add('none');
      element.getHtmlImage().classList.add('card-cover');
    });
    button.classList.add('btn-active');
    document.getElementById('nav').classList.add('page-game');
  }
  else {
    const mainCads = container.querySelectorAll('.card');
    mainCads.forEach(element => {
      element.classList.remove('page-game');
    });
    categoryCards.forEach(element => {
      element.getHtmlDescription().classList.remove('none');
      element.getHtmlImage().classList.remove('card-cover');
      element.getHtmlElement().classList.remove('card-inactive');
      
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

let buttonPressed = false;
let currentCard;

function createIconStar(className) {
  const star = document.createElement('i');
  star.className = `${className} fa-2x fa-star`;
  rating.append(star);
}

categoryPage.addEventListener('click', (event) => {
  const clickedTarget = event.target.getAttribute('data');
  const clickedCard = event.target.closest('.card');
  if (!clickedTarget) {
    hideSidebar();
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
      createIconStar('fas');
      const audio = new Audio('../audio/correct.mp3');
      clickedCard.classList.remove('card-active');
      clickedCard.classList.add('card-inactive');
      audio.play();
      randomCard();
      if (!currentCard) {
        finishGame();
      }
      else {
        setTimeout(playAudio, 1000);
      }
    }
    else {
      createIconStar('far'); 
      const audio = new Audio('../audio/error.mp3');
      audio.play();
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
  hideSidebar();
});

function playAudio () {
  currentCard.getElementsByTagName('audio')[0].play();
  ignore = false;
}

function returnMain() {
  if (!gameResult.status) {
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
  checkGameMode();
}

function showFail() {
  document.getElementById('wrapper').classList.add('hidden');
  const errorText = document.createElement('h2');
  errorText.classList.add('result');
  errorText.innerText = `${gameResult.erros} errors`;
  document.body.append(errorText);
  document.body.classList.add('failure');
  new Audio('../audio/failure.mp3').play();
}

function showSuccess() {
  document.body.classList.add('success');
  new Audio('../audio/success.mp3').play();
}
function finishGame() {
  gameResult.erros = rating.querySelectorAll('.far').length;
  gameResult.status = (gameResult.erros === 0);
  if (!gameResult.status) {
    showFail();
  }
  else {
    showSuccess();
  }

  setTimeout(returnMain, 3000);
}

function randomCard() {
  const x = Math.floor(Math.random() * cardActive.length);
  currentCard = cardActive[x];
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
    hideSidebar();
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








