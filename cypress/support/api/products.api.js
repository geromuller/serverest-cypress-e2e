const apiUrl = () => Cypress.env('apiUrl');

export const createProduct = (productData, token) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/produtos`,
    body: productData,
    headers: {
      Authorization: token,
    },
  });

export const deleteProduct = (productId, token) =>
  cy.request({
    method: 'DELETE',
    url: `${apiUrl()}/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  });

export const getProducts = () =>
  cy.request({
    method: 'GET',
    url: `${apiUrl()}/produtos`,
  });
