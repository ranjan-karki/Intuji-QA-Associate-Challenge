describe('Lunch autimation exercise app', () => {
  it('passes', () => {
    cy.visit('https://automationexercise.com/')
    cy.get("#slider-carousel > div > div.item.active > div:nth-child(1) > h1").contains("AutomationExercise")

  })
})