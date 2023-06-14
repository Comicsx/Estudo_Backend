const { Router } = require("express");

const userRouter = require("./user.routes");

const routes = Router();
routes.use("./user", userRouter);

module.exports = routes;