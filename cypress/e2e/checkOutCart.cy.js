import { CART_SELECTORS, NAV_LINK_SELECTORS, PRODUCTS_SELECTORS } from "../support/selectors";
import { generateCardDetails } from "../support/dataGenerator";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Checkout cart scenaros', () => {

    function clickCategory(categorySelector) {
        cy.get(categorySelector).click({ timeout: 1000 });
    }

    function clickSubCategory(subCategorySelector) {
        cy.get(subCategorySelector).should('be.visible').click();
    }

    function addFirstProductToCart() {
        cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();
    }

    function addproductsfromEachCategory(categorySelector, subCategorySelector) {
        clickCategory(categorySelector);
        clickSubCategory(subCategorySelector);
        addFirstProductToCart();

        // Close the modal
        cy.get(PRODUCTS_SELECTORS.confirmationModal).should('be.visible').within(() => {
            cy.get('button.btn.btn-success.close-modal.btn-block').click({ timeout: 1000 });
        });
        // Wait for modal to be hidden (it stays in DOM)
        cy.get(PRODUCTS_SELECTORS.cartModal).should('not.be.visible');
    }

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('/products');
    });

    it('should add products to cart and assert addresses', () => {

        // Add products to cart
        addproductsfromEachCategory(PRODUCTS_SELECTORS.categoryWomen, PRODUCTS_SELECTORS.categroyWomen_dress);
        addproductsfromEachCategory(PRODUCTS_SELECTORS.categoryMen, PRODUCTS_SELECTORS.categroyMen_tshirts);
        addproductsfromEachCategory(PRODUCTS_SELECTORS.categoryKid, PRODUCTS_SELECTORS.categroyKid_dress);

        // Go to cart page
        cy.visit('/view_cart');

        // Proceed to checkout
        cy.get(CART_SELECTORS.proceedCheckout).click();

        // Verify directed checkout page
        cy.url().should('include', '/checkout');

        // asserting Delivery address is filled
        cy.get(CART_SELECTORS.deliveryAddress)
            .should('have.length.greaterThan', 1)
            .each(($li) => {
                cy.wrap($li).invoke('text').should('not.be.empty');
            })
            .then(() => {
                cy.log('-------*****Delivery address block is filled******-------');
            });

        // asserting Billing address is filled 
        cy.get(CART_SELECTORS.billingAddress)
            .should('have.length.greaterThan', 1)
            .each(($li) => {
                cy.wrap($li).invoke('text').should('not.be.empty')
                    .then(() => {
                        cy.log('-------*****Billing address block is filled******-------');
                    });
            });

        // Continue to payment page
        cy.get(CART_SELECTORS.placeOrder).click();
        cy.url().should('include', '/payment').then(() => {
            cy.log('User is in payment page');





        });

        // Generate card data
        const card = generateCardDetails();

        // Fill payment form 
        cy.get(CART_SELECTORS.nameOnCard)
            .type(card.nameOnCard)
            .then(() => {
                cy.log(`Name on Card: ${card.nameOnCard}`);
            });

        cy.get(CART_SELECTORS.cardNumber)
            .type(card.cardNumber)
            .then(() => {
                cy.log(`Card Number: ${card.cardNumber}`);
            });

        cy.get(CART_SELECTORS.cvc)
            .type(card.cvc)
            .then(() => {
                cy.log(`CVC: ${card.cvc}`);
            });

        cy.get(CART_SELECTORS.expiryMonth)
            .type(card.expiryMonth)
            .then(() => {
                cy.log(`Expiry Month: ${card.expiryMonth}`);
            });

        cy.get(CART_SELECTORS.expiryYear)
            .type(card.expiryYear)
            .then(() => {
                cy.log(`Expiry Year: ${card.expiryYear}`);
            });

        // Submit form
        cy.get(CART_SELECTORS.payButton).click();

        // asseriting order is placed
        cy.get(CART_SELECTORS.placedorder)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                cy.log(text.trim());
            });

        // logging ordered placed message
        cy.contains('Congratulations! Your order has been confirmed!')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                cy.log(text.trim());
            });

            cy.get(CART_SELECTORS.placedorderContinuebutton).click();

            cy.url().should('include', '/') .then(()=>{
                cy.log('Reirected to home page after click on continue botton of payment confirmation page')
            });

    });

});


