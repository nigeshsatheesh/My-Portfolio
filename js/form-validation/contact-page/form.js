emailjs.init({
    publicKey: "XNz7XvPwkD7NKtkmQ"
})

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const subjectInput = document.getElementById("subject");
const subjectError = document.getElementById("subject-error");
const submitButton = document.getElementById("submit-button");
const messageInput = document.getElementById("message");
const messageError = document.getElementById("message-error");
const formError = document.getElementById("form-error");

function nameValidation(){
    const nameValue = nameInput.value.trim();
    if(nameValue === "" ){
        nameError.textContent = "Please enter your name";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function emailValidation(){
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailValue === ""){
        emailError.textContent = "Please enter your mail Id";
        return false;
    }
    else if(!emailPattern.test(emailValue)){
        emailError.textContent = "Please enter a valid mail Id";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function subjectValidation(){
    const subjectValue = subjectInput.value.trim();
    if(subjectValue === ""){
        subjectError.textContent = "Please enter the subject";
        return false;
    }
    subjectError.textContent = ""
    return true;
}

function messageValidation(){
    const messageValue = messageInput.value.trim();
    if(messageValue === ""){
        messageError.textContent = "Please enter some message";
        return false;
    }
    messageError.textContent = "";
    return true;
}

function validateForm(){
    const isNameValidate = nameValidation();
    const isEmailValidate = emailValidation();
    const isSubjectValidate = subjectValidation();
    const isMessageValidate = messageValidation();
    if(isNameValidate && isEmailValidate && isSubjectValidate && isMessageValidate){
        return true;
    }
    return false;
}

async function submitForm(event){
    event.preventDefault();
    const isFormValidate = validateForm();
    if(isFormValidate){
        formError.style.display = "none";
        submitButton.disabled = true;
        submitButton.textContent = "Submitting";

        try{
            await emailjs.sendForm("service_n1p1fp8", "template_mp06p4j", form);

            form.reset();

            submitButton.textContent = "Submitted";

            setTimeout(function(){
                submitButton.textContent = "Submit";
            }, 1000)
        }
        catch(error){
            submitButton.textContent = "Submit";
            formError.textContent = "Something went wrong. Please try again";
            formError.style.display = "block";
        }
        finally{
            submitButton.disabled = false;
        }
    }
}

form.addEventListener("submit", submitForm);