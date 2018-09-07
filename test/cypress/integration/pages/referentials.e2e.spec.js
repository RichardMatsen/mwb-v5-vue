/* eslint-disable no-undef */
import { page_common_e2e } from '../../support/page.common.e2e.runner'
import * as d3 from 'd3';

import { 
  getColor_rgba
} from '../../support/color-utils'

import runtimeConfig from '../../../../static/data/migration-workbench.config';

const referentialsTestParams = {
  testName: 'Referentials Page',
  pageUrl: 'localhost:8080/referentials',
  pageWait: 100,
  config: runtimeConfig.referentialsConfig,
  countFilelist: 7,
  countAfterMoreChevronClick: 11,
  timesToClickUntilAllDisplayed: 4,
  expected: [
    {title: 'Emergency RI checks (03 Jul 2016)', time: '5:12 pm', badgeValue: '0', color: 'green'},
    {title: '...', time: '3:12 pm', badgeValue: '3', color: 'orange'},
    {title: 'Inpatient RI checks (03 Jul 2016)', time: '3:16 pm', badgeValue: '31260', color: 'red'},
    {title: 'Maternity RI checks (03 Jul 2016)', time: '5:09 pm', badgeValue: '0', color: 'green'},
    {title: 'MedicalRecord RI checks (03 Jul 2016)', time: '6:00 pm', badgeValue: '0', color: 'green'},
    {title: 'Outpatient RI checks (03 Jul 2016)', time: '3:18 pm', badgeValue: '0', color: 'green'},
    {title: 'PatientRecord RI checks (03 Jul 2016)', time: '4:01 pm', badgeValue: '22', color: 'red'}
  ],
  fileInitiallyLoaded: {
    title: 'Emergency RI checks (03 Jul 2016 - 17.12)',
    badgeText: '0 errors',
    badgeColor: 'green',
    zoom: '100%;'
  }
}

page_common_e2e(referentialsTestParams, runtimeConfig);

before(function(){
  cy.viewport((3000/1.5), (2000/1.5))
  cy.visit(referentialsTestParams.pageUrl)
  cy.wait(referentialsTestParams.pageWait)
})

describe('Referentials extra features', () => {

  context('Referentials diagram button', () => {

    it('should hide referentials-diagram-modal', () => {
      cy.get('.referentials-graph').should('not.be.visible')
    })
  
    it('should have a referentials diagram button', () => {
      cy.get('.referentials-button').click()
      cy.get('.referentials-graph').should('be.visible')
    })
  })

})
