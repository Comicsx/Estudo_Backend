const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

async function sqliteConection(){ //função asincrona, permite que rode sem estar pronta ainda
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConection;