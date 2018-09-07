/* eslint-disable no-undef */
import { trimWithMask } from '@/common/masked-trim'

describe('trimWithMask', () => {

  const tests = [
    { input: '- xyz ', masks: '- ', output: 'xyz'},
    { input: '- xyz ', masks: ['- '], output: 'xyz'},
    { input: ' - xyz ', masks: '- ', output: 'xyz'},
    { input: ' - xyz - ', masks: '- ', output: 'xyz'},
    { input: '(xyz', masks: ['( ', ' )'], output: 'xyz'},
    { input: '(xyz', masks: '( ', output: 'xyz'},
    { input: ' (xyz) ', masks: ['( ', ' )'], output: 'xyz'},
  ];

  tests.forEach(test => {
    it(`should trim "${test.input}" with masks "${test.masks}" -> "${test.output}"`, () => {
      expect(trimWithMask(test.input, test.masks)).to.equal(test.output);
    });
  });
})
