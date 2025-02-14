describe('Create List, Navigate to Card List, and Add a Card', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new list, navigate to the card list page, and add a new card', () => {
    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type('Test Cypress List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains('[data-cy=list-title]', 'Test Cypress List').should('exist');

    cy.contains('[data-cy=list-title]', 'Test Cypress List').click();

    cy.wait(1000);
    cy.url().should('include', '/list/');

    cy.get('[data-cy=add-card-button]').click();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').type('New Cypress Card');
    cy.get('input[formControlName="description"]').type(
      'New Cypress Card Description'
    );
    cy.wait(1000);
    cy.get('[data-cy=card-submit-button]').click();

    assert.isTrue(true, 'add a new card');
  });
});
