describe('Kliknutí na Centrum Žadatele se stavem Zpracovává se', () => {
  it('klikne na Výzkumné záměry, vyhledá Centrum Žadatele, přidá návrh a klikne na správnou položku', () => {
    cy.visit('https://argos.appnificent.cz/');
    
    //zvětší šířku viewportu na 1600px a výšku na 900px
    cy.viewport(1600, 900);

    // Klikni na "Výzkumné návrhy"
    cy.contains('Výzkumné návrhy').click();

    // Klikni do inputu "hledat podle názvu" a napiš Centrum Žadatele
    cy.get('input[aria-label="Hledat podle názvu"]').type('Centrum Žadatele');
    cy.wait(1000);

    // Najdi všechny položky Centrum Žadatele a klikni jen na tu, která má label "Zpracovává se"
    cy.get('.q-item').each(($el) => {
      const hasLabel = $el.find('.q-item__label.text-subtitle1').text().includes('Centrum Žadatele');
      const hasChip = $el.find('.q-chip__content').text().includes('Zpracovává se');
      if (hasLabel && hasChip) {
        cy.wrap($el).click();
      }
    });
    cy.wait(500);
    cy.get('.q-timeline__content > .q-btn').click();
    cy.wait(500);
    cy.get('.q-gutter-sm > :nth-child(1)').click();
    cy.wait(500);
  });
});
