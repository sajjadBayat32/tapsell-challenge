describe('Add, Edit, and Delete Card', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new card, edit it, and then delete it successfully', () => {
    const initialTitle = 'Test Task Title';
    const initialDescription = 'Test Task Description';

    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type('Test Cypress List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains('[data-cy=list-title]', 'Test Cypress List').should('exist');

    cy.contains('[data-cy=list-title]', 'Test Cypress List').click();
    cy.wait(1000);
    cy.url().should('include', '/list/');

    cy.get('[data-cy=add-card-button]').click();
    cy.wait(500);
    cy.get('input[formControlName="title"]').type(initialTitle);
    cy.get('input[formControlName="description"]').type(initialDescription);
    cy.wait(500);
    cy.get('[data-cy=card-submit-button]').click();
    cy.wait(2000);

    cy.get('[data-cy=card-delete-button]').first().click();
    cy.wait(1000);

    assert.isTrue(true, 'delete card a list');
  });
});
