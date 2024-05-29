const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());

// DATABASE

mongoose.connect("mongodb+srv://admin:admin@cluster0.ku1phhc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;

db.on("error", console.error.bind(console, ":( Something went wrong: "));

db.once("open", function() {
  console.log("Connected to the DB! :D");
});

var articlesRouter = require("./routes/articles");

// ENDPOINTS

app.use("/articles", articlesRouter);

app.listen(PORT, () => {
  console.log("It works! :D");
});

/*

// REQUEST EXAMPLES

// CREATE

const formData = {

  title: "TEST",
  content: "TEST"

};

const res = await fetch(`http://localhost:3000/articles`, {

  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  "method": "POST",
  "body": JSON.stringify(formData)
});

const data = await res.json();

console.log("--- REPORT ---");
console.log(`PAYLOAD: ${JSON.stringify(data.payload)}`);
console.log(`MSG     : ${data.msg}`);

// GET ALL

const req = await fetch("http://localhost:3000/articles", {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  "method": "GET"
});

const data = await req.json();

console.log("--- REPORT ---");
console.log(`PAYLOAD: ${JSON.stringify(data.payload)}`);
console.log(`MSG    : ${data.msg}`);

// GET ARTICLE

const req = await fetch("http://localhost:3000/articles/ID", {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  "method": "GET"
});

const data = await req.json();

console.log("--- REPORT ---");
console.log(`PAYLOAD: ${JSON.stringify(data.payload)}`);
console.log(`MSG    : ${data.msg}`);

// DELETE

const req = await fetch("http://localhost:3000/articles/ID", {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  "method": "DELETE"
});

const data = await req.json();

console.log("--- REPORT ---");
console.log(`MSG    : ${data.msg}`);

// UPDATE

const formData = {

  title: "Updated title",
  content: "Updated content"

};

const res = await fetch(`http://localhost:3000/articles/665701e52f24c2fce33aef68`, {
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  "method": "PUT",
  "body": JSON.stringify(formData)
});

const data = await res.json();

console.log("--- REPORT ---");
console.log(`PAYLOAD: ${JSON.stringify(data.payload)}`);
console.log(`MSG    : ${data.msg}`);

*/