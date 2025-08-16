
import { NAV_LINK_SELECTORS } from "../support/selectors";

describe('Opened app', () => {
  it('Passes', () => {
    cy.visit('/')
    cy.get('body').should('contain.text', 'AutomationExercise');
    cy.get('body').should('contain.text', 'Features Items');
    cy.contains('Category').should('be.visible');
    cy.contains('Brands').should('exist');

    cy.get(NAV_LINK_SELECTORS.homePage) .should('be.visible')   // element is visible
    .and('not.be.disabled'); //element is not disabled


  })
})