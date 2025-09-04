describe("VGR schválí a přidá komentář", () => {
  it("should fill form and submit successfully", () => {
    cy.visit("https://argos.appnificent.cz/");

    // Zachytíme POST request na submit formuláře
    cy.intercept("GET", "**/approvals").as("submitIntent");

    // Zvolíme 'Mé výzkumné záměry'
    cy.contains("Moje schválení").click();

    // Klikneme na přidat
    cy.contains(".text-h6", "Test Název") // najde element s názvem záznamu
      .closest(".q-card") // najde nejbližší kartu, která obsahuje celý záznam
      .within(() => {
        // omezíme scope na tuto kartu
        cy.get('.q-editor__content[contenteditable="true"]')
          .click()
          .type("VGR schvaluje");

        cy.contains("button", "Schválit").click(); // klikneme na Schválit
      });

    // Počkáme na request a ověříme status 200
    cy.wait("@submitIntent").its("response.statusCode").should("eq", 200);
  });
});
