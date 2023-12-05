describe('Login Flow', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('/login');
  });

  it('should login successfully', () => {
    // Enter email and password
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.getByData('email').type(info.email);
      cy.getByData('password').type(info.password);
    });

    // Submit the login form
    cy.getByData('button').click();

    // Assert that the user is logged in
    cy.location('pathname').should('eq', '/');
  });

  it('should show email not valid on missing email & password', () => {
    // Visit the login page
    cy.visit('/login');

    // Submit the login form
    cy.getByData('button').click();

    // Assert that the user is logged in
    cy.get('#password_help > .ant-form-item-explain-error').should(
      'be.visible'
    );
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show email not valid on bad email', () => {
    // Enter email and password
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.getByData('email').type(info['bad-email']);
      cy.getByData('password').type(info.password);
    });

    // Submit the login form
    cy.getByData('button').click();

    // Assert that the user is logged in
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show email not valid on missing email', () => {
    // Enter password
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.getByData('password').type(info.password);
    });

    // Submit the login form
    cy.getByData('button').click();

    // Assert that the user is logged in
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show password not valid on missing password', () => {
    // Enter email
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.getByData('email').type(info.email);
    });

    // Submit the login form
    cy.getByData('button').click();

    // Assert that the user is logged in
    cy.get('#password_help > .ant-form-item-explain-error').should(
      'be.visible'
    );
  });

  it('should show email or password not valid on wrong auth', () => {
    // Enter email and password
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.getByData('email').type(info['non-exist-email']);
      cy.getByData('password').type(info.password);
    });

    // Submit the login form
    cy.getByData('button').click();

    // Show error message
    cy.get(
      '.ant-message-notice-content .ant-message-custom-content.ant-message-error'
    ).should('be.visible');
  });
});
