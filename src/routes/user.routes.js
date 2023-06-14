const { Router } = require("express");

const userRouter = Router();


userRouter.post("/user", (request, response) => {
    const { name, email, password } = request.body;

    response.json({name, email, password})

});