describe('Test Register component', () => {
  const testUser = {
    email: 'test1@example.org',
    password: 'test',
  };

  beforeEach(() => cy.visit('/register'));

  it('should display register form', () => {
    const form = cy.get('form');
    form.get('input[name=email]').should('have.length', 1);
    form.get('input[name=password]').should('have.length', 1);
    form.get('button').should('have.length', 1);
  });

  it('should find disabled button, because input fields are empty by default', () => {
    const registerButton = cy.get('form button');

    registerButton.should('be.disabled');
  });

  it('should find not disabled button, because input fields are set', () => {
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('form button').should('not.be.disabled');
  });

  it('should register, then login user automatically, and navigate to the home page', () => {
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('form button').click();
    cy.location('href').should('not.include', '/register');
  });
});
