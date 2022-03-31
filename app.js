import "dotenv/config"
import hbs from "hbs"
import express from "express"
import "./error-handling/index.js"
import './db/index.js'

import index from './routes/index.js'
import authRouter from "./routes/auth.routes.js"
import APIROuter from "./routes/API.routes.js"
import userRouter from "./routes/user.routes.js"

import conf from "./config/index.js"
import sessionConf from  "./config/session.config.js"

const app = express()
conf(app)
sessionConf(app)

const projectName = "lab-express-basic-auth";

const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;


app.use("/auth/", authRouter);
app.use("/API/", APIROuter);
app.use("/user/", userRouter);
app.use("/", index);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

export default app;
