

export const LOGIN_SIGNUP_SELECTORS = {
  loginEmail: '[data-qa="login-email"]',
  loginPassword: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
  nameField: '[data-qa="signup-name"]',
  emailField: '[data-qa="signup-email"]',
  signUpButton: '[data-qa="signup-button"]',
  email_password_incorrect: '#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p'

};

export const SIGNUP_SELECTORS = {
  nameField: '#name',
  emailField: '#email',
  mrRadioButton: '#id_gender1',
  mrsRadioButton: '#uniform-id_gender2',
  passwordField: '#password',
  firstNameField: '#first_name',
  lastNameField: '#last_name',
  comapanyField: '#company',
  addressField: '#address1',
  address2Field: '#address2',
  countryField: '#country',
  stateField: '#state',
  cityField: '#city',
  zipcodeField: '#zipcode',
  mobileNumberField: '#mobile_number',
  createAccountButton: 'button.btn:nth-child(22)',
  daySelectorField: '#days',
  monthSelecterField: '#months',
  yearselectorfield: '#uniform-years',
  continueButton: 'a.btn'

};

export const NAV_LINK_SELECTORS = {
  homePage: 'a[href="/"]',
  productPage: 'a[href="/products"]',
  cartPage: 'a[href="/view_cart"]',
  signupLoginPage: 'a[href="/login"]',
  logout: 'a[href="/logout"]',
  delete_account: 'a[href="/delete_account"]'

};

export const PRODUCTS_SELECTORS = {
  searchProduct: '#search_product',
  searchButton: '#submit_search',
  detailButton: 'a[href="/product_details"]',
  productCard: '.productinfo',
  categoryWomen: 'a[href="#Women"]',
  categroyWomen_dress: 'a[href="/category_products/1"]',
  categoryMen: 'a[href="#Men"]',
  categroyMen_tshirts: 'a[href="/category_products/3"]',
  categoryKid: 'a[href="#Kids"]',
  categroyKid_dress: 'a[href="/category_products/4"]',
  breadCrumb: '.breadcrumbs',
  productWrapper: '.product-image-wrapper',
  viewProduct: 'a[href^="/product_details/"]',
  listProductName: '.productinfo p',
  listProductPrice: '.productinfo h2',
  detailProductName: '.product-information h2',
  detailProductPrice: '.product-information span span',
  detailProductAvailability: '.product-information p',
  addtoCart: '[data-product-id]',
  continueShopingButton: 'btn btn-success close-modal btn-block',
  productPrice: ' .overlay-content > h2',
  confirmationModal: '.modal-content',
  cartModal: '#cartModal'




}

export const CART_SELECTORS = {
  rowsSelector: 'tbody tr',
  quantitySelector: 'tbody .cart_quantity',
  priceSelector: '.cart_total_price',
  firstRowPrice: 'td.cart_price p',
  deleteProductSelector: '.cart_quantity_delete',
  proceedCheckout: '.check_out',
  placeOrder: 'a[href="/payment"]',
  nameOnCard: '[data-qa="name-on-card"]',
  cardNumber: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  expiryMonth: '[data-qa="expiry-month"]',
  expiryYear: '[data-qa="expiry-year"]',
  payButton: '[data-qa="pay-button"]',
  billingAddress: '#address_invoice li',
  deliveryAddress: '#address_delivery li',
  placedorder:'[data-qa="order-placed"]',
  placedorderContinuebutton:'[data-qa="continue-button"]'

}