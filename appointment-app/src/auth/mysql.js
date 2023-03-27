import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'p3ppermint',
    database: 'Book2Meet'
}).promise()

export async function getClients(){
    const [rows] = await pool.query("select * from CLient")
    return rows
}

export async function getClient(id){
    const [rows] = await pool.query(`
    SELECT * 
    from CLient
    where ClientID = ?
    `, [id])
    return rows[0]
}

export async function createClient(Client_First_Name, Client_Last_Name, Client_Email, Client_Password) {
    const [result] = await pool.query(`
    INSERT INTO Client (Client_First_Name, Client_Last_Name, Client_Email, Client_Password)
    VALUES (?, ?, ?, ?)
    `, [Client_First_Name, Client_Last_Name, Client_Email, Client_Password])
  }

const result = await createClient("rat", "irl", "is", "traash")