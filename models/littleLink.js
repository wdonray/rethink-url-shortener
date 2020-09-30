const mongoose = require("mongoose");
const shortId = require("shortid");

const littleLinkSchema = new mongoose.Schema({
  big: {
    type: String,
    required: true,
  },
  little: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("LittleLink", littleLinkSchema);
