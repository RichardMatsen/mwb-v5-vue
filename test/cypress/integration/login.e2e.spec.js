/* eslint-disable no-undef */

describe('Login Page', () => {

  describe('clicking login from the home page', () => {
    it('should go to the login page', () => {
      cy.visit('localhost:8080')
      cy.get('a[href*="login"]').contains('Login').click()
      cy.wait(2000)
      cy.get('h1').contains('Login')
    });
  });

});
