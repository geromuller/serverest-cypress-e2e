import { getProducts } from '../../support/api/products.api';
import { buildProduct } from '../../support/factories/product.factory';
import { buildAdminUser } from '../../support/factories/user.factory';

describe('Frontend - admin products', () => {
  let adminUser;
  let adminUserId;
  let createdProductName;

  afterEach(() => {
    if (createdProductName && adminUser) {
      cy.loginViaApi(adminUser.email, adminUser.password).then((loginResponse) => {
        const authorizationToken = loginResponse.body.authorization;

        getProducts().then((productsResponse) => {
          const createdProduct = productsResponse.body.produtos.find(
            (product) => product.nome === createdProductName
          );

          if (createdProduct) {
            cy.deleteProductViaApi(createdProduct._id, authorizationToken);
          }
        });
      });
    }

    if (adminUserId) {
      cy.deleteUserViaApi(adminUserId);
    }

    cy.clearCookies();
    cy.clearAllLocalStorage();
  });

  it('logs in as an admin and creates a product successfully', () => {
    const product = buildProduct();

    adminUser = buildAdminUser();
    createdProductName = product.nome;

    cy.createUserViaApi(adminUser).then((createAdminResponse) => {
      adminUserId = createAdminResponse.body._id;

      cy.visit('/login');
      cy.loginViaUi(adminUser.email, adminUser.password);

      cy.location('pathname', { timeout: 10000 }).should('eq', '/admin/home');
      cy.get('[data-testid="logout"]').should('be.visible');

      cy.get('[data-testid="cadastrar-produtos"]').click();
      cy.location('pathname').should('eq', '/admin/cadastrarprodutos');

      cy.get('[data-testid="nome"]').type(product.nome);
      cy.get('[data-testid="preco"]').type(String(product.preco));
      cy.get('[data-testid="descricao"]').type(product.descricao);
      cy.get('[data-testid="quantity"]').type(String(product.quantidade));
      cy.get('[data-testid="imagem"]').selectFile({
        contents: Cypress.Buffer.from('product image'),
        fileName: 'product.png',
        mimeType: 'image/png',
      });
      cy.get('[data-testid="cadastarProdutos"]').click();

      cy.location('pathname', { timeout: 10000 }).should(
        'eq',
        '/admin/listarprodutos'
      );
      cy.contains('td', product.nome)
        .should('be.visible')
        .parents('tr')
        .should('contain', product.descricao)
        .and('contain', product.quantidade);
      cy.get('[data-testid="logout"]').should('be.visible');

      cy.window().then((window) => {
        expect(window.localStorage.getItem('serverest/userToken'))
          .to.be.a('string')
          .and.not.be.empty;
      });
    });
  });
});
