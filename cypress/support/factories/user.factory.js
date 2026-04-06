import { buildUniqueEmail, buildUniqueName } from '../utils/testData';

export const buildUser = (overrides = {}) => ({
  nome: buildUniqueName('Regular User'),
  email: buildUniqueEmail('regular-user'),
  password: 'Test@123',
  administrador: 'false',
  ...overrides,
});

export const buildAdminUser = (overrides = {}) => ({
  nome: buildUniqueName('Admin User'),
  email: buildUniqueEmail('admin-user'),
  password: 'Admin@123',
  administrador: 'true',
  ...overrides,
});
