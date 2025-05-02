import { Selector } from 'testcafe';

fixture`Wikipedia Test`
    .page`https://auth.wikimedia.org/frwiki/wiki/Sp%C3%A9cial:Connexion?useformat=desktop&usesul3=1&returnto=Main_Page&centralauthLoginToken=ebaf46f0364c2e71c89391af322139f0`;

test('Connexion a wikipedia Test', async t => {
    const user = Selector('input[name="wpName"]');
    const pwd = Selector('input[name="wpPassword"]');

    await t
        .typeText(user, 'pz@gmail.com')
        .typeText(pwd, '123456')
        .pressKey('enter')
});
