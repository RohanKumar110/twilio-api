const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

async function sendMessage(numbers, from, body) {
  try {
    const formatNumbers = getFormatNumbers(numbers);
    console.log(formatNumbers);
    formatNumbers.forEach(async (to) => {
      await client.messages.create({
        body,
        from,
        to,
      });
    });
    return true;
  } catch (err) {
    console.log("Error: " + err);
    return false;
  }
}

function getFormatNumbers(numbers) {
  return numbers.map((number) => "+92" + number.substring(1));
}

module.exports = sendMessage;
