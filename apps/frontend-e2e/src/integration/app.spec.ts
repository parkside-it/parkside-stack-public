describe('Test redirect for non-logged in users', () => {
  it('should redirect to login page because /account is protected', () => {
    cy.visit('/account');
    cy.location('href').should('include', '/login');
  });
});
