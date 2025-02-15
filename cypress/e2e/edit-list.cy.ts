describe('Edit List Test', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should add a new list, edit it, and verify the update', () => {
    const initialTitle = 'Temporary List';
    const updatedTitle = 'Updated List Title';

    cy.wait(1000);
    cy.get('[data-cy=add-list-button]').click();
    cy.get('[data-cy=list-title-input]').type(initialTitle);
    cy.get('[data-cy=submit-list-button]').click();

    cy.wait(1000);
    cy.contains(initialTitle).should('exist');

    cy.contains(initialTitle)
      .parent()
      .parent()
      .find('[data-cy=edit-list-button]')
      .click();
    cy.wait(1000);
    cy.get('[data-cy=list-dialog-title]').should('contain', 'Edit List');
    cy.get('[data-cy=list-title-input]').clear().type(updatedTitle);
    cy.get('[data-cy=submit-list-button]').click();

    cy.wait(1000);
    cy.contains(updatedTitle).should('exist');
    cy.contains(initialTitle).should('not.exist');
    assert.isTrue(true, ' edit a list');
  });
});
