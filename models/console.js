const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConsoleSchema = new Schema({
  name: { type: String, required: true },
  release_year: { type: Number, min: 1900 },
});

ConsoleSchema.virtual("url").get(function () {
  return `/inventory/consoles/${this._id}`;
});

module.exports = mongoose.model("Console", ConsoleSchema);
