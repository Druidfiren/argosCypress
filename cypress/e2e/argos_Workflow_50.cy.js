describe("Add research intent", () => {
  it("should fill form and submit successfully", () => {
    cy.visit("https://argos.appnificent.cz/");

    // Zachytíme POST request na submit formuláře
    cy.intercept("PATCH", "**/approvers").as("submitIntent");

    // Zvolíme 'Mé výzkumné záměry'
    cy.contains("Workflows").click();

    // Klikneme na schválit
    cy.contains("Common Research Proposal Workflow").click();

    cy.contains("i", "edit").click();

    cy.get('input[type="number"]').clear().type("50");

    cy.contains("span", "Uložit").click();

    // Počkáme na request a ověříme status 200
    cy.wait("@submitIntent").its("response.statusCode").should("eq", 204);
  });
});
