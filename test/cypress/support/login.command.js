/* eslint-disable no-undef */
Cypress.Commands.add('login',  (user, pwd) => {
  cy.visit('localhost:8080/login')
  cy.get('#userName > .mu-text-field-content > .mu-text-field-input').type(user);
  cy.get('#password > .mu-text-field-content > .mu-text-field-input').type(pwd);
  cy.get('button.btn.btn-primary').click()
})
