describe('Add List Test', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new list and verify it appears', () => {
    cy.get('[data-cy=add-list-button]').click();
    cy.wait(2000);
    cy.get('[data-cy=list-title-input]')
      .should('be.visible')
      .type('My New List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(2000);
    cy.contains('My New List').should('exist');

    cy.wait(2000);
    cy.contains('List added successfully!').should('be.visible');
  });
});
