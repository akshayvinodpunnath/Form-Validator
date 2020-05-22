const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show input success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check Email Entered
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid');
    }
}

//Check Required Fields
function checkRequiredField(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    })
}

//Check Length of input field
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
}

//Return input.id in with first character in uppercase
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Validate password
function checkPasswordsMatch(inputPassword, confirmPassword) {
    if (inputPassword.value !== confirmPassword.value) {
        showError(confirmPassword, `Passwords not matching`)
    }
}

//Form addEventListener on submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Array of inputs passed
    checkRequiredField([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})