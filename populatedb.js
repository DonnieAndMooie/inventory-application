#! /usr/bin/env node

console.log(
    'This script populates some test consoles and games to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Console = require("./models/console");
  const Game = require("./models/game");
  
  const consoles = [];
  const games = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createConsoles();
    await createGames();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function consoleCreate(name, release_year) {
    const newConsole = new Console({ name, release_year });
    await newConsole.save();
    consoles.push(newConsole);
    console.log(`Added console: ${name}`);
  }
  
  async function gameCreate(name, description, release_year, games_console, price, number_in_stock) {
    gamedetail = { name, description, games_console, price, number_in_stock };
    if (release_year != false) gamedetail.release_year = release_year;
  
    const game = new Game(gamedetail);
  
    await game.save();
    games.push(game);
    console.log(`Added Game: ${name}`)
  }
  

  
  async function createConsoles() {
    console.log("Adding consoles");
    await Promise.all([
      consoleCreate("Xbox One", 2013),
      consoleCreate("PS5", 2020),
      consoleCreate("Nintendo Wii", 2006),
    ]);
  }
  
  async function createGames() {
    console.log("Adding games");
    await Promise.all([
      gameCreate("Grand Theft Auto 5", 
      "When a young street hustler, a retired bank robber and a terrifying psychopath land themselves in trouble, they must pull off a series of dangerous heists to survive in a city in which they can trust nobody, least of all each other.", 
      2013, consoles[0], 19.95, 62),
      gameCreate("The Sims 4", 
      "Create a variety of unique sims with distinct appearances, big personalities, and all new emotions.", 
      2014, consoles[0], 10.52, 37),
      gameCreate("LEGO Star Wars", 
      "Play through all nine Star Wars saga films in a brand-new LEGO videogame unlike any other.", 
      2022, consoles[0], 22.00, 54),
      gameCreate("Hogwarts Legacy", 
      "The wizarding world awaits you. Freely roam Hogwarts, Hogsmeade, the Forbidden Forest, and the surrounding Overland area.", 
      2023, consoles[1], 54.50, 128),
      gameCreate("FIFA 23", 
      "EA SPORTS FIFA 23 brings even more of the action and realism of football to the pitch in The World's Game", 
      2022, consoles[1], 56.00, 77),
      gameCreate("The Last of Us Part I", 
      "In a hostile, post-pandemic world, Joel and Ellie, brought together by desperate circumstances, must rely on each other to survive a brutal journey across what remains of the United States.", 
      2022, consoles[1], 58.85, 34),
      gameCreate("Wii Sports", 
      "Wii Sports is a collection of five sports simulations, which have been designed to demonstrate the motion-sensing capabilities of the Wii Remote.", 
      2006, consoles[2], 10.25, 14),
      gameCreate("Mario Kart Wii", 
      "Mario Kart Wii is a multiplayer-oriented racing game from the Mario Kart series for the Wii.", 
      2008, consoles[2], 12.50, 24),
      gameCreate("Wii Play", 
      "Wii Play is a compilation of nine different minigames demonstrating the Wii's unique controller.", 
      2006, consoles[2], 7.20, 44),
    ]);
  }
  