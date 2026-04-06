const apiUrl = () => Cypress.env('apiUrl');

export const login = (credentials) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/login`,
    body: credentials,
  });
