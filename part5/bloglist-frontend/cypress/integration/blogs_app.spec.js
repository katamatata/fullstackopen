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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jimmyju', password: 'enterthispassword' });
    });

    it('a new blog post can be added', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('A blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('https://www.cypress.io/');
      cy.contains('create').click();

      cy.contains('A blog created by cypress');
    });

    describe.only('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'cypress',
          url: 'https://www.cypress.io/',
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'cypress',
          url: 'https://www.cypress.io/',
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'cypress',
          url: 'https://www.cypress.io/',
        });
      });

      it('one of those can be liked', function () {
        // or
        // cy.contains('Second blog').contains('view').click();
        // cy.contains('like').click();
        // cy.contains('Likes: 1');

        // or
        // cy.contains('Second blog').parent().find('button').click();
        // cy.contains('Second blog').parent().find('#like-button').click();
        // cy.contains('Second blog').parent().should('contain', 'Likes: 1');

        cy.contains('Second blog').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();
        cy.get('@theBlog').should('contain', 'Likes: 1');
      });
    });
  });
});
