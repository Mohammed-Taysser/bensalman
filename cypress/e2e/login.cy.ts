describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginJourney({ email: info.email, password: info.password });
    });
  });

  it('should show email not valid on missing email & password', () => {
    cy.loginSubmit({ email: '', password: '' });

    // Assert that the user is logged in
    cy.get('#password_help > .ant-form-item-explain-error').should(
      'be.visible'
    );
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show email not valid on bad email', () => {
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginSubmit({ email: info['bad-email'], password: info.password });
    });

    // Assert that the user is logged in
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show email not valid on missing email', () => {
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginSubmit({ email: '', password: info.password });
    });

    // Assert that the user is logged in
    cy.get('#email_help > .ant-form-item-explain-error').should('be.visible');
  });

  it('should show password not valid on missing password', () => {
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginSubmit({ email: info.email, password: '' });
    });

    // Assert that the user is logged in
    cy.get('#password_help > .ant-form-item-explain-error').should(
      'be.visible'
    );
  });

  it('should show email or password not valid on wrong auth', () => {
    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginSubmit({
        email: info['non-exist-email'],
        password: info.password,
      });
    });

    // Show error message
    cy.get(
      '.ant-message-notice-content .ant-message-custom-content.ant-message-error'
    ).should('be.visible');
  });
});
