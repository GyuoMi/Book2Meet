import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: 'p3ppermint',
    database: 'Book2Meet'
});