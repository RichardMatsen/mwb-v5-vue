/* eslint-disable no-undef */
import ListFormatter from '@/services/list-formatter.service'
import NameParsingService from '@/services/name-parsing.service'
import { formatDate } from '@/common/date.filter.js'

describe('ListFormatter', () => {

  it('should order the list by date descending', () => {
    const filelist = [
      'Clinics DB3 (01 Jun 2016 - 10.00).html',
      'Clinics DB3 (03 Jun 2016 - 11.00).html',
      'Clinics DB3 (26 May 2016 - 12.00).html',
    ] 
    const parsed = NameParsingService.parseFiles(filelist, ['Clinics'])
    const result = ListFormatter.process(parsed)
    const expected = ['2016-06-03', '2016-06-01', '2016-05-26']
    expect(result.map(r => formatDate(r.effectiveDate, 'YYYY-MM-DD')))
      .to.deep.equal(expected)
  })

  it('should add sequence no for files on same date', () => {
    const filelist = [
      'Clinics DB3 (01 Jun 2016 - 10.00).html',
      'Clinics DB3 (01 Jun 2016 - 11.00).html',
      'Clinics DB3 (01 Jun 2016 - 12.00).html',
      'Clinics DB3 (26 May 2016 - 12.00).html',
    ] 
    const parsed = NameParsingService.parseFiles(filelist, ['Clinics'])
    const result = ListFormatter.process(parsed)
    expect(result.map(r => r.sequenceNo)).to.deep.equal([0, 1, 2, 0])
  })

  it('should set displayName to ellipsis for second file on same date', () => {
    const filelist = [
      'Clinics DB3 (01 Jun 2016 - 10.00).html',
      'Clinics DB3 (01 Jun 2016 - 11.00).html',
      'Clinics DB3 (01 Jun 2016 - 12.00).html',
      'Clinics DB3 (26 May 2016 - 12.00).html',
    ] 
    const parsed = NameParsingService.parseFiles(filelist, ['Clinics'])
    const result = ListFormatter.process(parsed)
    const displayNames = ['Clinics DB3 (01 Jun 2016)', '...', '...', 'Clinics DB3 (26 May 2016)']
    expect(result.map(r => r.displayName)).to.deep.equal(displayNames)
  })

})