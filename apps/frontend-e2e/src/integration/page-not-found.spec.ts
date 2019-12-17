describe('Test redirect for non-logged in users', () => {
  it('should show error 404', () => {
    cy.visit('/wrong-path');
    cy.contains('404');
  });
});
