const express = require("express");
const users = require("./routes/users");
const mongoose = require("mongoose");
const app = express();

// connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/userAuth")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(() => {
    console.log("something went wrong when connecting to DB");
  });

app.use(express.json()); // add "json" middleware to make it possible to get data from the user in the form of json

app.use("/api/users", users);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
