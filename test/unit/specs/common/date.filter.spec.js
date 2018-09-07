/* eslint-disable no-undef */
import { formatDate } from '@/common/date.filter.js'

describe('date.filter', () => {

  const testDate = new Date(2016, 6, 4, 6, 54, 33); 
  const tests = [
    { input: testDate, format: 'YYYY', output: '2016'},
    { input: testDate, format: 'MM YYYY', output: '07 2016'},
    { input: testDate, format: 'DD MM YYYY', output: '04 07 2016'},
    { input: testDate, format: 'DD-MM-YYYY', output: '04-07-2016'},
    { input: testDate, format: 'YYYY-MM-DD', output: '2016-07-04'},
    { input: testDate, format: 'DD/MM/YYYY', output: '04/07/2016'},
    { input: testDate, format: 'DD MMM YYYY', output: '04 Jul 2016'},
    { input: testDate, format: 'DD MMMM YYYY', output: '04 July 2016'},
    { input: testDate, format: 'DD MMMM YYYY hh:mm:ss', output: '04 July 2016 06:54:33'},
    { input: testDate, format: 'DD/MM/YYYY hh:mm:ss', output: '04/07/2016 06:54:33'},
  ];

  tests.forEach(test => {
    it(`should apply format "${test.format}" -> "${test.output}"`, () => {
      expect(formatDate(test.input, test.format)).to.equal(test.output);
    });
  });

  const nullTests = [
    { input: null, format: 'DD-MM-YYYY', output: ''},
    { input: undefined, format: 'DD-MM-YYYY', output: ''},
  ];

  nullTests.forEach(test => {
    it(`should return empty string for value "${test.input}" -> "${test.output}"`, () => {
      expect(formatDate(test.input, test.format)).to.equal(test.output);
    });
  });
});
