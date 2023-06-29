const AppError = require("../utils/appError");

class UserController {
    create(request, response) {
        const { name, email, password } = request.body;
        response.json({name, email, password})

        if(!name) {
            throw new AppError("Nome é obrigatório!");
        };

        response.status(201).json({ name, email, password});
    }
}


module.exports = UserController;