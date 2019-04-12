// https://docs.cypress.io/api/introduction/api.html

describe('Scanner test', () => {
  it('Scanner page should load', () => {
    cy.visit('/')
    cy.contains('#start-scan', 'Scan QR')
  })
})
