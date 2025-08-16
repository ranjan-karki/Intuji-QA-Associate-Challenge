
import { savedUserData, userData } from "../support/dataGenerator";
import { LOGIN_SIGNUP_SELECTORS } from "../support/selectors";
import { SIGNUP_SELECTORS } from "../support/selectors";
import { NAV_LINK_SELECTORS } from "../support/selectors";


describe('user registration scenarios ', () => {

  let user;

  before(() => {
    user = savedUserData();
    
  })

  beforeEach(() => {
    cy.visit('/login');

    cy.get(LOGIN_SIGNUP_SELECTORS.nameField).type(user.firstName);
    cy.get(LOGIN_SIGNUP_SELECTORS.emailField).type(user.email);
    cy.get(LOGIN_SIGNUP_SELECTORS.signUpButton).click();

  });

  it('Should show name, email and email field disabled, ', () => {

    //asserting name and email prefield and are disabled
    cy.get(SIGNUP_SELECTORS.nameField).should('have.value',user.firstName);
    cy.get(SIGNUP_SELECTORS.emailField).should('have.value',user.email);
    cy.get(SIGNUP_SELECTORS.nameField).should('not.be.disabled');
    cy.get(SIGNUP_SELECTORS.emailField).should('be.disabled'); 
  });
  it('Should show error on clicked with empty fields', ()=>{

    cy.get(SIGNUP_SELECTORS.createAccountButton).click();

    //Asserting error response for empty fields
    cy.get(SIGNUP_SELECTORS.passwordField)
            .invoke('prop', 'validationMessage')
            .should('equal', `Please fill out this field.`);
  })

  it('should register user',()=>{
    cy.get(SIGNUP_SELECTORS.passwordField).type(user.password);
    cy.get(SIGNUP_SELECTORS.daySelectorField).type(user.day);
    cy.get(SIGNUP_SELECTORS.monthSelecterField).type(user.day);
    cy.get(SIGNUP_SELECTORS.yearselectorfield).type(user.day);
    cy.get(SIGNUP_SELECTORS.firstNameField).type(user.day);
    cy.get(SIGNUP_SELECTORS.lastNameField).type(user.day);
    cy.get(SIGNUP_SELECTORS.comapanyField).type(user.day);
    cy.get(SIGNUP_SELECTORS.addressField).type(user.day);
    cy.get(SIGNUP_SELECTORS.address2Field).type(user.day);
    cy.get(SIGNUP_SELECTORS.countryField).type(user.day);
    cy.get(SIGNUP_SELECTORS.stateField).type(user.state);
    cy.get(SIGNUP_SELECTORS.cityField).type(user.city);
    cy.get(SIGNUP_SELECTORS.zipcodeField).type(user.zipcode);
    cy.get(SIGNUP_SELECTORS.mobileNumberField).type(user.mobilenumber);
    cy.get(SIGNUP_SELECTORS.createAccountButton).click();

    cy.contains('Account Created!').should('exist');
    cy.wait(2000);
    cy.get(SIGNUP_SELECTORS.continueButton).click();

    //asserting user is directed back to home page
      cy.url().should('include','/');

      cy.writeFile('cypress/fixtures/registeredUser.json', {
        registeredEmail:user.email,
        registeredPassword: user.password
      });

      //asserting user is logged in
      cy.get(NAV_LINK_SELECTORS.logout) .should('be.visible') 
    .and('not.be.disabled'); 

    cy.get(NAV_LINK_SELECTORS.delete_account) .should('be.visible')
    .and('not.be.disabled');

  });
 
})