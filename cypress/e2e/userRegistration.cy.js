
import { savedUserData, userData } from "../support/dataGenerator";
import { LOGIN_SIGNUP_SELECTORS } from "../support/selectors";


describe('Open Signup page ', () => {
  it('Passes', () => {
    cy.visit('/login');
    const user = savedUserData();
    cy.get(LOGIN_SIGNUP_SELECTORS.nameField).type(user.firstName);
    cy.get(LOGIN_SIGNUP_SELECTORS.emailField).type(user.email);
    cy.get(LOGIN_SIGNUP_SELECTORS.signUpButton).click();

    //Assert the signup page
    cy.url().should('include','/signup');

    //Assert the page heading
    cy.contains('Enter Account Information').should('be.visible');

   
  })
})