import { PRODUCTS_SELECTORS } from "../support/selectors";

describe('Products scenarios ', () => {

  beforeEach(() => {
    cy.loginWithSession();
    cy.visit('/products');
  });

  it('should show correct product details', () => {

    cy.get(PRODUCTS_SELECTORS.productWrapper).first().as('firstProduct');
  
    let productName, productPrice;
  
    cy.get('@firstProduct').within(() => {
      cy.get(PRODUCTS_SELECTORS.listProductName).invoke('text').then((text) => {
        productName = text.trim();
      });
  
      cy.get(PRODUCTS_SELECTORS.listProductPrice).invoke('text').then((text) => {
        productPrice = text.trim();
      });
    });
    
    cy.get('@firstProduct').parent().within(() => {
      cy.contains('a', 'View Product').click();
    });

    //asserting detail page url
    cy.url().should('include', '/product_details/');
    
    //asserting product name and price from list to  details page 
    cy.get(PRODUCTS_SELECTORS.detailProductName, { timeout: 10000 }).should(() => {
      expect(productName).to.not.be.undefined;
      expect(Cypress.$(PRODUCTS_SELECTORS.detailProductName).text().trim()).to.include(productName);
    });
  
    cy.get(PRODUCTS_SELECTORS.detailProductPrice).should(() => {
      expect(productPrice).to.not.be.undefined;
      expect(Cypress.$(PRODUCTS_SELECTORS.detailProductPrice).text().trim()).to.include(productPrice);
    });
  
    cy.get(PRODUCTS_SELECTORS.detailProductAvailability).should('contain.text', 'Availability: In Stock');
  });
  

});
