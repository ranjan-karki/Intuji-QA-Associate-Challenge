import { faker } from '@faker-js/faker';

//date generator form fakerjs
function _generateUserData() {
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
    phoneNumber: faker.phone.number()
  };
}

//Function- generates user data and saves to file
export function savedUserData (){
    const user= _generateUserData();
    cy.writeFile('cypress/fixtures/usersData.json',user);
    return user; 
}

//funtion- generate user - will not save
export function userData(){
    return _generateUserData();
}