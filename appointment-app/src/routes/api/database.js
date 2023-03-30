import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: '127.0.0.1',
    user: 'user',
    password: 'user',
    database: 'Book2Meet'
});

export async function getJsonFromSelectQuery(query) {
    
    let results = await mysqlconn.query(query)
        .then(function([rows,fields]) {
            console.log(rows);
            return rows;
        });
    
    return {
        body: results
    }
}

export function showAll(){
    let data = getJsonFromSelectQuery("Select * from Client");
    console.log(data);
}
showAll();