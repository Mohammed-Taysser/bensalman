describe('Chari Reservation', () => {
  it('should reserve a chair successfully', () => {
    // Visit the login page
    cy.visit('/login');

    cy.fixture('login').then((info: LoginInfoJson) => {
      cy.loginJourney({ email: info.email, password: info.password });
    });

    // Visit the reservation page
    cy.visit('/chair');

    // finding a specific chair element and clicking it.
    cy.getByData('chair-wrapper')
      .getByData('single-chair')
      .getByData('chair-title')
      .contains(1)
      .click();

    //verify that the chair reservation  was successful and that the selected chair is displayed correctly
    cy.getByData('current-chair-badge').should('contain', 1);
  });
});
