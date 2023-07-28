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

    async update(request, response) {
        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConection();
        const user = await database.get("SELECT * FROM user WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado.")
        };

        const emailUpdated = await database.get("SELECT * FROM user WHERE email = (?)", [email]);

        if(emailUpdated && emailUpdated.id !== id) {
            throw new AppError("Este e-mail já está cadastrado.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await database.run(`
        UPDATE users SET 
        name = ?, 
        email = ?, 
        updated_at = DATETIME('now') 
        WHERE id = ?` 
        [ user.name, user.email, id]);

        return response.status(200).json();
    }
}


module.exports = UserController;