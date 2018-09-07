/* eslint-disable no-undef */
import { page_common_e2e } from '../../support/page.common.e2e.runner'

import runtimeConfig from '../../../../static/data/migration-workbench.config';

const clinicsTestParams = {
  testName: 'Clinics Page',
  pageUrl: 'localhost:8080/clinics',
  pageWait: 100,
  config: runtimeConfig.clinicsConfig,
  countFilelist: 3,
  countAfterMoreChevronClick: 6,
  timesToClickUntilAllDisplayed: 1,
  expected: [
    {title: 'Clinics DB3 (03 Jun 2016)', time: '11:00 am', badgeValue: '99.53%', color: 'green'},
    {title: 'Clinics DB3 (01 Jun 2016)', time: '11:00 am', badgeValue: '98.31%', color: 'green'},
    {title: 'Clinics DB3 (26 May 2016)', time: '11:00 am', badgeValue: '94.66%', color: 'orange'},
  ],
  fileInitiallyLoaded: {
    title: 'Clinics DB3 (03 Jun 2016 - 11.00)',
    badgeText: '99.53% matched',
    badgeColor: 'green',
    zoom: '85%;'
  }
}

page_common_e2e(clinicsTestParams, runtimeConfig);
