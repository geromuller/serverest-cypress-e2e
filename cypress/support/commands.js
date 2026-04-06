import { login } from './api/auth.api';
import { createProduct, deleteProduct } from './api/products.api';
import { createUser, deleteUser } from './api/users.api';

Cypress.Commands.add('loginViaUi', (email, password) => {
  cy.get('[data-testid="email"]').clear().type(email);
  cy.get('[data-testid="senha"]').clear().type(password, { log: false });
  cy.get('[data-testid="entrar"]').click();
});

Cypress.Commands.add('createUserViaApi', (user) => createUser(user));

Cypress.Commands.add('deleteUserViaApi', (userId) => deleteUser(userId));

Cypress.Commands.add('loginViaApi', (email, password) =>
  login({ email, password })
);

Cypress.Commands.add('createProductViaApi', (product, token) =>
  createProduct(product, token)
);

Cypress.Commands.add('deleteProductViaApi', (productId, token) =>
  deleteProduct(productId, token)
);
