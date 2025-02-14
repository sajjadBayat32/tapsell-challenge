describe('List Management Tests', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should delete a list and verify it is removed', () => {
    const listTitle = 'List to Delete';

    cy.wait(1000);
    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type(listTitle);
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(1000);
    cy.contains(listTitle).should('exist'); // Verify it exists

    cy.wait(1000);
    cy.contains(listTitle)
      .parent()
      .find('[data-cy=delete-list-button]')
      .click();

    cy.wait(2000);
    cy.on('window:confirm', () => true);
    cy.wait(1000);
    cy.contains(listTitle).should('not.exist');
    assert.isTrue(true, ' delete a list');
  });
});
