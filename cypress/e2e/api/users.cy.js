import { buildUser } from '../../support/factories/user.factory';

describe('API - users', () => {
  let createdUserId;

  afterEach(() => {
    if (createdUserId) {
      cy.deleteUserViaApi(createdUserId);
    }
  });

  it('creates a regular user successfully', () => {
    const user = buildUser();

    cy.createUserViaApi(user).then((response) => {
      createdUserId = response.body._id;

      expect(response.status).to.eq(201);
      expect(response.body).to.deep.include({
        message: 'Cadastro realizado com sucesso',
      });
      expect(response.body).to.have.property('_id').that.is.a('string').and.is.not
        .empty;
      expect(response.body).to.have.all.keys('message', '_id');
    });
  });
});
