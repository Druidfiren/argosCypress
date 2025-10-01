describe("VGR schválí a přidá komentář", () => {
  it("should fill form and submit successfully", () => {
    cy.visit("https://argos.appnificent.cz/");

    // Zachytíme GET request na submit formuláře
    cy.intercept("GET", "**/approvals").as("submitIntent");

    // Zvolíme 'Mé výzkumné záměry'
    cy.contains("Moje schválení").click();

    // Klikneme na přidat
    cy.contains(".text-h6", "Více center") // možnosti: Centrum Žadatele, Více Center, MS Base, MS Base - Retrospektivní, MS Base - Prospektivní, MS Base s finanční podporou
      .closest(".q-card") // najde nejbližší kartu, která obsahuje celý záznam
      .within(() => {
        // omezíme scope na tuto kartu
        cy.contains("button", "Schválit").click(); // klikneme na Schválit
      });

    // Počkáme na request a ověříme status 200
    cy.wait("@submitIntent").its("response.statusCode").should("eq", 200);
  });
});
