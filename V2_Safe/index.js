const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.send("signup page");
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.status(404);
  res.send("Page not found - 404");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
