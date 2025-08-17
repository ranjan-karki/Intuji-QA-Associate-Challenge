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

  it('should have correct total price when added multiple products', () => {

    let cartPrices = [];

    // Add products to cart
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryWomen, PRODUCTS_SELECTORS.categroyWomen_dress);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
    addproductsfromEachCategoryAndAssert(PRODUCTS_SELECTORS.categoryKid, PRODUCTS_SELECTORS.categroyKid_dress);

    // Go to cart page
    cy.visit('/view_cart');

    // Collect cart prices
    cy.get(CART_SELECTORS.priceSelector).then(($items) => {
      cartPrices = Cypress.$.makeArray($items).map((item) => {
        return parseInt(item.innerText.replace(/[^\d]/g, ''), 10);
      });

      const totalCartPrice = cartPrices.reduce((acc, val) => acc + val, 0);
      const expectedTotal = prices.reduce((acc, val) => acc + val, 0);

      cy.log('Prices array: ' + prices);
      cy.log('Cart prices: ' + cartPrices);
      cy.log('Expected Total: ' + expectedTotal);
      cy.log('Cart Total: ' + totalCartPrice);

      // Assertion: total cart price should match prices array sum
      expect(totalCartPrice).to.equal(expectedTotal);
    });
  });
});
