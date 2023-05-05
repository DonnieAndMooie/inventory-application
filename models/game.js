const mongoose = require("mongoose")

const Schema = mongoose.Schema

const GameSchema = new Schema({
    name: {name: String, required: true},
    description: {type: String, required: true, minLength: 15},
    release_year: {type: Number, min: 1900},
    console: {type: Schema.Types.ObjectId, ref: "console", required: true},
    price: {type: Number, required: true},
    number_in_stock: {type: Number, required: true}
})

GameSchema.virtual("url").get(function(){
    return `/inventory/${this._id}`
})

module.exports = mongoose.model("Game", GameSchema)