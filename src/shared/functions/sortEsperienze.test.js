import { sortEsperienze } from './sortEsperienze';

const applications = [
  {
    startDate: 'Set 2014',
    dataFine: 'Oct 2014',
  },
  {
    startDate: 'Set 2014',
    dataFine: 'Oct 2014',
  },
  {
    startDate: 'Set 2015',
    dataFine: 'Oct 2018',
  },
  {
    startDate: 'Set 2014',
    dataFine: 'In Corso',
  },
];

const expected = [
  {
    startDate: 'Set 2014',
    dataFine: 'In Corso',
  },
  {
    startDate: 'Set 2015',
    dataFine: 'Oct 2018',
  },
  {
    startDate: 'Set 2014',
    dataFine: 'Oct 2014',
  },
  {
    startDate: 'Set 2014',
    dataFine: 'Oct 2014',
  },
];

test('it works', () => {
  const esperienze = sortEsperienze(applications);
  expect(esperienze).toEqual(expected);
});
