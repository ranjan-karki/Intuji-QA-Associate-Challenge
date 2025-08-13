//import faker
import { faker } from "@faker-js/faker";
const name = faker.person.firstName() + '' + faker.person.lastName();
const email = faker.internet.email();


describe('Lunch autimation exercise app', () => {
  it('Passes', () => {
    cy.visit('https://automationexercise.com/login');
    cy.get('#form > div > div > div:nth-child(3) > div > form > input[type=text]:nth-child(2)').type(name);
    cy.get('#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)').type(email);
    cy.get("#form > div > div > div:nth-child(3) > div > form > button").click();

    //Assert the signup page
    cy.url().should('include','https://automationexercise.com/signup');

    //Assert the page heading
    cy.contains('Enter Account Information').should('be.visible');

   
  })
})