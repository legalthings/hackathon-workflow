// https://docs.cypress.io/api/introduction/api.html

describe('Scanner test', () => {
  it('Scanner page should load', () => {
    cy.visit('/')
    cy.get('[data-cy=logo]').should('exist')
    cy.get('[data-cy=qr-cam-stream]').should('not.exist')
  })
  it('Scanner should open and close', () => {
    cy.visit('/')
    cy.get('[data-cy=start-scan-button]').click()
    cy.get('[data-cy=qr-cam-stream]').should('exist')
    cy.get('[data-cy=stop-scan-button]').click()
    cy.get('[data-cy=qr-cam-stream]').should('not.exist')
  })
})
