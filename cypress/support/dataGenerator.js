import { faker } from '@faker-js/faker';


//data generator form fakerjs
function _generateUserData() { 
  const yearsAgo = faker.number.int({min:20,max:30})

    const date = faker.date.past({years:yearsAgo});

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
    month:date.getMonth(),
    year: date.getFullYear()
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