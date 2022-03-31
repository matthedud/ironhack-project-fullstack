import express from "express"

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
import logger from "morgan"

// ℹ️ Needed when we deal with cookies we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
import cookieParser from "cookie-parser"

// ℹ️ Serves a custom favicon on each request
// https://www.npmjs.com/package/serve-favicon
import favicon from "serve-favicon"

// ℹ️ global package used to `normalize` paths amongst different operating systems
// https://www.npmjs.com/package/path
import path from "path"

// Middleware configuration
const run = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join("views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join("public")));

  // Handles access to the favicon
  app.use(favicon(path.join("public", "images", "favicon.ico")));
};

export default run