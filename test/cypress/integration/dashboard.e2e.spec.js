/* eslint-disable no-undef */

import {
  colorMap,
  getColor_rgba,
  getColorClass,
} from '../support/color-utils'

import {
  getSelector,
  elementVerticalCenter,
  areAligned
} from '../support/layout-utils'

describe('Dashboard Page', () => {

  before(function () {
    cy.viewport((3000 / 1.5), (2000 / 1.5))
    cy.visit('localhost:8080')
  })

  context('static features', function () {

    context('Dashboard', function () {

      it('should display Dashboard title', () => {
        cy.get('div.dashboard h1').should('contain', 'Dashboard')
      });

      it('should display sub title', () => {
        cy.get('div.dashboard span').should('contain', 'Summary of')
      });

      it('should display a horizontal rule', () => {
        cy.get('div.dashboard hr')
      });

      it('should have a list of thumbnails', () => {
        cy.get('.thumbnail').should('have.length', 5)
      });
    });

    context('thumbnails', () => {

      const expected = [{
          title: 'Code Validations',
          icon: 'fa-check-square-o',
          badgeValue: '0',
          color: 'green'
        },
        {
          title: 'Referential Integrity',
          icon: 'fa-list-ol',
          badgeValue: '31285',
          color: 'red'
        },
        {
          title: 'Clinic Matching',
          icon: 'fa-medkit',
          badgeValue: '99.53%',
          color: 'green'
        },
        {
          title: 'Loading Exceptions',
          icon: 'fa-exclamation-triangle',
          badgeValue: '242',
          color: 'orange'
        },
        {
          title: 'Team Tasks',
          icon: 'fa-cogs',
          badgeValue: '23',
          color: 'blue'
        },
      ];
      const getText = el => el.textContent.trim()

      it('should have titles', () => {
        cy.get('.thumbnail .title').then(els => {
          const texts = [...els].map(getText)
          expect(texts).to.deep.eq(expected.map(x => x.title))
        })
      });

      it('should have icons', () => {
        cy.get('.thumbnail .measure-icon').then(els => {
          const icons = [...els].map(getIcon)
          expect(icons).to.deep.eq(expected.map(x => x.icon))
        })
      });

      it('should have sparklines', () => {
        cy.get('.thumbnail .sparkline').should('have.length', 5)
      });

      it('should have badges', () => {
        cy.get('.thumbnail .badge').should('have.length', 5)
      });

      describe('badges', () => {

        it('should have badge value', () => {
          expected.map(x => x.badgeValue).forEach((value, i) => {
            cy.get('.thumbnail .badge').eq(i).should('contain', value)
          })
        });

        it('should have badge color css values', () => {
          expected.map(x => x.color).forEach((color, i) => {
            cy.get('.thumbnail .badge').eq(i).should('have.class', color)
          })
        });

        it('should have badge color rgba values', () => {
          expected.map(x => x.color).forEach((color, i) => {
            cy.get('.thumbnail .badge').eq(i).should('satisfy', (el) => getColor_rgba(el[0]) == color)
          })
        });

      });

      describe('narrative dropdown', () => {
        it('should have dropdown icons', () => {
          cy.get('.thumbnail .narrative-icon').should('have.length', 4)
        });

        it('should display the open icon', () => {
          cy.get('.thumbnail .narrative-icon').then(els => {
            const icons = [...els].map(getIcon)
            expect(icons).to.deep.eq(Array(4).fill('fa-chevron-down'))
          })
        });

        it('should not initially display the narrative text', () => {
          cy.get('.thumbnail .narrative-text')
            .each((el, i) => {
              cy.wrap(el).should('not.be.visible')
            })
        });
      });
    });
  });

  context('layout', () => {

    beforeEach(function () {
      cy.viewport((3000 / 1.5), (2000 / 1.5))
    })

    describe('Dashboard page content', () => {

      const selectors = ['.page-title', '.subtitle', '.titles-rule', '.thumbnails']

      it('should be in correct order', () => {
        cy.get('.dashboard').selectorsAreOrdered(selectors)
      });

    })

    describe('Thumbnail content', () => {

      const selectors = ['.measure-icon', '.title', '.filler', '.sparkline', '.error-badge-outer']

      it('should display thumbnail contents in order', () => {
        cy.get('.thumbnail').each(el => {
          cy.wrap(el).selectorsAreOrdered(selectors)
        })
      })

      it('should vertically align to center the thumbnail contents', () => {
        cy.get('.thumbnail').each(el => {
          cy.wrap(el).find(selectors.join(', '))
            .then(children => {
              const sortedSelectors = [...children].map(el => getSelector(el, selectors))
              const vcs = [...children].map(child => elementVerticalCenter(child))
              expect(areAligned(vcs)).to.be.true
            })
        })
      })

      it('should left and right justify thumbnail contents', () => {
        cy.get('.thumbnail').each(el => {
          cy.wrap(el).find(selectors.join(', '))
            .then(children => {
              const lrbounds = [...children].map(child => {
                return {
                  left: child.offsetLeft,
                  right: child.offsetLeft + child.offsetWidth
                }
              })
              const gaps = lrbounds.map((bounds, i) => i === 0 ? bounds.left : Math.floor(bounds.left - lrbounds[i - 1].right))
              const fillerWidth = [...children][selectors.indexOf('.filler')].offsetWidth;
              expect(gaps.every(gap => gap < 50)).to.be.true
              expect(fillerWidth).to.be.greaterThan(10)
            })
        })
      })
    })

  })

  context('actions', () => {

    describe('narrative dropdown', () => {

      describe('when narrative chevron down is clicked', () => {

        [0, 1, 2, 3].forEach(i => {

          it(`should display the narrative text for thumbnail ${i}`, () => {
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.get(`.thumbnail .narrative-text`).eq(i).should('not.be.visible')
              cy.wrap(button).click()
              cy.wait(100)
              cy.get(`.thumbnail .narrative-text`).eq(i).should('be.visible')
              // restore
              cy.wrap(button).click()
              cy.wait(100)
            })
          })

          it(`should display the close icon for thumbnail ${i}`, () => {
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.get('.thumbnail .narrative-icon').eq(i).should('satisfy', el => getIcon(el[0]) == 'fa-chevron-down')
              cy.wrap(button).click()
              cy.wait(100)
              cy.get('.thumbnail .narrative-icon').eq(i).should('satisfy', el => getIcon(el[0]) == 'fa-chevron-up')
              // restore
              cy.wrap(button).click()
              cy.wait(100)
            })
          });
        })
      });

      describe('when narrative chevron up is clicked', () => {

        [0, 1, 2, 3].forEach(i => {

          it(`should hide the narrative text for thumbnail ${i}`, () => {
            // Open narrative text panel
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.wrap(button).click()
            })
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.get(`.thumbnail .narrative-text`).eq(i).should('be.visible')
              cy.wrap(button).click()
              cy.get(`.thumbnail .narrative-text`).eq(i).should('not.be.visible')
            })
          });

          it(`should display the dropdown icon for thumbnail ${i}`, () => {
            // Open narrative text panel
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.wrap(button).click()
            })
            cy.get('.thumbnail .narrative-button').eq(i).then(button => {
              cy.get('.thumbnail .narrative-icon').eq(i).should('satisfy', el => getIcon(el[0]) == 'fa-chevron-up')
              cy.wrap(button).click()
              cy.get('.thumbnail .narrative-icon').eq(i).should('satisfy', el => getIcon(el[0]) == 'fa-chevron-down')
            })
          });
        });
      });
    });

    describe('thumbnail navigation', () => {

      beforeEach(() => {
        cy.viewport((3000 / 1.5), (2000 / 1.5))
        cy.visit('localhost:8080')
      })

      it('thumbnails should navigate', () => {
        cy.get('.thumbnail a.measure').first().click()
        cy.location().should((loc) => {
          expect(loc.href).to.eq('http://localhost:8080/validations')
        })
      });
    });

  })

});

const getIcon = (el) => {
  const faSizes = ['fa-sm', 'fa-md', 'fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x'];
  return el.className.split(' ')
    .filter(cl => {
      return cl.substr(0, 3) === 'fa-' && !faSizes.includes(cl);
    })[0];
}

const checkNth = (selector, n, check) => {
  cy.get(selector).then(els => {
    cy.wrap([...els][n])
      .should(check)
  })
}
