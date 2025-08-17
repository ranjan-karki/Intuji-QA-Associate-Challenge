import { faker } from "@faker-js/faker";


//data generator form fakerjs
function _generateUserData() {
  const yearsAgo = faker.number.int({ min: 20, max: 30 })

  const date = faker.date.past({ years: yearsAgo });

  return {


    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobilenumber: faker.phone.number(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

//Function- generates user data and saves to file
export function savedUserData() {
  const user = _generateUserData();
  cy.writeFile('cypress/fixtures/usersData.json', user);
  return user;
}

//funtion- generate user - will not save
export function userData() {
  return _generateUserData();
};

export function generateCardDetails() {
  // Cardholder name
  const nameOnCard = faker.person.fullName();

  // Card types
  const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];
  const cardType = faker.helpers.arrayElement(cardTypes);

  // Card number based on type
  let cardNumber;
  switch (cardType) {
    case 'Visa':
      cardNumber = faker.finance.creditCardNumber({ issuer: 'visa' });
      break;
    case 'MasterCard':
      cardNumber = faker.finance.creditCardNumber({ issuer: 'mastercard' });
      break;
    case 'American Express':
      cardNumber = faker.finance.creditCardNumber({ issuer: 'americanexpress' });
      break;
    case 'Discover':
      cardNumber = faker.finance.creditCardNumber({ issuer: 'discover' });
      break;
  }

  // CVV (Amex has 4, others 3)
  const cvc = cardType === 'American Express'
    ? faker.string.numeric(4)
    : faker.string.numeric(3);

  // Expiry month and year
  const expiryMonth = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
  const expiryYear = String(faker.number.int({ min: 2025, max: 2030 }));

  // Log card object in Cypress for debugging
  const card = {
    nameOnCard,
    cardNumber,
    cvc,
    expiryMonth,
    expiryYear,
    cardType
  };

  // Log to Cypress runner (safe to stringify)
  if (typeof cy !== 'undefined') {
    cy.log(JSON.stringify(card));
  }

  return card;
}
