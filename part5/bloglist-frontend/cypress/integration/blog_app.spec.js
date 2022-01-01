const { func } = require('prop-types')

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'user',
      username: 'user',
      password: 'usertests',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })
  it('login form is shown by default', function () {
    cy.contains('Blogs')
    cy.contains('log in').click()
  })

  describe('login', function () {
    beforeEach(function () {
      cy.contains('log in').click()
    })
    it('User can log in', function () {
      cy.get('#username').type('user')
      cy.get('#password').type('usertests')
      cy.get('#login-btn').click()

      cy.contains('user logged-in')
    })

    it('Login fails with wrong credentials', () => {
      cy.get('#username').type('nouser')
      cy.get('#password').type('failtests')
      cy.get('#login-btn').click()

      cy.get('.danger')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(163, 40, 40)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user', password: 'usertests' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('The Big and the Small')
      cy.get('#author').type('Tim Urban')
      cy.get('#url').type('https://waitbutwhy.com/')
      cy.contains('create').click()

      cy.contains('A new blog The Big and the Small added to the list')
      cy.contains('The Big and the Small Tim Urban')
    })

    describe('Once blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The Big and the Small',
          author: 'Tim Urban',
          url: 'https://waitbutwhy.com/',
        })
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        })
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/',
        })
      })

      it('Check if user can like the blog', function () {
        cy.contains('view').click()

        cy.get('.like-btn').click()
        cy.contains('likes 1')

        cy.get('.like-btn').click()
        cy.contains('likes 2')
      })

      it('Check if user can delete a blog', function () {
        cy.contains('view').click()

        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'The Big and the Small Tim Urban')
      })

      it('Check if blogs are sorted based on number of likes', function () {
        // first blog
        cy.contains('The Big and the Small Tim Urban')
          .parent()
          .contains('view')
          .click()

        cy.contains('likes 0').contains('Like').as('blogOne')

        cy.get('@blogOne').click()

        // second blog
        cy.contains('React patterns').parent().contains('view').click()

        cy.contains('likes 0').contains('Like').as('blogTwo')

        cy.get('@blogTwo').click()
        cy.get('@blogTwo').click()

        // third blog
        cy.contains('Go To Statement Considered Harmful')
          .parent()
          .contains('view')
          .click()

        cy.contains('likes 0').contains('Like').as('blogThree')

        cy.get('@blogThree').click()
        cy.get('@blogThree').click()
        cy.get('@blogThree').click()

        cy.wait(1000)

        cy.get('.blog-style:first').contains(
          'Go To Statement Considered Harmful'
        )
        cy.get('.blog-style:last').contains('The Big and the Small Tim Urban')
      })
    })
  })
})

it('Only user who added the blog should be able to delete it', function () {
  const user = {
    name: 'secondUser',
    username: 'secondUser',
    password: 'usertests',
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)

  cy.login({ username: 'secondUser', password: 'usertests' })

  cy.contains('The Big and the Small Tim Urban')
    .parent()
    .contains('view')
    .click()

  cy.should('not.contain', 'Remove')
})
