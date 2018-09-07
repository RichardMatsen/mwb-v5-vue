/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import DataHtmlService from '@/services/data-html.service'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

const sampleContent = {
  commandTimeout: `
  <html>
    <body>Command Timeout only supported by SQL Client (so far)<br/><br/>
    </body>
  </html>
  `,
  styleIds: `
  <html>
  <head>
  <style type="text/css">
      body {
          margin: 0.3em 0.3em 0.4em 0.4em;
          font-family: Verdana;
          font-size: 80%;
          background: white;
      }
    </style>
    </head>
    <body>
    </body>
  </html>
  `
}

const expected = {
  commandTimeout: `
  <html>
    <body><br/>
    </body>
  </html>
  `,
  styleIds: `
  <style type="text/css">
#idPrefix       body {
          margin: 0.3em 0.3em 0.4em 0.4em;
          font-family: Verdana;
          font-size: 80%;
          background: white;
      }
    </style>
  `
}

describe('DataHtmlService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('removeCommandTimeout', () => {
    it('should remove command timeout message', () => {
      const result = DataHtmlService.removeCommandTimeout(sampleContent.commandTimeout)
      expect(result).to.equal(expected.commandTimeout)
    })
  })
  
  describe('prefixStylesWithId', () => {
    it('should tag styles with id', () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sampleContent.styleIds;
      DataHtmlService.prefixStylesWithId(tempDiv, 'idPrefix')
      expect(tempDiv.innerHTML.trim()).to.equal(expected.styleIds.trim())
    })
  })
  
})
