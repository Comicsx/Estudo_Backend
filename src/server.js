require("express-async-errors");
const AppError = require("./utils/appError")
const database = require("./database")

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
database();

const PORT = 2222;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));