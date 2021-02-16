describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    cy.createUser({
      name: 'Jimmy',
      username: 'jimmyju',
      password: 'enterthispassword',
    });
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

    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Jimmy',
          url: 'https://www.cypress.io/',
          likes: 1,
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'Jimmy',
          url: 'https://www.cypress.io/',
          likes: 2,
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'Jimmy',
          url: 'https://www.cypress.io/',
          likes: 3,
        });
      });

      it('blog can be liked', function () {
        cy.contains('Second blog').as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();

        cy.get('@theBlog').should('contain', 'Likes: 3');
      });

      it('blog can be deleted by creator', function () {
        cy.contains('First blog').as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('delete').click();

        cy.get('#blogs-list').should('not.contain', 'theBlog');
      });

      it('other users cannot delete the blog', function () {
        cy.contains('log out').click();

        cy.createUser({
          name: 'Karo',
          username: 'karrotti',
          password: 'karkarro',
        });

        cy.login({ username: 'karrotti', password: 'karkarro' });

        cy.contains('Third blog').as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.contains('delete').should('not.exist');
      });

      it('blogs are ordered by the most liked being first', function () {
        cy.get('#blogs-list').find('div').find('div').as('theBlogsList');
        cy.get('@theBlogsList').should('have.length', 3);

        cy.get('@theBlogsList')
          .find('button')
          .then((buttons) => cy.wrap(buttons.click()));

        cy.get('@theBlogsList').then((blogs) => {
          cy.wrap(blogs[0]).should('contain', 'Likes: 3');
          cy.wrap(blogs[1]).should('contain', 'Likes: 2');
          cy.wrap(blogs[2]).should('contain', 'Likes: 1');
        });
      });
    });
  });
});
