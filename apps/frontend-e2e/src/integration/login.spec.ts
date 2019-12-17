describe('Test Login component', () => {
  const testUser = {
    email: 'test@example.org',
    password: 'mypass',
  };

  beforeEach(() => cy.visit('/login'));

  it('should display login form', () => {
    const form = cy.get('form');
    form.get('input[name=email]').should('have.length', 1);
    form.get('input[name=password]').should('have.length', 1);
    form.get('button').should('have.length', 1);
  });

  it('should find disabled button, because input fields are empty by default', () => {
    const loginButton = cy.get('form button');

    loginButton.should('be.disabled');
  });

  it('should find not disabled button, because input fields are set', () => {
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);

    cy.get('form button').should('not.be.disabled');
  });

  it('should try to login, but fail because user does not exist', () => {
    cy.get('input[name="email"]').type('doesnotexist@example.org');
    cy.get('input[name="password"]').type('test');
    cy.get('form button').click();

    cy.location('href').should('include', '/login');
  });

  it('should login', () => {
    // make an account
    // TODO: Find a solution to 'prefill' test database instance with an user account,
    // so that no registration is necessary in order to test the login functionality
    cy.visit('/register');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('form button').click(); // this will login the user automatically

    cy.contains('Logout').click(); // logout and redirect to login page

    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('form button').click(); // login

    cy.location('href').should('not.include', '/login');
  });

  it('should try to go to a protected route, and then be redirected to login before accessing that route', () => {
    cy.visit('/account'); // protected
    cy.location('href').should('include', '/login'); // redirected to login

    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('form button').click(); // login

    cy.location('href').should('include', '/account'); // redirected back to Account page
  });
});
