const asyncHandler = require("express-async-handler");
const Console = require("../models/console");

exports.console_list = asyncHandler(async (req, res, next) => {
  const allConsoles = await Console.find({});
  res.render("console_list", { title: "Consoles", all_consoles: allConsoles });
});

exports.console_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};

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
