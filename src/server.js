require("express-async-errors");
const AppError = require("./utils/appError")
const migrationsRun = require("../src/database/sqlite/migrations")

const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error!",
    })
})


app.use(routes);
migrationsRun();

const PORT = 2222;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));