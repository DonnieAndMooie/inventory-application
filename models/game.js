const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minLength: 15 },
  release_year: { type: Number, min: 1900 },
  games_console: { type: Schema.Types.ObjectId, ref: "console", required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

GameSchema.virtual("url").get(function () {
  return `/inventory/games/${this._id}`;
});

module.exports = mongoose.model("Game", GameSchema);
