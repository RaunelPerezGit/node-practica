const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'node-practicas'
});

module.exports = pool;