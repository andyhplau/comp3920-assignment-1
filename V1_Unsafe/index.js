const express = require("express");
const bcrypt = require("bcrypt");
saltRounds = 12;

const app = express();
const port = process.env.PORT || 3000;

var users = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  var missingUsername = req.query.missingUsername;
  var missingPassword = req.query.missingPassword;
  res.render("signup", {
    missingUsername: missingUsername,
    missingPassword: missingPassword,
  });
});

app.post("/signingUp", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (!username && !password) {
    res.redirect("/signup?missingUsername=1&missingPassword=1");
  } else if (!username) {
    res.redirect("/signup?missingUsername=1");
  } else if (!password) {
    res.redirect("/signup?missingPassword=1");
  } else {
    var hashedPassword = bcrypt.hashSync(password, saltRounds);
    users.push({ username: username, password: hashedPassword });

    console.log(users);

    var usershtml = "";
    for (i = 0; i < users.length; i++) {
      usershtml +=
        "<li>" + users[i].username + ": " + users[i].password + "</li>";
    }

    var html = "<ul>" + usershtml + "</ul>";
    res.send(html);
  }
});

app.get("/login", (req, res) => {
  var missingUsername = req.query.missingUsername;
  var missingPassword = req.query.missingPassword;
  var incorrectUsername = req.query.incorrectUsername;
  var incorrectPassword = req.query.incorrectPassword;
  res.render("login", {
    missingUsername: missingUsername,
    missingPassword: missingPassword,
    incorrectUsername: incorrectUsername,
    incorrectPassword: incorrectPassword,
  });
});

app.post("/loggingIn", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (!username && !password) {
    res.redirect("/login?missingUsername=1&missingPassword=1");
  } else if (!username) {
    res.redirect("/login?missingUsername=1");
  } else if (!password) {
    res.redirect("/login?missingPassword=1");
  } else {
    for (i = 0; i < users.length; i++) {
      if (users[i].username == username) {
        if (bcrypt.compareSync(password, users[i].password)) {
          res.redirect("/loggedIn");
        } else {
          res.redirect("/login?incorrectPassword=1");
        }
      } else {
        res.redirect("/login?incorrectUsername=1");
      }
    }
  }
});

app.get("/loggedIn", (req, res) => {
  var html = `
  You are logged in!
  `;
  res.send(html);
});

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.status(404);
  res.send("Page not found - 404");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
