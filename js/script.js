/*****************GLOBAL SCOPE ***********************/

const nameInput = document.querySelector('input[type="text"]');
const selectJob = document.querySelector("#title");
const otherJob = document.querySelector('#other-job-role');
const designElement = document.querySelector('#design');
const colorElement = document.querySelector('#color');
const RegisteredField = document.getElementById('activities');
const itemCost = document.getElementById('activities-cost');
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const emailInput = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvInput = document.getElementById('cvv');
const formElement = document.querySelector('form');
const checkBox = document.querySelectorAll('input[type=checkbox]');

/*auto focus on Name input*/
nameInput.focus();

/*********Job-Role**********/

/*hide other job role by difault*/

otherJob.style.display = 'none';

/* Event Listener to toggle Other Role input field on request*/

selectJob.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
});


/********** "T-Shirt Info" section ********* */

const colorOptions = colorElement.children;

colorElement.disabled = true; //color element disabled by default

// Event listener for changes in T-Shirt info
designElement.addEventListener('change', e => {
    //Enable color selection after Design is selected
    colorElement.disabled = false;

    //Loops through colors selecting only specific design colors
    //Auto select a color from the Design specific color for placeholder
    for (let i = 0; i < colorElement.length; i++) {
        const value = e.target.value;
        const dataTheme = colorOptions[i].getAttribute("data-theme");

        if (value == dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].selected = true;

        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
        }


    }
});


/******************* "Register for Activities" section************************* */

let totalCost = 0;


RegisteredField.addEventListener('change', e => {
    const selectedData = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += selectedData;
    } else {
        totalCost -= selectedData;
    }
    itemCost.innerHTML = `Total: $${totalCost}`;
})


/************* "Payment Info" section***************** */

payPal.style.display = 'none';  //hides option by default 
bitCoin.style.display = 'none'; // hide option by default

/*Listens to changes in the payment method
 automatically switches to payment type selected */
paymentMethod.addEventListener('change', e => {
    if (e.target.value === 'paypal') {
        creditCard.style.display = 'none';
        bitCoin.style.display = 'none';
        payPal.style.display = 'block';
    } else if (e.target.value === 'bitcoin') {
        creditCard.style.display = 'none';
        bitCoin.style.display = 'block';
        payPal.style.display = 'none';
    } else {
        creditCard.style.display = 'block';
        payPal.style.display = 'none';
        bitCoin.style.display = 'none';
    }

});

/**********************Form Validation*************************** */


formElement.addEventListener("submit", e => {
    /**Listens to name input value */
    const regexName = /^[a-zA-Z ]{1,30}$/.test(nameInput.value);
    if (!regexName) {
        e.preventDefault();
        nameInput.style.borderColor = 'red';
    }

    /**listens to email input value */
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailInput.value);
    if (!regexEmail) {
        e.preventDefault();
        emailInput.style.borderColor = 'red';
    }

    /**listens to selected activity */
    if (!totalCost) {
        e.preventDefault();
        alert('Select at least one activity');
    }

    /**listens to payment method */
    if (creditCard) {
        const regexCardNum = /^\d{13,16}$/.test(cardNumber.value);
        const regexZip = /^\d{5}$/.test(zipCode.value);
        const regexCvv = /^\d{3}$/.test(cvInput.value);

        if (!regexCardNum) {
            e.preventDefault();                     //validates card number 
            isNotValid(cardNumber);                 //calls 'isNotValid' function if not valid
        } else {
            isValid(cardNumber);                //calls 'isValid' function if  valid
        }

        if (!regexZip) {
            e.preventDefault();                //validates zip code 
            isNotValid(zipCode);               //calls 'isNotValid' function if not valid
        } else {
            isValid(zipCode);              //calls 'isValid' function if  valid
        }

        if (!regexCvv) {
            e.preventDefault();                //validates cvv number 
            isNotValid(cvInput);               //calls 'isNotValid' function if not valid
        } else {
            isValid(cvInput);             //calls 'isValid' function if valid
        }
    }
})



/************************Accessibility****************************/

for (let i = 0; i < checkBox.length; i++) {

    checkBox[i].addEventListener('focus', e => {               // Apply "focus" class when element is in focus    
        checkBox[i].parentElement.classList.add('focus');
    })

    checkBox[i].addEventListener('blur', e => {                   // Remove "focus" class on blur
        checkBox[i].parentElement.classList.remove('focus');
    })



}


/*********************VALIDATION FUNCTIONS********************************* */


function isNotValid(arr) {
    let targetElement = arr.parentElement;
    targetElement.classList.add('not-valid');
    targetElement.classList.remove('valid');

    targetElement.lastElementChild.style.display = 'block';
}


function isValid(arr) {
    let targetElement = arr.parentElement;
    targetElement.classList.remove('not-valid');
    targetElement.classList.add('valid');

    targetElement.lastElementChild.style.display = 'none';
}