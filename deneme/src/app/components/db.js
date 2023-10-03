const mysql = require('mysql12/promise');

async function connect() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'D#Kv2$Gp@9zL',
        database: 'sakila',
        connectionLimit: 10,
    });
}

module.exports = pool.promise();