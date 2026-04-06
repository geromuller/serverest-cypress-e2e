const apiUrl = () => Cypress.env('apiUrl');

export const createUser = (userData) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/usuarios`,
    body: userData,
  });

export const deleteUser = (userId) =>
  cy.request({
    method: 'DELETE',
    url: `${apiUrl()}/usuarios/${userId}`,
    failOnStatusCode: false,
  });
