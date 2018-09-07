/* eslint-disable no-undef */
import HistoryService from '@/services/history.service'

const files = {
  validations: [
    { metric: 1 },
    { metric: 2 },
    { metric: 3 },
    { metric: 4 },
    { metric: 5 },
    { metric: 6 }
  ],
  clinics: [
    { metric: '91.0%' },
    { metric: '92.1%' },
    { metric: '93.2%' },
  ],
  referentials: [
    { metric: 1, effectiveDate: new Date(2016, 10, 3) },
    { metric: 2, effectiveDate: new Date(2016, 10, 3) },
    { metric: 3, effectiveDate: new Date(2016, 10, 3) },
    { metric: 4, effectiveDate: new Date(2016, 10, 2) },
    { metric: 5, effectiveDate: new Date(2016, 10, 2) },
    { metric: 6, effectiveDate: new Date(2016, 10, 1) }
  ],
}

describe('HistoryService', () => {

  it('should return validations history', () => {
    const result = HistoryService.validationsHistory(files.validations)
    expect(result).to.deep.equal([6, 5, 4, 3, 2, 1])
  })

  it('should return clinics history', () => {
    const result = HistoryService.clinicsHistory(files.clinics)
    expect(result).to.deep.equal([3.2, 2.1, 1])
  })
  
  it('should return referentials history', () => {
    const result = HistoryService.referentialsHistory(files.referentials)
    expect(result).to.deep.equal([6, 9, 6])
  })
})
