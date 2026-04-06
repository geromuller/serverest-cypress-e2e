import { getProducts } from '../../support/api/products.api';
import { buildProduct } from '../../support/factories/product.factory';
import { buildAdminUser } from '../../support/factories/user.factory';

describe('API - products', () => {
  let createdAdminId;
  let createdProductId;
  let authorizationToken;

  afterEach(() => {
    if (createdProductId && authorizationToken) {
      cy.deleteProductViaApi(createdProductId, authorizationToken);
    }

    if (createdAdminId) {
      cy.deleteUserViaApi(createdAdminId);
    }
  });

  it('creates a product with admin authorization and validates retrieval', () => {
    const adminUser = buildAdminUser();
    const product = buildProduct();

    cy.createUserViaApi(adminUser).then((createAdminResponse) => {
      createdAdminId = createAdminResponse.body._id;

      expect(createAdminResponse.status).to.eq(201);

      cy.loginViaApi(adminUser.email, adminUser.password).then((loginResponse) => {
        authorizationToken = loginResponse.body.authorization;

        expect(loginResponse.status).to.eq(200);
        expect(authorizationToken).to.be.a('string').and.not.be.empty;

        cy.createProductViaApi(product, authorizationToken).then(
          (createProductResponse) => {
            createdProductId = createProductResponse.body._id;

            expect(createProductResponse.status).to.eq(201);
            expect(createProductResponse.body).to.include({
              message: 'Cadastro realizado com sucesso',
            });
            expect(createdProductId).to.be.a('string').and.not.be.empty;

            getProducts().then((productsResponse) => {
              const createdProduct = productsResponse.body.produtos.find(
                (listedProduct) => listedProduct.nome === product.nome
              );

              expect(productsResponse.status).to.eq(200);
              expect(createdProduct, 'created product in catalog').to.exist;
              expect(createdProduct).to.include({
                nome: product.nome,
                descricao: product.descricao,
                preco: product.preco,
                quantidade: product.quantidade,
              });
            });
          }
        );
      });
    });
  });
});
