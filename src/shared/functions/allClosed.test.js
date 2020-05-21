import { allClosed } from './allClosed';

const posizioni = [{ opened: false }, { opened: true }];

const posizioni2 = [{ opened: false }, { opened: false }];

test('it works', () => {
  expect(allClosed(posizioni2)).toEqual(true);
  expect(allClosed(posizioni)).toEqual(false);
});
