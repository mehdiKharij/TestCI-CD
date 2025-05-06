import { Selector } from 'testcafe';

fixture `ChatGPT - Envoyer un prompt`
    .page `https://chat.openai.com/`;

test('Envoyer un prompt à ChatGPT', async t => {
    const inputBox = Selector('textarea'); // champ de saisie
    const sendButton = Selector('button').withAttribute('aria-label', 'Send message'); // bouton d'envoi
    const prompt = 'Quel est le sens de la vie ?';

    await t
        .expect(inputBox.exists).ok('Zone de saisie introuvable')
        .typeText(inputBox, prompt, { paste: true })
        .click(sendButton)
        .wait(5000); // attendre une réponse

    const response = Selector('.markdown'); // réponse dans l'interface
    await t
        .expect(response.exists).ok('Réponse non détectée')
        .expect(response.innerText).contains('42', 'Réponse inattendue'); // exemple de vérification
});
