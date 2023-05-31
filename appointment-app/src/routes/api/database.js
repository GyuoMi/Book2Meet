import mysql from 'mysql2/promise';

//connecting to the database on the local machine
export const mysqlconn = mysql.createPool({
	host: '127.0.0.1',
	user: 'user',
	password: 'user',
	database: 'Book2Meet'
});
//queries the database and returns the data in a Json format
export async function getJsonFromSelectQuery(query) {
	let results = await mysqlconn.query(query).then(function ([rows, fields]) {
		return rows;
	});

	return {
		results
	};
}
//this function is used to run queries that don't require retrieving anything back
export async function changeDataInDatabase(query) {
	await mysqlconn.query(query);
}

//exports variables to be accessed around the application
export default {
	changeDataInDatabase,
	getJsonFromSelectQuery,
	mysqlconn
};
