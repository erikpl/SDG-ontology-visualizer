describe('Document page tests', () => {
    it('Start from homepage', () => {
        cy.visit('http://localhost:3000');
        cy.get('[alt="Utrydde fattigdom"]').click();
        cy.get('button.chakra-accordion__button').eq(1).click();
        cy.get('div.chakra-accordion__panel').eq(1).within(() => {
            cy.contains('Vis dokumenter').click();
        });
        cy.url().should('eq', 'http://localhost:3000/documents');
    });
    it('Check header content', () => {
        cy.get('[alt="Utrydde fattigdom"]');
        cy.contains('h2', '1.3');
        cy.contains('p', '2030');
    });
    it('Make english preferred language', () => {
       cy.contains('button', 'Bytt språk').click();
        cy.get('[placeholder="Søk etter språk"]').click().type('eng');
        cy.contains('engelsk').click();
        cy.contains('span', 'norsk').within(() => {
            cy.get('button').click();
        }); 
    })
    it('Open document box, verify content, and move to target 4.3', () => {
        cy.get('button.chakra-accordion__button', { timeout: 20000 }).eq(2).click().within(() => {
            cy.contains('h3', 'Commission');
            cy.contains('span', 'ENG');
        });
        cy.get('div.chakra-accordion__panel').eq(2).within(() => {
            cy.contains('button', 'pdfa2a');
            cy.get('button.chakra-accordion__button').click();
            cy.contains('button', '4.3').click();
        });
    });
    it('Verify target changed', () => {
        cy.contains('h2', '4.3');
        cy.get('[alt="God utdanning"]');
        cy.contains('p', '2030');
    });
    it('Search for "council decision" and open the resulting document box', () => {
        cy.get('[placeholder="søk i dokumenter"]', { timeout: 20000 }).click().type('Council decision');
        cy.get('button.chakra-accordion__button').eq(0).click().within(() => {
            cy.contains('h3', 'Council Decision');
            cy.contains('span', 'ENG');
        });
    });
    // This is commented out until localization is fixed
    /* it('Make spanish preferred language', () => {
        cy.contains('button', 'Change language').click();
        cy.get('[placeholder="Search for a language"]').click().type('span');
        cy.contains('spanish').click();
        cy.contains('span', 'english').within(() => {
            cy.get('button').click();
        });
    });
    it('Open a spanish document box and verify its contents', () => {
        cy.get('button.chakra-accordion__button', { timeout: 20000 }).eq(2).click().within(() => {
            cy.contains('h3', 'Comisión');
            cy.contains('span', 'SPA');
        });
        cy.get('div.chakra-accordion__panel').eq(2).within(() => {
            cy.contains('button', 'pdfa2a');
        });
    }); */
    it('Click the SDG icon and verify navigation back to graph view', () => {
        cy.get('img').click();
        cy.url().should('eq', 'http://localhost:3000/ontology');
    });
});