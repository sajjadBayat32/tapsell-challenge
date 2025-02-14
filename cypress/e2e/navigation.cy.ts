describe('Navigation Test', () => {
  it('should navigate to Done Tasks', () => {
    cy.visit('/');
    cy.get('[data-cy=nav-done-tasks]').click();
    cy.url().should('include', '/done');
    assert.isTrue(true, 'navigate to Done Tasks');
  });

  it('should navigate to Home', () => {
    cy.visit('/');
    cy.get('[data-cy=nav-home]').click();
    cy.url().should('include', '/main');
    assert.isTrue(true, 'navigate to Home');
  });

  it('should navigate to Tasks List', () => {
    cy.visit('/');
    cy.get('[data-cy=nav-task-list]').click();
    cy.url().should('include', '/list');
    assert.isTrue(true, 'navigate to Tasks List');
  });
});
