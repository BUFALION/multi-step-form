import { INTERVAL } from '../constants.js';
import setupClassChangeObserver from "../commonObserver.js";

const addOnsPriceEl = document.querySelectorAll('.add-ons-price');
const addOnsEls = document.querySelectorAll('.add-ons-container')
const step = document.getElementById('step3');


const chooseAddOns = []

function handleAddOnsClick(addOns){
    const index = chooseAddOns.indexOf(addOns);
    if (index !== -1) {
        addOns.classList.remove('add-ons-container--active');
        chooseAddOns.splice(index, 1);
    } else {

        addOns.classList.add('add-ons-container--active');
        chooseAddOns.push(addOns);
    }
}

function reloadStep(step) {
    const interval = step.closest('.step-container').getAttribute('data-interval');
    addOnsPriceEl.forEach(el => {
        const currentPrice = el.textContent;
        if (interval === INTERVAL.MONTHLY) {
            el.textContent = currentPrice.replace('0', '').replace('yr', 'mo');
        } else if (interval === INTERVAL.YEARLY) {
            const monthlyPrice = currentPrice.match(/\$\d+/);
            if (monthlyPrice) {
                const monthlyAmount = parseInt(monthlyPrice[0].slice(1), 10);
                const yearlyAmount = monthlyAmount * 10;
                el.textContent = currentPrice.replace(/\$\d+\/mo/, `$${yearlyAmount}/yr`);
            }
        }
    });
}
setupClassChangeObserver(step,reloadStep)

function isValid() {
    return true;
}

addOnsEls.forEach(addOnsEl =>{
    addOnsEl.querySelector("input")
        .addEventListener('click',()=>handleAddOnsClick(addOnsEl))
} )
export const stepObject = {
    stepElement: step,
    isValid,
};
