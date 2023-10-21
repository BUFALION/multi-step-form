import {INTERVAL} from "../constants.js";

const switchEl = document.getElementById('switch')
const switchContainer = document.querySelector('.switch-container')
const cardPrices =document.querySelectorAll('.card-price')
const cards= document.querySelectorAll('.card')
const step = document.getElementById('step2')

const cardData = {
    arcade:{
        monthPrice:'$9/mo',
        yearPrice:'$90/yr'
    },
    advanced:{
        monthPrice:'$12/mo',
        yearPrice:'$120/yr'
    },
    pro:{
        monthPrice:'$15/mo',
        yearPrice:'$150/yr'
    }
}
let chosenCard;

function isValid(){
    return chosenCard;
}

function handleSwitchClick(event) {
    const interval = event.currentTarget.checked ? INTERVAL.YEARLY : INTERVAL.MONTHLY;
    interval === INTERVAL.YEARLY?step.classList.add('step--year'):step.classList.remove('step--year')

    switchContainer.classList.toggle("switch-on", event.currentTarget.checked);

    step.closest('.step-container').setAttribute('data-interval',interval)

    updateCardPrice(interval);
}

function handleCardClick(card) {
    chosenCard?.classList.remove('card--active');
    card.classList.add('card--active')
    chosenCard = card;

}

function updateCardPrice(interval) {
    cardPrices.forEach(cardPriceElement => {
        const card = cardPriceElement.closest('.card');
        const cardType = card.getAttribute('data-card');
        cardPriceElement.textContent = cardData[cardType][interval+'Price'];
    });
}

switchEl.addEventListener('click', handleSwitchClick);

cards.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});

export const stepObject = {
    stepElement: step,
    chosenCard: chosenCard,
    isValid,

}