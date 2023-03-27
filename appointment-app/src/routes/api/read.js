import { mysqlconn } from "../../auth/db";

export async function get() {
    
    let results = await mysqlconn.query('SELECT * FROM mytable')
        .then(function([rows,fields]) {
            console.log(rows);
            return rows;
        });
    
    return {
        body: results
    }
}