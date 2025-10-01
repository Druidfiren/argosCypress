describe("Vytvoření výzkumného záměru", () => {
  it("vytvoření záměru", () => {
    cy.visit("https://argos.appnificent.cz/");

    // Zachytíme POST request na submit formuláře
    cy.intercept("POST", "**/researchProposals").as("submitIntent");

    // Zvolíme 'Mé výzkumné záměry'
    cy.contains("Mé výzkumné záměry").click();

    // Klikneme na přidat
    cy.contains("button", "Přidat").click();

    // Vyplníme všechna 4 pole
    cy.get('input[aria-label="Název *"]').type("MSBase prospektivní");
    cy.get('textarea[aria-label="Popis *"]').type("Automatický test pro MSBase prospektivní");
    cy.get('input[aria-label="Rozsah dat *"]').click();
    cy.get('.q-menu .q-item').contains('MSBase - prospektivní').click();
    cy.get('input[type="file"]').attachFile("test_reseni_cz.pdf");
    // Klikneme na Submit
    cy.contains("button", "Uložit").click();

    // Počkáme na request a ověříme status 200
    cy.wait("@submitIntent").its("response.statusCode").should("eq", 200);
  });
});
