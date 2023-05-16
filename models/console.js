const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConsoleSchema = new Schema({
  name: { type: String, required: true },
  release_year: { type: Number, min: 1900 },
  image: {
    name: { type: String },
    data: { type: Buffer },
    fileType: { type: String },
  },
});

ConsoleSchema.virtual("url").get(function () {
  return `/inventory/consoles/${this._id}`;
});

ConsoleSchema.virtual("base64").get(function () {
  return this.image.data.toString("base64");
});

module.exports = mongoose.model("Console", ConsoleSchema);
