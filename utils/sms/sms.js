const twilio = require('twilio');

const accountId = 'AC160734522c25deca852bfab308ec7d8f';
const authToken = '02ef4209c3f01a96ef37b82eaccaa5b9';

const client = new twilio(accountId, authToken);

const createSMS = () => {
  client.messages.create({
    body: 'Hola mundo desde node JS',
    to: '+56976797039',
    from: '+12058579816'
  }).then((message) => console.log(message.sid));
}

exports.sendSMS = () => createSMS();
