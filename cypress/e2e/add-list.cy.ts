describe('Add List Test', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new list and verify it appears', () => {
    cy.get('[data-cy=add-list-button]').click();
    cy.wait(1000);
    cy.get('[data-cy=list-title-input]')
      .should('be.visible')
      .type('My New List');
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains('My New List').should('exist');

    cy.wait(1000);
    cy.contains('List added successfully!').should('be.visible');
    assert.isTrue(true, 'add a new list');
  });
});
