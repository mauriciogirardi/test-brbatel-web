/// <reference types="cypress"/>

describe('SingIn page  ', () => {
  it('should visit a page signIn', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login');
  });

  it('should log in', () => {
    cy.get(':nth-child(1) > input').click();
  });
});
