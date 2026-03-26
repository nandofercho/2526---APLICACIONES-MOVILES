// src/utils/mapUser.test.ts
import { mapUser } from './mapUser';

test('transforma usuario del backend correctamente', () => {
  const apiUser = {
    id: 1,
    nombre: 'Santy',
    fnacimiento: '2000-01-01',
  };

  const result = mapUser(apiUser);

  expect(result.id).toBe(1);
  expect(result.nombre).toBe('Santy');
  expect(result.edad).toBeGreaterThan(20);
});