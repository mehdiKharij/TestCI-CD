import { Selector } from 'testcafe';

fixture `ChatGPT - Envoyer un prompt`
    .page `https://chat.openai.com/`;

test('Envoyer un prompt à ChatGPT', async t => {
  

    await t
       
        .wait(5000); // attendre une réponse

});
