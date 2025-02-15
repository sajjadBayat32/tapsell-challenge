describe('Add and Edit Card', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new card and then edit it successfully', () => {
    const initialTitle = 'Test Task Title';
    const initialDescription = 'Test Task Description';
    const updatedTitle = 'Updated Task Title';
    const updatedDescription = 'Updated Task Description';

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
    cy.get('input[formControlName="title"]').type(initialTitle);
    cy.get('input[formControlName="description"]').type(initialDescription);
    cy.wait(1000);
    cy.get('[data-cy=card-submit-button]').click();
    cy.wait(2000);

    cy.get('[data-cy=card-edit-button]').click({ multiple: true });

    cy.get('input[formControlName="title"]').clear().type(updatedTitle);
    cy.get('input[formControlName="description"]')
      .clear()
      .type(updatedDescription);

    cy.get('button[type="submit"]')
      .contains('Update Task')
      .click({ multiple: true });

    cy.get('mat-card').within(() => {
      cy.contains(updatedTitle).should('exist');
      cy.contains(updatedDescription).should('exist');
      cy.wait(1000);
      assert.isTrue(true, 'edit card a list');
    });
  });
});
