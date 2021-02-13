describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Jimmy',
      username: 'jimmyju',
      password: 'enterthispassword',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Blogs App');
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jimmyju');
      cy.get('#password').type('enterthispassword');
      cy.get('#login-button').click();
      cy.contains('Jimmy is logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('jimmyju');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('#error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Jimmy is logged in');
    });
  });
});
