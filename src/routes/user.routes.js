const { Router } = require("express");
const userRoutes = Router();

const UserController = require("../controllers/UserController"); /* Por ser uma classe eu tenho que deixar ela em memória */
const userController = new UserController /* Deixei a minha classe em memória */


function myMiddleware(request, response, next) {
    console.log("Você passou pelo Middleware!");

    if(!request.body.isAdmin) {
        return response.json({ message: "Você não está autorizado!"})
    }

    next()
}


userRoutes.post("/", myMiddleware, userController.create)


module.exports = userRoutes;