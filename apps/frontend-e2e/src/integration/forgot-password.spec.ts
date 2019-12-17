describe('Test redirect for non-logged in users', () => {
  beforeEach(() => cy.visit('/forgot-password'));

  it('should display forgot password form', () => {
    const form = cy.get('form');
    form.get('input[name=email]').should('have.length', 1);
    form.get('button').should('have.length', 1);
  });

  it('should find disabled button, because email input field is empty by default', () => {
    const loginButton = cy.get('form button');

    loginButton.should('be.disabled');
  });

  it('should find not disabled button, because email input field is set', () => {
    cy.get('input[name="email"]').type('test@example.org');

    cy.get('form button').should('not.be.disabled');
  });
});
