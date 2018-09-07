/* eslint-disable no-undef */
import { page_common_e2e } from '../../support/page.common.e2e.runner'

import runtimeConfig from '../../../../static/data/migration-workbench.config';

const validationsTestParams = {
  testName: 'Validations Page',
  pageUrl: 'localhost:8080/validations',
  pageWait: 100,
  config: runtimeConfig.validationsConfig,
  countFilelist: 5,
  countAfterMoreChevronClick: 9,
  timesToClickUntilAllDisplayed: 3,
  expected: [
    {title: 'Volatile Validations 09 Jun 2016', time: '5:50 pm', badgeValue: '0', color: 'green'},
    {title: '...', time: '12:10 pm', badgeValue: '1', color: 'orange'},
    {title: '...', time: '10:05 am', badgeValue: '6', color: 'orange'},
    {title: 'Volatile Validations 06 Jun 2016', time: '', badgeValue: '35', color: 'red'},
    {title: 'Volatile Validations Appointments 24 May 2016 - DB1', time: '', badgeValue: '77', color: 'red'},
  ],
  fileInitiallyLoaded: {
    title: 'Volatile Validations 09 Jun 2016 - 17.50',
    badgeText: '0 errors',
    badgeColor: 'green',
    zoom: '100%;'
  }
}

page_common_e2e(validationsTestParams, runtimeConfig);
