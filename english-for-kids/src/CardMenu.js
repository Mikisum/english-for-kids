

class CardMenu {
  constructor(categoryName, imageName) {
    this.cardContainer = document.createElement('div');
    this.card = document.createElement('div');
    this.card.className = 'card';
    this.cardContainer.append(this.card);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image p-4';
    this.card.append(imageContainer);

    const image = document.createElement('img');
    image.className = 'rounded-circle img-thumbnail';
    image.setAttribute('src', `../${imageName}`);
    imageContainer.append(image);

    const cardLink = document.createElement('a');
    cardLink.className = 'stretched-link';
    cardLink.setAttribute('href', '#');
    this.card.append(cardLink);

    const cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card-inner';
    cardLink.append(cardTextContainer);

    this.cardText = document.createElement('h2');
    this.cardText.innerText = categoryName;
    cardTextContainer.append(this.cardText);
    }
  
  getHtmlElement() {
    return this.cardContainer;
  }
}

export default CardMenu;