import { CART_SELECTORS } from "./selectors";
import { PRODUCTS_SELECTORS } from "./selectors";

export function clearCart() {
    cy.visit('/view_cart');
    cy.get(CART_SELECTORS.rowsSelector).then(($rows) => {
        if ($rows.length > 0) {
            cy.wrap($rows).each(($row) => {
                cy.wrap($row).find('.cart_quantity_delete').click();
            });
        }
    });
    cy.get(CART_SELECTORS.rowsSelector).should('have.length', 0);
}


//clicks category
export function clickCategory(categorySelector) {
    cy.get(categorySelector).click({ timeout: 1000 });
}
//clicks subcategory
export function clickSubCategory(subCategorySelector) {
    cy.get(subCategorySelector).should('be.visible').click();
}
//clicks on add to cart
export function addFirstProductToCart() {
    cy.get(PRODUCTS_SELECTORS.addtoCart).first().click();
}

//call above helpe function at once when required
export function addProductsFromCategory(categorySelector, subCategorySelector) {
    clickCategory(categorySelector);
    clickSubCategory(subCategorySelector);
    addFirstProductToCart();
}
