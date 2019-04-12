// https://docs.cypress.io/api/introduction/api.html

describe('Chain test', () => {
  it('Chain page should load', () => {
    cy.visit('/chain/12345')
    cy.contains('#title', 'Your food flow')
  })
})