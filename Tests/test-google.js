import { Selector } from 'testcafe';

fixture`Google Search`
  .page`https://www.google.com`;

test('Recherche TestCafe sur Google', async t => {
    const searchInput = Selector('textarea[name="q"]');

    await t
        .typeText(searchInput, 'TestCafe')
        .pressKey('enter')
});
