/* eslint-disable no-undef */
export const getSelector = (el, selectors) => {
  const ids = [...el.className.split(' ').map(cn => `.${cn}`), el.localName]
  return ids.filter(id => selectors.includes(id) && id !== '.')[0]
}

export const elementVerticalCenter = (el) => el.offsetTop + Math.floor(el.offsetHeight / 2)

export const areAligned = (els) => {
  const first = els[0];
  return els.every(el => Math.abs(el - first) <= 1) // allow one pixel difference
}

export const isLeftJustified = ({ subject, relativeTo, maxPadding }) => {
  const selectors = `${subject}, ${relativeTo}`
  cy.get(selectors)
    .getProp('offsetLeft')
    .then(offsetLefts => {
      expect(Math.abs(offsetLefts[0] - offsetLefts[1]) <= (maxPadding || 15)).to.be.true
    })
}

export const isRightJustified = ({ subject, relativeTo, maxPadding }) => {
  const selectors = `${subject}, ${relativeTo}`
  cy.get(selectors)
    .calcProps(['offsetLeft', 'offsetWidth'], (values) => values[0] + values[1] )
    .then(offsetRights => {
      console.log(offsetRights[0], offsetRights[1])
      expect(offsetRights[0] - offsetRights[1] <= (maxPadding || 15)).to.be.true
    })
}

export const areVerticallyCenterAligned =  ({ subjects, within, maxPadding }) => {
  cy.get(within || 'body').each(el => {
    cy.wrap(el).find(subjects.join(', '))
      .then(children => {
        const vcs = [...children].map(child => elementVerticalCenter(child))
        expect(areAligned(vcs)).to.be.true
      })
  })
}
