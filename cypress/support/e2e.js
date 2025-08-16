// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

const user = require('../fixtures/registeredUser.json');
import { LOGIN_SIGNUP_SELECTORS } from './selectors';


Cypress.Commands.add('loginWithSession', () => {
  cy.session('user', () => {
    cy.visit('/login');
    cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(user.registeredEmail);
    cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(user.registeredPassword);
    cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();
  });
});
