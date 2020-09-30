const express = require("express");
const mongoose = require("mongoose");
const app = express();
const LittleLink = require("./models/littleLink");

mongoose.connect("mongodb://localhost/shortLink", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const littleLinks = await LittleLink.find();
  res.render("index", { littleLinks });
});

app.post("/shortLinks", async (req, res) => {
  await LittleLink.create({ big: req.body["fullUrl"] });
  res.redirect("/");
});

app.get("/:littleLink", async (req, res) => {
  let littleLink = await LittleLink.findOne({ little: req.params.littleLink });
  if (littleLink == null) return res.sendStatus(404);
  littleLink.clicks++;
  littleLink.save();
  res.redirect(littleLink.big);
});

app.listen(4000);
