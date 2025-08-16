// import user from '../fixtures/registeredUser.json';  
// import { LOGIN_SIGNUP_SELECTORS } from './selectors';

// //Function login
// function login() {
//   cy.get(LOGIN_SIGNUP_SELECTORS.loginEmail).type(user.registeredEmail);
//   cy.get(LOGIN_SIGNUP_SELECTORS.loginPassword).type(user.registeredPassword);
//   cy.get(LOGIN_SIGNUP_SELECTORS.loginButton).click();
// }

// // preserve session & cookies, re-login if expired
// export function preserveUserSession() {
//   cy.session( 'user', () => {
//       cy.visit('/login');
//       login();
//     },
//     {
//       validate: () => {
//         cy.request('/api/me').its('status').should('eq', 200); 
//       }
//     }
//   );
// }
