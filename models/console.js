const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ConsoleSchema = new Schema({
    name: {type: String, required: true},
    release_year: {type: Number, min: 1900}
})

ConsoleSchema.virtual("url").get(function(){
    return `/inventory/${this._id}`
})

module.exports = mongoose.model("Console", ConsoleSchema)