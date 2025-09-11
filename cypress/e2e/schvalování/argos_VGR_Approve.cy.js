//aktuálně to je na druidfirena, jelikož tam není čistě VGR email uživatel ve workflows
describe("VGR schválí a přidá komentář", () => {
  it("should fill form and submit successfully", () => {
    cy.visit("https://argos.appnificent.cz/");

    // Zachytíme GET request na submit formuláře
    cy.intercept("GET", "**/approvals").as("submitIntent");

    // Zvolíme 'Mé výzkumné záměry'
    cy.contains("Moje schválení").click();

    // Klikneme na přidat
      cy.contains(".text-h6", "Centrum Žadatele")// možnosti: Centrum Žadatele, Více Center, MS Base, MS Base - Retrospektivní, MS Base - Prospektivní, MS Base s finanční podporou
        .closest(".q-card")
        .within(() => {
          // omezíme scope na tuto kartu
          cy.get('.comment-input-section .q-editor__content[contenteditable="true"]')
            .type('VGR uživatel schválil výzkumný záměr.'); // přidáme komentář
          cy.contains("button", "Schválit").click(); // klikneme na Schválit
        });

    // Počkáme na request a ověříme status 200
    cy.wait("@submitIntent").its("response.statusCode").should("eq", 200);
  });
});
