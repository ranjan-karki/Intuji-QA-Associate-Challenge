
import { savedUserData, userData } from "../support/dataGenerator";
import { LOGIN_SIGNUP_SELECTORS } from "../support/selectors";


describe('Signup Form Scenarios', () => {

  let user;

  before(() => {
    user = savedUserData();
    cy.writeFile('cypress/fixtures/user.json', user); //seting user values
  });


  beforeEach(() => {
    cy.visit('/login');
  });


  it('should take to signUp page', () => {
    cy.get(LOGIN_SIGNUP_SELECTORS.nameField).type(user.firstName);
    cy.get(LOGIN_SIGNUP_SELECTORS.emailField).type(user.email);
    cy.get(LOGIN_SIGNUP_SELECTORS.signUpButton).click();

    //Assert the signup page
    cy.url().should('include', '/signup');

    //Assert the page heading
    cy.contains('Enter Account Information').should('be.visible');

  });

  it('should show error for invalid email', () => {

    cy.get(LOGIN_SIGNUP_SELECTORS.nameField).type(user.firstName);
    cy.get(LOGIN_SIGNUP_SELECTORS.emailField).type(user.lastName);
    cy.get(LOGIN_SIGNUP_SELECTORS.signUpButton).click();

    //assert invalid email error response browser wise
    cy.get(LOGIN_SIGNUP_SELECTORS.emailField)
      .invoke('prop', 'validationMessage')
      .then((msg) => {
        if (Cypress.browser.name === 'chrome' || Cypress.browser.name === 'edge') {
          expect(msg).to.contain(`Please include an '@' in the email address`);
          expect(msg).to.contain(user.lastName);
        } else if (Cypress.browser.name === 'firefox') {
          expect(msg).to.contain(`Please enter an email address`);
        } else {
          // fallback for unknown browsers
          expect(msg).to.contain('@');
        }
      });
  });

  it('should show error for empty fields', () => {

    cy.get(LOGIN_SIGNUP_SELECTORS.signUpButton).click();

    //Assert empty field error response
    cy.get(LOGIN_SIGNUP_SELECTORS.nameField)
      .invoke('prop', 'validationMessage')
      .should('equal', `Please fill out this field.`);

  });
});
