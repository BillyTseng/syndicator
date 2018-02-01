import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `https://www.eventbrite.com/create`;  // specify the start page


//then create a test and place your code there
test('My first test', async t => {
    const startDate = Selector('.hasDatepicker').nth(0);
    const endDate = Selector('.hasDatepicker').nth(1);
    //const logIn = Selector('button').withText('Log In');
    await t
        .typeText('#signin-email', '<yourEmail>')
        .click('button[type=submit]')
        .typeText('#password', '<yourPassword>')
        .click('button[type=submit]')
        .typeText('#id_group-details-name', 'Test3')
        .typeText(startDate, '07/07/2018', { replace: true })
        .typeText(endDate, '07/08/2018', { replace: true })
        .click('#create-ticket-free-button')
        .typeText('#id_group-tickets-0-ticket_type', 'Test3')
        .typeText('#id_group-tickets-0-quantity_total', '103')
        .click('#make-event-live-button-almost-done')

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#publish-success').innerText).contains('Congratulations');
});
