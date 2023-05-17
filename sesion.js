const wrapper__Area = document.querySelector('#wrapper_Area');

const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');

const allLoginFormFields = Array.from(document.querySelectorAll('#loginForm .input__group .field input'));
const allSignUpFormFields = Array.from(document.querySelectorAll('#signUpForm .input__group:not(.confirm__group) .field input'));

const passwordField = document.querySelector('#signUpPassword');
const confirmPassword = document.querySelector('#signUpConfirmPassword');

const loginFormSubmitBtn = document.querySelector('#loginSubmitBtn');
const signUpFormSubmitBtn = document.querySelector('#signUpSubmitBtn');

const showHidePassDom = Array.from(document.querySelectorAll('.showHide__Icon i'));

const patterns = {
  username: /^[a-z]+\d?/,
  email: /^[^\W\d\.-_]+\w\d?@[a-z0-9]+\.([a-z0-9]{2,6})(\.[a-z0-9]{2,6})?$/,
  password: /^[^\d\W]\w+\d?\W?\w?/i,
};

const aside__Area = document.querySelector('#aside_Area');

const aside__SignUp_Button = document.querySelector('#aside_signUp_Btn');
const aside__SignIn_Button = document.querySelector('#aside_signIn_Btn');


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loginFormValidation();
});
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  signUpFormValidation();
});

aside__Area.addEventListener('click', chnageFormMode);
aside__Area.addEventListener('click', chnageFormMode);


function chnageFormMode(e) {
  if(e.target === aside__SignUp_Button){
    wrapper__Area.classList.add('sign-up__Mode-active');
  };
  if(e.target === aside__SignIn_Button){
    wrapper__Area.classList.remove('sign-up__Mode-active');
  };
};

(function showHidePass() {
  showHidePassDom.forEach(icon =>{
    icon.addEventListener('click', () => {
      const targetAreaInput = icon.parentElement.parentElement.querySelector('.field input');
      if(icon.className === 'bx bx-hide'){
        icon.className = 'bx bx-show';
        targetAreaInput.setAttribute('type', 'text');
      }else{
        icon.className = 'bx bx-hide';
        targetAreaInput.setAttribute('type', 'password');
      };
    });
  });
})();

function loginFormValidation() {
  allLoginFormFields.forEach(input => {
    const inputAttribueValueName = input.attributes.name.value;
    const inputValue = input.value.trim();
    const inputRegex = patterns[inputAttribueValueName].test(inputValue);

    if(inputValue === ''){
      setErrorFor(input, `${inputAttribueValueName} requerido. Por favor ingresa un valor en este campo.`);
    }else if(inputRegex === false){
      setErrorFor(input, `${inputAttribueValueName} Valor Inválido.`);
    }else{
      setSuccessFor(input);
    };
  });
};

function signUpFormValidation() {
  allSignUpFormFields.forEach(input => {
    const passwordFieldValue = passwordField.value.trim();
    const conifrmPassValue = confirmPassword.value.trim();
    const inputAttribueValueName = input.attributes.name.value;
    const inputValue = input.value.trim();
    const inputRegex = patterns[inputAttribueValueName].test(inputValue);
    if(inputValue === ''){
      setErrorFor(input, `${inputAttribueValueName}  requerido. Por favor ingresa un valor en este campo.`);
    }else if(inputRegex === false){
      setErrorFor(input, `${inputAttribueValueName} Valor Inválido.`);
    }else{
      setSuccessFor(input);
    };
    if(conifrmPassValue === ''){
      setErrorFor(confirmPassword, `Se requiere que confirme la contraseña. Por favor ingresa un valor en este campo.`);
    }else if(conifrmPassValue !== passwordFieldValue){
      setErrorFor(confirmPassword, `La confirmación de contraseña no coincide`);
    }else{
      setSuccessFor(confirmPassword);
    };

  });
};
function setErrorFor(input, message){
  const targetParentInput = input.parentElement.parentElement;
  const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

  targetParentInput.classList.remove('formSuccess');
  targetParentInput.classList.add('formError');
  targetErrorMessage.innerHTML = message;
};
function setSuccessFor(input){
  const targetParentInput = input.parentElement.parentElement;
  const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

  targetParentInput.classList.remove('formError');
  targetParentInput.classList.add('formSuccess');
  targetErrorMessage.innerHTML = '';
};