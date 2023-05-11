const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
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

exports.game_create_get = asyncHandler(async (req, res, next) => {
  const referrer = req.get("Referrer");
  const referrerID = referrer.split("/").pop();
  const referrerConsole = await Console.findById(referrerID);
  if (referrerConsole !== undefined) {
    res.render("game_form", { title: "Add Game", all_consoles: [referrerConsole] });
  }
  const allConsoles = await Console.find({}, "name");
  res.render("game_form", { title: "Add Game", all_consoles: allConsoles });
});

exports.game_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please enter a name"),
  body("release_year")
    .trim()
    .escape()
    .optional({ checkFalsy: true }),
  body("description")
    .trim()
    .isLength({ min: 20 })
    .escape()
    .withMessage("Description must be at least 20 characters"),
  body("games_console")
    .trim()
    .escape()
    .not()
    .equals(null)
    .withMessage("Please select a games console"),
  body("price")
    .trim()
    .isNumeric()
    .escape()
    .withMessage("Please enter a price"),
  body("number_in_stock")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Please enter number in stock"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const [gamesConsole, allConsoles] = await Promise.all([
      Console.findOne({ name: req.body.games_console }, "_id"),
      Console.find({}),
    ]);

    const game = new Game({
      name: req.body.name,
      release_year: req.body.release_year,
      description: req.body.description,
      games_console: gamesConsole._id,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    if (!errors.isEmpty()) {
      res.render("game_form", {
        title: "Add Game",
        game,
        errors: errors.array(),
        all_consoles: allConsoles,
      });
    } else {
      await game.save();
      res.redirect(game.url);
    }
  }),

];

exports.game_delete_get = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).populate("games_console");
  res.render("game_delete", { title: "Delete Game", game });
});

exports.game_delete_post = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).populate("games_console");
  await Game.deleteOne(game);
  res.redirect(game.games_console.url);
});

exports.game_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

exports.game_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};
