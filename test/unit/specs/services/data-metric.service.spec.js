/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import DataMetricService from '@/services/data-metric.service'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

const sampleContent = {
  clinics: 
    `<html>
      <td class="headingpresenter">
        <table id="t6">
          <tr>
            <td title="Total=1190453&#xD;&#xA;Average=297613.25" class="columntotal affected">319</td>
          </tr>
          <tr>
            <td class="n active-appoints">24668</td>
          </tr>
        </table>
      </td>
      </html>
    `,
    validations: 
    `<html>
      <td class="headingpresenter">
        <table id="t6">
          <tr>
            <td class="typeheader" colspan="7">(32 items)</td>
          </tr>
        </table>
      </td>
      </html>
    `,
    referentials: 
    `<html>
      <td class="headingpresenter">
        <table id="t6">
          <tr>
            <td title="Totals" class="columntotal"></td>
            <td title="Total=1468734&#xD;&#xA;Average=163192.6667" class="columntotal">1468734</td>
            <td title="Total=190327&#xD;&#xA;Average=21147.4444" class="columntotal">170327</td>
            <td title="Total=0&#xD;&#xA;Average=0" class="columntotal">3</td>
            <td title="Totals" class="columntotal"></td>
          </tr>
        </table>
      </td>
      </html>
    `
}

describe('DataMetricService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('getMetric', () => {

    const tests = [
      { fileType: 'clinics', expected: '98.71%' },
      { fileType: 'validations', expected: 32 },
      { fileType: 'referentials', expected: 3 }
    ]

    tests.forEach(test => {
      it(`should read metric from ${test.fileType} source`, () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sampleContent[test.fileType];
        const metric = DataMetricService.getMetric(test.fileType, tempDiv)
        expect(metric).to.equal(test.expected)
      })
    })

  })

  describe('getBadgeColor', () => {

    const tests = [
      { fileType: 'clinics', metric: '95%', expected: 'green' },
      { fileType: 'clinics', metric: '94%', expected: 'orange' },
      { fileType: 'clinics', metric: '75%', expected: 'orange' },
      { fileType: 'clinics', metric: '74%', expected: 'red' },
      { fileType: 'validations', metric: 0, expected: 'green' },
      { fileType: 'validations', metric: 1, expected: 'orange' },
      { fileType: 'validations', metric: 9, expected: 'orange' },
      { fileType: 'validations', metric: 10, expected: 'red' },
      { fileType: 'referentials', metric: 0, expected: 'green' },
      { fileType: 'referentials', metric: 1, expected: 'orange' },
      { fileType: 'referentials', metric: 9, expected: 'orange' },
      { fileType: 'referentials', metric: 10, expected: 'red' }
    ]

    tests.forEach(test => {
      it(`should set ${test.fileType} ${test.metric} to ${test.expected}`, () => {
        const color = DataMetricService.getBadgeColor(test.fileType, test.metric)
        expect(color).to.equal(test.expected)
      })
    })

  })
})
