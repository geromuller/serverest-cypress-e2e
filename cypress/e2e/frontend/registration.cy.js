import { getUsers } from '../../support/api/users.api';
import { buildUser } from '../../support/factories/user.factory';

describe('Frontend - public registration', () => {
  let registeredUser;

  afterEach(() => {
    if (registeredUser?.email) {
      getUsers().then((response) => {
        const createdUser = response.body.usuarios.find(
          (user) => user.email === registeredUser.email
        );

        if (createdUser) {
          cy.deleteUserViaApi(createdUser._id);
        }
      });
    }

    cy.clearCookies();
    cy.clearAllLocalStorage();
  });

  it('registers a regular user through the UI and finishes authenticated', () => {
    const user = buildUser();

    registeredUser = user;

    cy.visit('/login');

    cy.get('[data-testid="cadastrar"]').click();
    cy.location('pathname').should('eq', '/cadastrarusuarios');

    cy.get('[data-testid="nome"]').type(user.nome);
    cy.get('[data-testid="email"]').type(user.email);
    cy.get('[data-testid="password"]').type(user.password, { log: false });
    cy.get('[data-testid="checkbox"]').should('not.be.checked');
    cy.get('[data-testid="cadastrar"]').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/home');
    cy.get('[data-testid="logout"]').should('be.visible');
    cy.get('[data-testid="lista-de-compras"]').should('be.visible');

    cy.window().then((window) => {
      expect(window.localStorage.getItem('serverest/userNome')).to.eq(user.nome);
      expect(window.localStorage.getItem('serverest/userToken'))
        .to.be.a('string')
        .and.not.be.empty;
    });
  });
});
