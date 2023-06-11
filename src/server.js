const express = require("express");

const app = express();
app.use(express.json())

app.post("/user", (request, response) => {
    const { name, email, password } = request.body;

    response.json({name, email, password})

});

const PORT = 2222;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))