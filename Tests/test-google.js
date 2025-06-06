import { Selector } from 'testcafe';

fixture`Google Search`
  .page`https://www.google.com`;

test('Recherche TestCafe sur Google', async t => {


    await t
        
        .wait(10000)
});
