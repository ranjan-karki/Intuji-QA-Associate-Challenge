

export const LOGIN_SIGNUP_SELECTORS = {
    loginEmail:'.login-form > form:nth-child(2) > input:nth-child(2)',
    loginPassword:'.login-form > form:nth-child(2) > input:nth-child(3)',
    loginButton:'button.btn:nth-child(4)',
    nameField: '#form > div > div > div:nth-child(3) > div > form > input[type=text]:nth-child(2)',
    emailField: '#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)',
    signUpButton:'#form > div > div > div:nth-child(3) > div > form > button'

  };

export const SIGNUP_SELECTORS={
  nameField:'#name',
  emailField:'#email',
  mrRadioButton:'#id_gender1',
  mrsRadioButton:'#uniform-id_gender2',
  passwordField:'#password',
  firstNameField:'#first_name',
  lastNameField:'#last_name',
  comapanyField:'#company',
  addressField:'#address1',
  address2Field:'#address2',
  countryField:'#country',
  stateField:'#state',
  cityField:'#city',
  zipcodeField:'#zipcode',
  mobileNumberField:'#mobile_number',
createAccountButton:'button.btn:nth-child(22)',
daySelectorField:'#days',
monthSelecterField:'#months',
yearselectorfield:'#uniform-years',
continueButton:'a.btn'

};


export const NAV_LINK_SELECTORS={
homePage:'a[href="/"]',
productPage:'a[href="/priducts"]',
cartPage:'a[href="/view_cart"]',
signupLoginPage:'a[href="/login"]',
logout:'a[href="/logout"]'


};