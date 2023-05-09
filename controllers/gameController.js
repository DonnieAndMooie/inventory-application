const asyncHandler = require("express-async-handler");
const Game = require("../models/game");
const Console = require("../models/console");

exports.games_list = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find({}).populate("games_console").exec();
  res.render("games_list", { title: "Games", all_games: allGames });
});

exports.game_detail = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).populate("games_console").exec();
  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }
  res.render("game_detail", { title: game.name, game });
});

exports.game_create_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};
