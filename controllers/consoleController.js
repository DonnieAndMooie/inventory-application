const asyncHandler = require("express-async-handler");
const Console = require("../models/console");
const Game = require("../models/game");

exports.console_list = asyncHandler(async (req, res, next) => {
  const allConsoles = await Console.find({});
  res.render("console_list", { title: "Consoles", all_consoles: allConsoles });
});

exports.console_detail = asyncHandler(async (req, res, next) => {
  const [consoleObject, allGamesForConsole] = await Promise.all(
    [Console.findById(req.params.id),
      Game.find({ games_console: req.params.id })],
  );
  if (consoleObject === null) {
    const err = new Error("Console not found");
    err.status = 404;
    return next(err);
  }

  res.render("console_detail", {
    title: `Console - ${consoleObject.name}`,
    console: consoleObject,
    all_games: allGamesForConsole,
  });
});

exports.console_create_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.console_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.console_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.console_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.console_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.console_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};
