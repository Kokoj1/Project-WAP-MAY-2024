const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

mongoose.connect("mongodb+srv://admin:admin@cluster0.ku1phhc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;

db.on("error", console.error.bind(console, ":( Something went wrong: "));
db.once("open", function() {
  console.log("Connected to the DB! :D");
});

var testRouter = require("./routes/Test");
var articlesRouter = require("./routes/articles");

app.use("/", testRouter);
app.use("/articles", articlesRouter);

app.listen(PORT, () => {
  console.log("It works! :D");
});

// REQUESTS

/*const http = require("http");

const getOptions = {
  hostname: "localhost",
  port: PORT,
  path: "/",
  method: "GET"
};

const req = http.request(getOptions, res => {
  res.on("data", d => {
    process.stdout.write(d);
  });
});

req.on("error", error => {
  console.error(error);
});

req.end();

const putOptions = {
  hostname: "localhost",
  port: PORT,
  path: "/",
  method: "PUT"
};

const reqPut = http.request(putOptions, res => {
  res.on("data", d => {
    process.stdout.write(d);
  });
});

reqPut.on("error", error => {
  console.error(error);
});

reqPut.end();*/