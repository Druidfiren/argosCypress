describe("Přihlášení uživatele", () => {
  it("submit vrátí 200 OK na hijack-session", () => {
    cy.visit("https://argos.appnificent.cz/testing-fe/");

    // Zachytíme POST request na hijack-session
    cy.intercept("POST", "**/hijack-session").as("hijackSession");

    // Vyplníme formulář
    cy.get('input[aria-label="User ID"]').type(
      "64289e6c-01ab-4bc9-8a79-1073f1a2648a"
    );
    cy.get('input[aria-label="Email"]').type("test@example.com");
    cy.get('input[aria-label="Name"]').type("Druidfiren");

    // Otevřeme Groups dropdown a vybereme první možnost
    cy.get('input[aria-label="Groups"]').click();
    cy.get(".q-menu .q-item").first().click();

    // Klikneme na Submit
    cy.contains("button", "Submit").click();

    // Počkáme na request a ověříme status 200
    cy.wait("@hijackSession").its("response.statusCode").should("eq", 200);
  });
});
