const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Console = require("../models/console");
const Game = require("../models/game");

exports.console_list = asyncHandler(async (req, res, next) => {
  const allConsoles = await Console.find({}).exec();
  res.render("console_list", { title: "Consoles", all_consoles: allConsoles });
});

exports.console_detail = asyncHandler(async (req, res, next) => {
  const [consoleObject, allGamesForConsole] = await Promise.all(
    [Console.findById(req.params.id).exec(),
      Game.find({ games_console: req.params.id }).exec()],
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
  res.render("console_form", { title: "Add Console" });
};

exports.console_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name must be at least 3 characters long"),
  body("release_year")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newConsole = new Console({
      name: req.body.name,
      release_year: req.body.release_year,
    });

    if (!errors.isEmpty()) {
      res.render("console_form", {
        title: "Add Console",
        console: newConsole,
        errors: errors.array(),
      });
    } else {
      await newConsole.save();
      res.redirect(newConsole.url);
    }
  }),
];
exports.console_delete_get = asyncHandler(async (req, res, next) => {
  const [console, allGamesForConsole] = await Promise.all([
    Console.findById(req.params.id),
    Game.find({ games_console: req.params.id }),
  ]);
  res.render("console_delete", { title: "Delete Console", console, all_games: allGamesForConsole });
});

exports.console_delete_post = asyncHandler(async (req, res, next) => {
  await Console.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/consoles");
});

exports.console_update_get = asyncHandler(async (req, res, next) => {
  const console = await Console.findById(req.params.id);
  res.render("console_form", { title: "Update Console", console });
});

exports.console_update_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name must be at least 3 characters long"),
  body("release_year")
    .optional({ checkFalsy: true })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newConsole = new Console({
      _id: req.params.id,
      name: req.body.name,
      release_year: req.body.release_year,
    });

    if (!errors.isEmpty()) {
      res.render("console_form", { console: newConsole, title: "Update Console", errors: errors.array() });
    }

    const theConsole = await Console.findByIdAndUpdate(req.params.id, newConsole, {});
    res.redirect(theConsole.url);
  }),
];
