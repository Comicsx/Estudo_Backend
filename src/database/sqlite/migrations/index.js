const sqliteConection = require('../../../database/sqlite');
const creatUsers = require('./createUsers');

async function migrationRun() {
    const schemas = [
        creatUsers,
    ].join('');

    sqliteConection().then(db => db.exec(schemas)).catch(error => console.error(error));
}

module.exports = migrationRun;