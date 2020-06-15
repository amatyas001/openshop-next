describe('Index page', () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`);
    cy.visit('/');
  });

  it('should display navigation', () => {
    cy.get('[data-cy=nav-container]').should('be.visible');
    cy.get('[data-cy=nav-navbar] > ul > li').should(($lis) => {
      expect($lis, 'list items').to.have.length(3);
      expect($lis.eq(0), 'home').to.contain('home');
      expect($lis.eq(1), 'featured').to.contain('featured');
      expect($lis.eq(2), 'browse').to.contain('browse');
    });
  });

  it('should display header image', () => {
    cy.get('[data-cy=header-img]').should('be.visible');
  });
});
