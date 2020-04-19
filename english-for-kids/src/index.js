
import "./style.css";
import cards from './cards.js';

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
  button.setAttribute('id', 'repeat');
  button.innerText = "";
  icon.setAttribute('id', 'repeat');
  button.append(icon);
  buttonPressed = true;
}

function restoreButton() {
  button.classList.remove('btn-rounded');
  button.classList.add('btn-lg');
  button.removeAttribute('id');
  button.innerText = "Start game";
  icon.removeAttribute('id');
  // if (button.lastChild)
  //   button.removeChild(button.lastChild);
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
  if (event.target.getAttribute('id') === 'flip') {
    event.target.closest('.card').classList.add("flipped");
  }
  else if (event.target.classList.contains('stretched-link') && !gameMode) {
    event.target.firstElementChild.play();
  }
  else if (event.target.classList.contains('stretched-link') && gameMode && buttonPressed && !ignore) {
    
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

  for (let i = 0; i < htmlCards.length; i++) {
    htmlCards[i].classList.remove('card-inactive');
    htmlCards[i].classList.add('card-active');
    htmlCards[i].getElementsByTagName('img').forEach(element => {
      element.src = '../' + cards[categoryName][i].image;
    });
    htmlCards[i].getElementsByTagName('h2')[0].innerText = cards[categoryName][i].word;
    htmlCards[i].getElementsByClassName('translation')[0].innerText = cards[categoryName][i].translation;
    htmlCards[i].getElementsByTagName('audio')[0].src = '../' + cards[categoryName][i].audioSrc;
  }
  restoreButton();
};

// const SWITCHER = document.getElementById('display-address');

// SWITCHER.addEventListener('click', (event) => {

// });







