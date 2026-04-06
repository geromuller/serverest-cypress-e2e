import { buildUniqueProductName } from '../utils/testData';

export const buildProduct = (overrides = {}) => ({
  nome: buildUniqueProductName('QA Product'),
  preco: 199,
  descricao: 'Product created by Cypress automation',
  quantidade: 5,
  ...overrides,
});
