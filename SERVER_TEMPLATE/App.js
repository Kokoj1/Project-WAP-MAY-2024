const express = require("express");
const app = express();

const PORT = 3000;

var testRouter = require("./routes/Test");

app.use("/", testRouter);

app.listen(PORT, () => {
  console.log("It works! :D");
});
