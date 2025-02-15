describe('Add, Complete, and Filter Done Tasks', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add two cards, mark them as done, and verify them in the "Done Tasks" filter', () => {
    const firstTask = 'First Task';
    const secondTask = 'Second Task';

    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type('Test Cypress List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains('[data-cy=list-title]', 'Test Cypress List').should('exist');

    cy.wait(1000);
    cy.contains('[data-cy=list-title]', 'Test Cypress List').click();
    cy.wait(1000);
    cy.url().should('include', '/list/');

    cy.get('[data-cy=add-card-button]').click();
    cy.wait(500);
    cy.get('input[formControlName="title"]').type(firstTask);
    cy.get('[data-cy=card-submit-button]').click();
    cy.wait(1000);

    cy.wait(1000);
    cy.get('[data-cy=add-card-button]').click();
    cy.wait(500);
    cy.get('input[formControlName="title"]').type(secondTask);
    cy.get('[data-cy=card-submit-button]').click();
    cy.wait(1000);

    cy.get('mat-card').should('contain', firstTask);
    cy.get('mat-card').should('contain', secondTask);
    cy.wait(1000);
    cy.get('mat-card')
      .contains(firstTask)
      .parent()
      .within(() => {
        cy.get('mat-checkbox').click();
      });

    cy.get('mat-card')
      .contains(secondTask)
      .parent()
      .within(() => {
        cy.get('mat-checkbox').click();
      });

    cy.wait(1000);

    cy.visit('/done');
    cy.wait(1000);
    cy.get('mat-card').should('contain', firstTask);
    cy.get('mat-card').should('contain', secondTask);

    assert.isTrue(true, 'check done tasks');
  });
});
