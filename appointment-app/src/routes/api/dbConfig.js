import mysql from 'mysql2/promise'
const { Client } = require('ssh2');

// define connection config for the database
const dbServer = {
    host: 'localhost',
    user: 'db_user',
    password: 'db_user',
    database: 'Book2Meet'
}
// define connection config for the ssh tunnel
const tunnelConfig = {
    host: '10.100.15.77',
    port: 22,
    username: 'student',
    password: 'ohx4cung'
}
const forwardConfig = {
    srcHost: '127.0.0.1', // any valid address
    srcPort: 3306, // any valid port
    dstHost: dbServer.host, // destination database
    dstPort: dbServer.port // destination port
};