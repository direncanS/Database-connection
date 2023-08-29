const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/account");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 
}));

app.use("/", accountRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

mongoose.connect("mongodb://127.0.0.1:27017/score-game", {
}).then(() => {
  console.log("Connected to database!");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
  console.log("Connection failed!");
  console.log(error);
});

