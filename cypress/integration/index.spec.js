describe('Index page', () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`);
    cy.visit('/');
  });
  it('display page title', () => {
    cy.get('[data-cy=heading]').should('contain', 'Home');
    cy.get('[data-cy=heading]').should('be.visible');
  });
});
