
import { PRODUCTS_SELECTORS } from "../support/selectors";

describe('Products scenarios ', () => {

  beforeEach(() => {
    cy.loginWithSession(); //session call
    cy.visit('/products');
    
  });

  it('should go to products page', () => {
    
    //asserting user is guided to products page
    cy.url().should('include', '/products');

  });

  it('Should have a product key:sky', () => {

    cy.get(PRODUCTS_SELECTORS.searchProduct).type('Sky');
    cy.get(PRODUCTS_SELECTORS.searchButton).click();

    //asserting 
    cy.get(PRODUCTS_SELECTORS.productCard).should('contain.text', 'Sky');

    cy.wait(1500);
    cy.get(PRODUCTS_SELECTORS.searchProduct).clear();
    cy.get(PRODUCTS_SELECTORS.searchButton).click();


  });

  it('should filter products by women-dress',() =>{

    cy.get(PRODUCTS_SELECTORS.categoryWomen).click();
    cy.wait(500)
    cy.get(PRODUCTS_SELECTORS.categryWomen_dress).click();

    //asserting bradcrumbs
    cy.get(PRODUCTS_SELECTORS.breadCrumb).should('be.visible')

    // Get products
    cy.get('.product-image-wrapper').each(($item) => {

      // asserting keyword 
      cy.wrap($item).find('p').should('contain.text', 'Dress');
      });
  });

  
});