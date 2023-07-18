const { hash } = require("bcryptjs");

const AppError = require("../utils/appError");
const sqliteConection = require("../database/sqlite");

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqliteConection();
        const userExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userExist){
            throw new AppError("Este email já está cadastrado.");
        }

        const hashedPassword = await hash ( password, 8);

        await database.run(
            "INSERT INTO users ( name, email, password) VALUES ( ?, ?, ?)", [ name, email, hashedPassword]
        );

        return response.status(201).json();
    }
}


module.exports = UserController;