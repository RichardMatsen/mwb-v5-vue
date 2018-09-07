/* eslint-disable no-undef */

describe('Navigating to Tasks Page', () => {

  describe('navigating to, when user is not logged in', () => {
    it('should redirect to login page', () => {
      cy.visit('localhost:8080')
      cy.get('a[href*="tasks"]').contains('Team Tasks').click()
      cy.wait(2000)
      cy.get('h1').contains('Login')
    });
  });

  describe('navigating to, when user is logged in', () => {
    it('should go to tasks page', () => {
      cy.login('Smith', 'some password')
      cy.get('a[href*="tasks"]').contains('Team Tasks').click()
      cy.wait(2000)
      cy.get('h1').contains('Tasks')
    });
  });

});

describe('Tasks Page', () => {

  before(() => {
    cy.login('Smith', 'some password')
    cy.get('a[href*="tasks"]').contains('Team Tasks').click()
    cy.wait(2000)
  });

  it('should have a title', () => {
    cy.get('#mwb-tasks h1').contains('Tasks')
  });

  describe('Kanban lists', () => {

    it('should have four Kanban lists', () => {
      cy.get('.mwb-kanban-list').count(4)
    });

    it('should have titles', () => {
      cy.get('.list_title').arrayContains(['Unassigned', 'In Progress', 'Waiting', 'Done'])
    });

    // it.only('should have new card links', () => {
    //   cy.get('.list__newcard').count(4)
    // });

    it('should have cards', () => {
      cy.get('.mwb-kanban-card').count(2)
      cy.get('.mwb-kanban-card').arrayContains(['validations 07 Jun', 'validations 06 Jun Sam'])
    });

    it('should have one card on list #1', () => {
      cy.get('.mwb-kanban-list').eq(0).within(() => {
        cy.root().get('.mwb-kanban-card').count(1).contains('validations 07 Jun')
      })
    });

    it('should have one card on list #2', () => {
      cy.get('.mwb-kanban-list').eq(1).within(els => {
        cy.root().get('.mwb-kanban-card').count(1).contains('validations 06 Jun Sam')
      })
    });

    describe('drag and drop', () => {
      it('should drag and drop', () => {

        // Draggable
        cy.get('.mwb-kanban-list').eq(0).within(els => {
          cy.root().get('.mwb-kanban-card')  
            .as('draggable')
        })
        cy.get('@draggable').should('have.class', 'drag-item', 'true') 

        /*
          Drag and drop test.
          ------------------
          Ref: https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__drag-drop/cypress/integration/drag_n_drop_spec.js
        */
        const dt = {
          types: [],
          setData: function(prop, val) { this[prop] = val},
          getData: function(prop) { return this[prop] }
        }
        cy.get('@draggable')
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientX: 300, clientY: 300 })
          .wait(500)  // pause for effect
          .trigger('mouseup', {force: true})

        // Check 2 cards on 2nd list
        cy.get('.mwb-kanban-list').eq(1).within(els => {
          cy.root().get('.mwb-kanban-card').count(2)
        })

        // Check no cards on first list
        cy.get('.mwb-kanban-list').eq(0).within(els => {
          cy.root().get('.mwb-kanban-card').should('not.exist')
        })
      });
    });
  });
});
