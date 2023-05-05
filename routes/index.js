const express = require("express");

const router = express.Router();
const asyncHandler = require("express-async-handler");

const Console = require("../models/console");
const Game = require("../models/game");

/* GET home page. */
router.get("/", asyncHandler(async (req, res, next) => {
  const [numConsoles, numGames, numCopies] = await Promise.all([
    Console.countDocuments({}),
    Game.countDocuments({}),
    Game.find({}, "number_in_stock"),
  ]);
  let totalCopies = 0;
  for (const item of numCopies) {
    totalCopies += item.number_in_stock;
  }
  res.render("index", {
    title: "Home",
    num_consoles: numConsoles,
    num_games: numGames,
    total_copies: totalCopies,
  });
}));

module.exports = router;
