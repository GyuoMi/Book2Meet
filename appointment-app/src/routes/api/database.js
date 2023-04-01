import mysql from 'mysql2/promise';

export const mysqlconn = mysql.createPool({
	host: '127.0.0.1',
	user: 'user',
	password: 'user',
	database: 'Book2Meet'
});
export async function getJsonFromSelectQuery(query) {
	let results = await mysqlconn.query(query).then(function ([rows, fields]) {
		return rows;
	});

	return {
		results
	};
}

export async function changeDataInDatabase(query) {
	await mysqlconn.query(query);
}


export default {
	changeDataInDatabase,
	getJsonFromSelectQuery,
	mysqlconn
};
