
import { CART_SELECTORS, NAV_LINK_SELECTORS, PRODUCTS_SELECTORS } from "../support/selectors";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Add to cart scenaros', () => {
  let prices = []; // stores prices of products added

  function clickCategory(categorySelector) {
    cy.get(categorySelector).click({ timeout: 1000 });
  }

  function clickSubCategory(subCategorySelector) {
    cy.get(subCategorySelector).should('be.visible').click();
  }

  function addFirstProductToCart() {
    cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();
  }

  function addproductsfromEachCategoryAndAssert(categorySelector, subCategorySelector) {
    clickCategory(categorySelector);
    clickSubCategory(subCategorySelector);

    cy.get(PRODUCTS_SELECTORS.productPrice).first().invoke('text').then((text) => {
      const priceNumber = parseInt(text.replace(/[^\d]/g, ''), 10);
      cy.log('The H2 text is: ' + priceNumber);
      prices.push(priceNumber);
      cy.log(prices);
    });

    addFirstProductToCart();

    // Assert that product is added
    cy.get('.modal-content').should('be.visible').within(() => {
      cy.contains('Your product has been added to cart.').should('be.visible');
      cy.get('button.btn.btn-success.close-modal.btn-block').click();
    });
  }

  beforeEach(() => {
    cy.loginWithSession();
    cy.visit('/products');
  });

  it('should have correct total price when added multiple products and removed first product', () => {

    let cartPrices = [];

    // Add products to cart
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryWomen, PRODUCTS_SELECTORS.categroyWomen_dress);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryKid, PRODUCTS_SELECTORS.categroyKid_dress);

    // Go to cart page
    cy.visit('/view_cart');

    // Get price of first row product
    cy.get(CART_SELECTORS.rowsSelector)
      .first()
      .find('.cart_total_price')
      .invoke('text')
      .then((text) => {
        const firstRowPrice = parseInt(text.replace(/[^\d]/g, ''), 10);
        cy.log('First row price:', firstRowPrice);

        // Delete first row product
        cy.get(CART_SELECTORS.rowsSelector)
          .first()
          .find(CART_SELECTORS.deleteProductSelector)
          .click({ force: true });

        cy.log('*****************First row product delete clicked *******************');

        // Removing product
        cy.get(CART_SELECTORS.rowsSelector)
          .first()
          .should('not.contain.text', firstRowPrice.toString());

        // Now collect remaining cart prices
        cy.get(CART_SELECTORS.priceSelector).then(($items) => {
          cartPrices = Cypress.$.makeArray($items).map((item) => {
            return parseInt(item.innerText.replace(/[^\d]/g, ''), 10);
          });

          const totalCartPrice = cartPrices.reduce((acc, val) => acc + val, 0);
          const expectedTotal = prices.reduce((acc, val) => acc + val, 0) - firstRowPrice;

          cy.log('Prices array before removal: ' + prices);
          cy.log('Cart prices after removal: ' + cartPrices);
          cy.log('Expected Total (after removal): ' + expectedTotal);
          cy.log('Cart Total (after removal): ' + totalCartPrice);

          // Assertion: total after removing first product
          expect(totalCartPrice).to.equal(expectedTotal);
        });
      });
  });
});