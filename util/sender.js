const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

async function sendMessage(to, from, body) {
  try {
    await client.messages.create({
      body,
      from,
      to,
    });
    return true;
  } catch (err) {
    console.log("Error: " + err);
    return false;
  }
}

module.exports = sendMessage;
