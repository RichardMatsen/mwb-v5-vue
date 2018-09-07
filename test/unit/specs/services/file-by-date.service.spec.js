/* eslint-disable no-undef */
import FileByDate from '@/services/files-by-date.service'

const files = [
  {effectiveDate: new Date(2016, 10, 3)},
  {effectiveDate: new Date(2016, 10, 3)},
  {effectiveDate: new Date(2016, 10, 3)},
  {effectiveDate: new Date(2016, 10, 2)},
  {effectiveDate: new Date(2016, 10, 2)},
  {effectiveDate: new Date(2016, 10, 1)}
]

describe('FileByDate', () => {

  describe('getCountFilesForLastNDays', () => {
    it('should count the files occuring in the last n days', () => {
      const result = FileByDate.getCountFilesForLastNDays(2, files)
      expect(result).to.equal(5)
    })
  })
  
  describe('filesByDate', () => {
    it('should group files by date', () => {
      const result = FileByDate.filesByDate(files)
      expect(result.length).to.equal(3)
      expect(result.map(r => r.date)).to.deep.equal(['2016-11-03', '2016-11-02', '2016-11-01'])
      expect(result.map(r => r.files.length)).to.deep.equal([3, 2, 1])
    })
  })
})
