const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './env/.env') });
const express = require("express");
const app = express();
app.use(express.json());

const checkWordRouter = require('./routes/check-word');

const port = 7423;

app.use('/check-word', checkWordRouter);

app.get("/", (req, res) => {
  res.send("Hello Expresses");
});

app.listen(process.env.PORT || port);
