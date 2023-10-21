const nameInputEl = document.getElementById('nameInput')
const emailInputEl = document.getElementById('emailInput')
const phoneInputEl = document.getElementById('phoneInput')

const step = document.getElementById('step1')

function isValid(){
    return nameInputEl.checkValidity() && emailInputEl.checkValidity() && phoneInputEl.checkValidity()
}

export const stepObject = {
    stepElement:step,
    isValid
}

