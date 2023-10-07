

describe('Search', () => {
    it('performs a search for "Rolex" and displays results', () => {
        cy.visit('/'); // Visit the root URL of your frontend application
        cy.get('[data-cy=search-input]').type('Rolex'); // Use the correct selector
        cy.get('[data-cy=search-button]').click(); // Use the correct selector
        cy.contains('Search Results:').should('be.visible'); // Verify search results are displayed
        cy.contains('Rolex Submariner').should('be.visible'); // Verify specific result
    });
});
