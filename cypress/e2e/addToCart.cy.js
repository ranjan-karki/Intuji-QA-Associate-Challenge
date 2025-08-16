import { PRODUCTS_SELECTORS } from "../support/selectors";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Add to cart scenaros', () => {

  beforeEach(() => {
    cy.loginWithSession();
    cy.visit('/products');
  });

  it('should add products to cart', ()=>{

// Women Dress
cy.get(PRODUCTS_SELECTORS.categoryWomen).click({timeout:1000});;
cy.get(PRODUCTS_SELECTORS.categroyWomen_dress).click();
let womenDressPrice;
cy.get(PRODUCTS_SELECTORS.listProductPrice).first().invoke('text').then((text) => {
   const womenDressPrice = text.trim();
   cy.log('this is the dress price '+ womenDressPrice);
    
  });
  
cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();


cy.get('.modal-content').should('be.visible').within(() => {
  cy.contains('Your product has been added to cart.').should('be.visible');
  cy.get('button.btn.btn-success.close-modal.btn-block').click();
});

// // Men T-Shirt
// cy.get(PRODUCTS_SELECTORS.categoryMen).click({timeout:1000});;
// cy.get(PRODUCTS_SELECTORS.categroyMen_tshirts).click();
// cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();


// cy.get('.modal-content').should('be.visible').within(() => {
//   cy.contains('Your product has been added to cart.').should('be.visible');
//   cy.get('button.btn.btn-success.close-modal.btn-block').click();
// });

// // Kid Dress
// cy.get(PRODUCTS_SELECTORS.categoryKid).click({timeout:1000});
// cy.get(PRODUCTS_SELECTORS.categroyKid_dress).click();
// cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();

// cy.get('.modal-content').should('be.visible').within(() => {
//   cy.contains('Your product has been added to cart.').should('be.visible');
//   cy.get('button.btn.btn-success.close-modal.btn-block').click();
// });


  })
})