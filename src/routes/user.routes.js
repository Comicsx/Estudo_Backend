const { Router } = require("express");
const userRoutes = Router();

const UserController = require("../controllers/UserController"); /* Por ser uma classe eu tenho que deixar ela em memória */
const userController = new UserController /* Deixei a minha classe em memória */



userRoutes.post("/", userController.create)


module.exports = userRoutes;