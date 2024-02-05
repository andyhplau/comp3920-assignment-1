const express = require("express");
// Import any necessary modules or libraries here

// Define your functions and variables here

// Add event listeners or other initialization code here

// Start executing your code here
const app = express();
const port = 3000;

// Define your routes and middleware here

app.get("/", (req, res) => {
  res.send("This is V2 Safe.");
});

// Add more routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
