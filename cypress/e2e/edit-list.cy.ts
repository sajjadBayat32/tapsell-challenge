describe('Edit List Test', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('should edit an existing list and verify the update', () => {
    const oldTitle = 'My New List';
    const newTitle = 'Updated List Title';
    cy.wait(2000);
    cy.contains(oldTitle).should('exist');
    cy.get(`[data-cy=edit-list-button][data-title="${oldTitle}"]`).click();
    cy.wait(2000);
    cy.get('[data-cy=list-dialog-title]').should('contain', 'Edit List');
    cy.get('[data-cy=list-title-input]').clear().type(newTitle);
    cy.get('[data-cy=submit-list-button]').click();
    cy.wait(2000);
    cy.contains(newTitle).should('exist');
    cy.contains(oldTitle).should('not.exist');
    cy.contains('List updated successfully!').should('be.visible');
    assert.isTrue(true, 'edit an existing list');
  });
});
