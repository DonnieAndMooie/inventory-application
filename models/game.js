const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minLength: 15 },
  release_year: { type: Number, min: 1900 },
  games_console: { type: Schema.Types.ObjectId, ref: "Console", required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  image: {
    name: { type: String },
    data: { type: Buffer },
    fileType: { type: String },
  },
});

GameSchema.virtual("url").get(function () {
  return `/inventory/games/${this._id}`;
});

GameSchema.virtual("price_formatted").get(function () {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  return formatter.format(this.price);
});

GameSchema.virtual("base64").get(function () {
  return this.image.data.toString("base64");
});

module.exports = mongoose.model("Game", GameSchema);
