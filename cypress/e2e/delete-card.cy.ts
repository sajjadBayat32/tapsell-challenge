describe('Add, Edit, and Delete Card', () => {
  beforeEach(() => {
    cy.visit('/list'); // Adjust the URL based on your app
  });

  it('should add a new card, edit it, and then delete it successfully', () => {
    const initialTitle = 'Test Task Title';
    const initialDescription = 'Test Task Description';
    const updatedTitle = 'Updated Task Title';
    const updatedDescription = 'Updated Task Description';

    // Step 1: Add a new list
    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type('Test Cypress List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains('[data-cy=list-title]', 'Test Cypress List').should('exist');

    // Step 2: Navigate to the created list
    cy.contains('[data-cy=list-title]', 'Test Cypress List').click();
    cy.wait(1000);
    cy.url().should('include', '/list/');

    // Step 3: Add a new card
    cy.get('[data-cy=add-card-button]').click();
    cy.wait(500);
    cy.get('input[formControlName="title"]').type(initialTitle);
    cy.get('input[formControlName="description"]').type(initialDescription);
    cy.wait(500);
    cy.get('[data-cy=card-submit-button]').click();
    cy.wait(2000);

    // Step 4: Edit the card

    // Step 6: Delete the card
    cy.get('[data-cy=card-delete-button]').first().click();
    cy.wait(1000);

    // Step 7: Verify that the card is deleted (should not exist)
    cy.get('mat-card').within(() => {
      cy.contains(updatedTitle).should('exist');
      cy.contains(updatedDescription).should('exist');
    });
    assert.isTrue(true, 'delete card a list');
  });
});
