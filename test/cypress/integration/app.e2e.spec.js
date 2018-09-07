/* eslint-disable no-undef */

describe('Migration Workbench App Page', () => {

  const getStore = () => {
    return cy.window().its('myApp').then(vue => vue.$store)
  }

  before(function(){
    cy.visit('localhost:8080', {
      onLoad(win) {
        console.log('loaded', win)
      }
    })
    // cy.wait(5000)
    // cy.contains('xox').then((x,y) => {
    //   console.log('xy', x, y)
    // })
    // cy.once('fail', (x, y) => {
    //   console.log('cy.on', Object.keys(x), x.name, y)
    // })
  })

  it("throws when a non-descendent element is covering subject", (done) => {
    // Sample test for SO question - https://stackoverflow.com/questions/52073331/assert-that-element-is-not-actionable-in-cypress
    const $ = Cypress.$.bind(Cypress);
    const $btn = $("<button>button covered</button>")
      .attr("id", "button-covered-in-span")
      .prependTo(cy.$$("body"))
    const span = $("<span>span on button</span>")
      .css({
        position: "absolute", 
        left: $btn.offset().left, 
        top: $btn.offset().top, 
        padding: 5, 
        display: "inline-block", 
        backgroundColor: "yellow"
      })
      .prependTo(cy.$$("body"))

      cy.on('fail', (err) => {
        expect(err.message).to.include("cy.click() failed because this element")
        expect(err.message).to.include("is being covered by another element")
        done()
      });

      cy.get("#button-covered-in-span").click();
  });

  it('should have a title', () => {
    cy.title().should('contain', 'MwbV5Vue')
  });

  it('should have store', () => {
    getStore().then(store => console.log('store', store));
  });

  it('should have state', () => {
    console.log('doc', cy.state('document'))
  });

  context('Navigation', function(){
  
    it('should have a navbar', () => {
      cy.get('.navbar').should('be.visible')
    });

    it('should have a navigation brand', () => {
      cy.get('.navbar-brand').should('be.visible')
    });

    it('navigation brand should be clickable', () => {
      cy.get('.navbar-brand').click();
    });

    it('should have navigation menu items', () => {
      const menuItems = [ 'Dashboard', 'Validations', 'Referentials',
                          'Clinics', 'Team Tasks', 'About', 'Login' ];
      cy.get('.navbar').get('li').then(values => {
        const texts = [...values].map(val => val.textContent.trim())
        expect(texts).to.deep.eq(menuItems)
      })
    });
  });
});
