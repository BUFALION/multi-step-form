import {MAXSTEP} from "./constants.js";

const btnNext = document.querySelector('.btn-next')
const btnBack = document.querySelector('.btn-back')
const currentStepEls = document.querySelectorAll('.step-label')

const btnNextTexts = {
    default: 'Next Step',
    final: 'Отправить',
};

let steps = []
let currentStepId = 2;

export const joinForm = (externalSteps) =>{
    steps = externalSteps
    updateUI();
}
function updateUI() {

    btnNext.textContent = currentStepId >= MAXSTEP ? btnNextTexts.final : btnNextTexts.default;
    btnBack.style.display = currentStepId === 1 || MAXSTEP === currentStepId? 'none' : 'block';
    btnNext.style.display = MAXSTEP === currentStepId? 'none' : 'block';

    document.querySelector('.step--active').classList.remove('step--active')
    currentStepEls[currentStepId-1].classList.add('step--active')

    steps[currentStepId]['stepElement'].classList.remove('hidden')
}

function nextStep(step) {
    if (step === -1 || ( steps[currentStepId].isValid())) {
        steps[currentStepId]['stepElement'].classList.add('hidden')

        currentStepId += step;
        updateUI();
    }

}
export function moveToStep(stepId){

    steps[currentStepId]['stepElement'].classList.add('hidden')
    currentStepId = stepId;
    updateUI();

}
btnNext.addEventListener('click', () => nextStep(1));
btnBack.addEventListener('click', () => nextStep(-1));


