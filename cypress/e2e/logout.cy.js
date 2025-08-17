
import { LOGIN_SIGNUP_SELECTORS } from "../support/selectors";
import registeredUser from '../fixtures/registeredUser.json';
import { NAV_LINK_SELECTORS } from "../support/selectors";

describe('Logout verification ', () => {

    beforeEach(() => {
        cy.loginWithSession(); //session call
        cy.visit('/products');

    });

    it('should be logged out with session', () => {
        cy.get(NAV_LINK_SELECTORS.logout).click({ timeout: 10000 });

        //signUp/login should be visible
        cy.get(NAV_LINK_SELECTORS.signupLoginPage).should('be.visible').then(() => {
            cy.visit('/login')
        });

        cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(registeredUser.registeredEmail);
        cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(registeredUser.registeredPassword);
        cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();

        //asserting user is logged in

        cy.url().should('include', '/').then(() => {
            cy.log('User is in home page')
        });

        cy.get(NAV_LINK_SELECTORS.logout).should('be.visible')
            .and('not.be.disabled').then(() => {
                cy.log('Logout button appeard')
            });

        cy.get(NAV_LINK_SELECTORS.delete_account).should('be.visible')
            .and('not.be.disabled').then(() => {
                cy.log('deleteaccount is visible')
            });
    })
})