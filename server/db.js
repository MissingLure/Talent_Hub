const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: '184.73.20.14',
    port: '3306',
    user: 'user',
    password: 'Wu$hhUvrU!JYtvAnJ2f6Y%bqhMYAh&',
    database: "talent_hub_dev"
});

module.exports = {
    pool
}

