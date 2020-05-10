class CategoryCard {
  constructor({word, translation, image, audioSrc}) {
  
    this.cardContainer = document.createElement('div');
    
    this.card = document.createElement('div');
    this.card.className = 'card card-active';
    this.cardContainer.append(this.card);

    this.cardFront = document.createElement('div');
    this.cardFront.className = 'front';
    this.card.append(this.cardFront);

    const imageContainerFront = document.createElement('div');
    imageContainerFront.className = 'image';
    this.cardFront.append(imageContainerFront);

    this.imgFront = document.createElement('img');
    this.imgFront.setAttribute('src', `../${image}`);
    imageContainerFront.append(this.imgFront);

    this.description = document.createElement('div');
    this.description.setAttribute('id', 'description');
    this.description.className = 'd-flex justify-content-end px-2';
    this.cardFront.append(this.description);

    this.textEN = document.createElement('div');
    this.textEN.className = 'card-inner';
    this.description.append(this.textEN);

    this.wordEN = document.createElement('h2');
    this.wordEN.innerText = word;
    this.textEN.append(this.wordEN);

    this.iconContainer = document.createElement('div');
    this.iconContainer.className = 'icon fa-2x color-light';
    this.description.append(this.iconContainer);

    const icon = document.createElement('i');
    icon.className = 'fas fa-redo';
    icon.setAttribute('data', 'flip');
    this.iconContainer.append(icon);

    const link = document.createElement('a');
    link.className = 'stretched-link';
    link.setAttribute('href', '#');
    link.setAttribute('data', 'cardLink');
    this.cardFront.append(link);

    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', `../${audioSrc}`);
    link.append(this.audio);

    /* Card back side */
    this.cardBack = document.createElement('div');
    this.cardBack.className = 'back';
    this.card.append(this.cardBack);

    const imageContainerBack = document.createElement('div');
    imageContainerBack.className = 'image';
    this.cardBack.append(imageContainerBack);

    this.imgBack = document.createElement('img');
    this.imgBack.setAttribute('src', `../${image}`);
    imageContainerBack.append(this.imgBack);

    const descriptionBack= document.createElement('div');
    descriptionBack.className = 'd-flex justify-content-center px-2';
    this.cardBack.append(descriptionBack);
    
    const cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card-inner';
    descriptionBack.append(cardTextContainer);

    this.wordRU = document.createElement('h2');
    this.wordRU.innerText = translation;
    cardTextContainer.append(this.wordRU);
  }

  getHtmlDescription() {
    return this.description;
  }

  getHtmlElement() {
    return this.cardContainer;
  }

  getHtmlImage() {
    return this.imgFront;
  }

  update({word, translation, image, audioSrc}) {
    this.card.classList.remove('card-inactive');
    this.card.classList.add('card-active');
    this.wordEN.innerText = word;
    this.wordRU.innerText = translation;
    this.imgFront.setAttribute('src', `../${image}`);
    this.imgBack.setAttribute('src', `../${image}`);
    this.audio.setAttribute('src', `../${audioSrc}`);
 }
}

export default CategoryCard;