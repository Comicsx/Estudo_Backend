const express = require("express");

const app = express();

app.get("/message/:id/:user", (request, response) => {
    const {id, user} = request.params;

    response.send(`
    Mensagem ID: ${id}.
    Para o usuário: ${user}`);
});

app.get("/user", (request, response) => {
    const {page, limit} = request.query;

    response.send(`
    Página: ${page}. 
    Limite: ${limit}`)

});

const PORT = 2222;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))