require("dotenv/config");
require("./db");
const hbs = require("hbs");

const express = require("express");
const app = express();

require("./config")(app);
require("./config/session.config")(app);

const projectName = "lab-express-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

const index = require("./routes/index");
const authRouter = require("./routes/auth.routes");
const APIROuter = require("./routes/API.routes");
app.use("/", index);
app.use("/auth/", authRouter);
app.use("/API/", APIROuter);

require("./error-handling")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
