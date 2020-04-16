const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2= document.getElementById('password2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';  
}
// Check email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }
// Check required fields
function checkRequired(inputArray) {
    inputArray.forEach(function(input){
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// Check input length
function checkLenght(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`) 
    } else {
        showSuccess(input);
    }
}

// check password matches
function checkPassword(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords must match')
    } 
}
// Cut out first letter in input and make it uppercase and take the rest minus the first letter in normal case
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLenght(username, 2, 15);
    checkLenght(password, 6, 25);
    checkEmail(email);
    checkPassword(password, password2);
});