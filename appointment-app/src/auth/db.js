import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: '<myhost>',
    user: 'root',
    password: 'mypassword',
    database: 'mydatabase'
});