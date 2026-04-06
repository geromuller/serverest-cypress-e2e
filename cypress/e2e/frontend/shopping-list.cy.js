import { buildProduct } from '../../support/factories/product.factory';
import {
  buildAdminUser,
  buildUser,
} from '../../support/factories/user.factory';

describe('Frontend - shopping list', () => {
  let adminUserId;
  let regularUserId;
  let createdProductId;
  let adminAuthorizationToken;

  afterEach(() => {
    if (createdProductId && adminAuthorizationToken) {
      cy.deleteProductViaApi(createdProductId, adminAuthorizationToken);
    }

    if (adminUserId) {
      cy.deleteUserViaApi(adminUserId);
    }

    if (regularUserId) {
      cy.deleteUserViaApi(regularUserId);
    }

    cy.clearCookies();
    cy.clearAllLocalStorage();
  });

  it('adds a created product to the shopping list and increases its quantity', () => {
    const regularUser = buildUser();
    const adminUser = buildAdminUser();
    const product = buildProduct();

    cy.createUserViaApi(regularUser).then((createRegularUserResponse) => {
      regularUserId = createRegularUserResponse.body._id;

      cy.createUserViaApi(adminUser).then((createAdminUserResponse) => {
        adminUserId = createAdminUserResponse.body._id;

        cy.loginViaApi(adminUser.email, adminUser.password).then(
          (loginResponse) => {
            adminAuthorizationToken = loginResponse.body.authorization;

            cy.createProductViaApi(product, adminAuthorizationToken).then(
              (createProductResponse) => {
                createdProductId = createProductResponse.body._id;

                cy.visit('/login');
                cy.loginViaUi(regularUser.email, regularUser.password);

                cy.location('pathname', { timeout: 10000 }).should('eq', '/home');
                cy.contains('h5', product.nome, { timeout: 10000 })
                  .should('be.visible')
                  .parent()
                  .within(() => {
                    cy.get('[data-testid="adicionarNaLista"]').click();
                  });

                cy.location('pathname', { timeout: 10000 }).should(
                  'eq',
                  '/minhaListaDeProdutos'
                );
                cy.get('[data-testid="shopping-cart-product-name"]').should(
                  'contain',
                  product.nome
                );
                cy.get('[data-testid="shopping-cart-product-quantity"]').should(
                  'contain',
                  '1'
                );

                cy.get('[data-testid="product-increase-quantity"]').click();
                cy.get('[data-testid="shopping-cart-product-quantity"]').should(
                  'contain',
                  '2'
                );

                cy.get('[data-testid="limparLista"]').click();
                cy.get('[data-testid="shopping-cart-empty-message"]').should(
                  'be.visible'
                );
              }
            );
          }
        );
      });
    });
  });
});
