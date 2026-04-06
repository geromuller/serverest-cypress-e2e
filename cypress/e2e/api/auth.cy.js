import { buildUser } from '../../support/factories/user.factory';

describe('API - authentication', () => {
  let createdUserId;

  afterEach(() => {
    if (createdUserId) {
      cy.deleteUserViaApi(createdUserId);
    }
  });

  it('authenticates a valid user successfully', () => {
    const user = buildUser();

    cy.createUserViaApi(user).then((createUserResponse) => {
      createdUserId = createUserResponse.body._id;

      expect(createUserResponse.status).to.eq(201);

      cy.loginViaApi(user.email, user.password).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body).to.include({
          message: 'Login realizado com sucesso',
        });
        expect(loginResponse.body)
          .to.have.property('authorization')
          .that.is.a('string')
          .and.is.not.empty;
      });
    });
  });
});
