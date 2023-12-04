const express = require("express"); 
const path = require("path");
const fs = require("fs");

const { randInt , getRandomStudent, templ, newArr } = require("./utils/random");
const { get } = require("http");

const app = express();
const port = 3000;

const stTemplates = fs.readFileSync(
  "./templates/student.html",
  "utf-8"
);

const page = fs.readFileSync(
  "./public/index.html",
  "utf-8"
);

const list = fs.readFileSync("./templates/list.html", "utf-8");


app.use((req, res, next) => {
  console.log(`\n--- ${req.url} Time: ${Date.now()} `);
  next(); 
});

app.use(express.static("public"));

app.get("/getStudent", (req, res) => {
  
  let getStudent = getRandomStudent();
  let i = page.replace("{{content}}", templ(stTemplates, getStudent));
  res.status(200).send(i);
});

  
app.get("/getAllStudents", (req, res) => {
  let arr = [];
  for(let i = 0; i < randInt(10, 15); i++){
    arr.push(getRandomStudent());
  }
    arr = newArr(arr);
    let a =  list.replace("{{content}}", arr.map((item) => templ(stTemplates, item)));
    res.status(200).send(a);
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Not found :(</h1>");
});

app.listen(port);
 