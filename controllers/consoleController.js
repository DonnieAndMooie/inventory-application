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
