if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const sendMessage = require("./util/sender");
const express = require("express");
const morgan = require("morgan");
const xss = require("xss-clean");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
// Prevent Cross site scripting
app.use(xss());
// Enable cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Women Safety Application");
});

app.post("/", async (req, res) => {
  const from = "+17069433597";
  let { to, body } = req.body;
  if (!to) {
    return res.status(400).json({ success: false, message: "To Field Empty" });
  }
  if (!body) {
    return res
      .status(400)
      .json({ success: false, message: "Body Field Empty" });
  }
  to = "+92" + to.substring(1);
  const isSent = await sendMessage(to, from, body);
  if (isSent) {
    return res.status(200).json({ success: true, message: "Alert Sent" });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Alert Sending Failed " });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
