import setupClassChangeObserver from "../commonObserver.js";
import {INTERVAL} from "../constants.js";
import {moveToStep} from '../navigation.js'

const step = document.getElementById('step4');

function extractNumberFromString(text) {
    const matches = text.match(/\d+/);
    return matches ? parseFloat(matches[0]) : 0;
}

function createCheckItem(title, price, isPlanType) {
    return `
        <li class="check-item${isPlanType ? ' plan-type' : ''}">
            <p class="item-title">${title}${isPlanType ? '<br><span class="item-change">Change</span>' : ''}</p>
            <p class="item-price">${price}</p>
        </li>
    `;
}

function calculateTotalPrice(cardPrice, addOnsPrices) {
    const cardPriceValue = extractNumberFromString(cardPrice);
    const addOnsTotal = addOnsPrices.reduce((total, addOnsPrice) => total + extractNumberFromString(addOnsPrice), 0);
    return cardPriceValue + addOnsTotal;
}

function reloadStep(step) {
    const checkListEl = step.querySelector('.check');
    const cardEl = document.querySelector('.card--active');
    const addOnsEls = document.querySelectorAll('.add-ons-container--active');

    const cardType = cardEl.querySelector('.card-type').textContent;
    const cardPrice = cardEl.querySelector('.card-price').textContent;
    const addOnsPrices = Array.from(addOnsEls, addOns => addOns.querySelector('.add-ons-price').textContent);
    const totalPrice = calculateTotalPrice(cardPrice, addOnsPrices);

    checkListEl.innerHTML = '';
    checkListEl.insertAdjacentHTML('beforeend', createCheckItem(cardType, cardPrice, true));

    addOnsEls.forEach(addOns => {
        const addOnsText = addOns.querySelector('.add-ons-text').textContent;
        const addOnsPrice = addOns.querySelector('.add-ons-price').textContent;
        checkListEl.insertAdjacentHTML('beforeend', createCheckItem(addOnsText, addOnsPrice, false));
    });

    step.querySelector('.total-price').innerHTML = `
        <p class="price-title">Total (per ${cardPrice.includes('mo') ? INTERVAL.MONTHLY : INTERVAL.YEARLY})</p>
        <p id="totalPrice" class="price">${cardPrice.replace(/\d+/, totalPrice)}</p>
    `;

    const changeEl = step.querySelector('.item-change')

    changeEl.addEventListener('click',() =>moveToStep(2))
}
setupClassChangeObserver(step,reloadStep);


export const stepObject = {
    stepElement: step,
    isValid: () => true
};