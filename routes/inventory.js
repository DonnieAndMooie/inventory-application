const express = require("express");

const router = express.Router();

const multer = require("multer");
const consoleController = require("../controllers/consoleController");
const gamesController = require("../controllers/gameController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CONSOLE ROUTES
router.get("/consoles", consoleController.console_list);

router.get("/consoles/create", consoleController.console_create_get);

router.post("/consoles/create", upload.single("image"), consoleController.console_create_post);

router.get("/consoles/:id/delete", consoleController.console_delete_get);

router.post("/consoles/:id/delete", consoleController.console_delete_post);

router.get("/consoles/:id/update", consoleController.console_update_get);

router.post("/consoles/:id/update", upload.single("image"), consoleController.console_update_post);

router.get("/consoles/:id", consoleController.console_detail);

// GAME ROUTES

router.get("/games/create", gamesController.game_create_get);

router.post("/games/create", upload.single("image"), gamesController.game_create_post);

router.get("/games/:id/delete", gamesController.game_delete_get);

router.post("/games/:id/delete", gamesController.game_delete_post);

router.get("/games/:id/update", gamesController.game_update_get);

router.post("/games/:id/update", upload.single("image"), gamesController.game_update_post);

router.get("/games", gamesController.games_list);

router.get("/games/:id", gamesController.game_detail);

module.exports = router;
