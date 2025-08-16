
import { savedUserData, userData } from "../support/dataGenerator";
import { LOGIN_SIGNUP_SELECTORS } from "../support/selectors";
import registeredUser from '../fixtures/registeredUser.json';
import { NAV_LINK_SELECTORS } from "../support/selectors";


describe('Login Form Scenarios', () => {
    
    before(() => {
      const newUser = savedUserData();  // this returns the user object
      Cypress.env('registeredUser', newUser);  // store in env
      cy.writeFile('cypress/fixtures/user.json', newUser); // optional
    });
    
    
  
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should show error for invalid email', () => {
      const user = Cypress.env('registeredUser');

    
        cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(user.firstName);
        cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(user.lastName);
        cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();

        //assert invalid email error response browser wise
        cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail)
        .invoke('prop', 'validationMessage')
        .then((msg) => {
          if (Cypress.browser.name === 'chrome' || Cypress.browser.name === 'edge') {
            expect(msg).to.contain(`Please include an '@' in the email address`);
            expect(msg).to.contain(user.firstName);
          } else if (Cypress.browser.name === 'firefox') {
            expect(msg).to.contain(`Please enter an email address`);
          } else {
            // fallback for unknown browsers
            expect(msg).to.contain('@');
          }
        });
    });

     it('should show error for non registred email', () => {
      const user = Cypress.env('registeredUser');

      cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(user.email);
      cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(user.password);
      cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();

      //asserting non registered user login

      cy.get('body').should('contain.text','Your email or password is incorrect!');
        
    });


  
    it('should show error for empty fields', () => {
      const user = Cypress.env('registeredUser');


        cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();

        //Assert empty field error response
        cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail)
            .invoke('prop', 'validationMessage')
            .should('equal', `Please fill out this field.`);
        
    });

    it('should login into the system', () => {
     


      cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(registeredUser.registeredEmail);
      cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(registeredUser.registeredPassword);
      cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();

       //asserting user is logged in

       cy.url().should('include','/');

      cy.get(NAV_LINK_SELECTORS.logout) .should('be.visible') 
         .and('not.be.disabled'); 
        
       cy.get(NAV_LINK_SELECTORS.delete_account) .should('be.visible')
          .and('not.be.disabled');
        
    });



  })