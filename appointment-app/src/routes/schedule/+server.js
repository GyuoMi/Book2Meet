import database from '../api/database.js';   

/** @type {import('./$types').RequestHandler} */
export async function insertEvent(event){
        database.changeDataInDatabase("INSERT INTO Event VALUES (?,?,?,?,?,?)".concat(event.id,event.start,event.end,event.title,event.color))
}