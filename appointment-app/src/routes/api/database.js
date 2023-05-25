import mysql from 'mysql2/promise'
// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
const createTcpPool = async config => {
	// Note: Saving credentials in environment variables is convenient, but not
	// secure - consider a more secure solution such as
	// Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
	// keep secrets safe.
	const dbConfig = {
		host: '34.105.249.18', // e.g. '127.0.0.1'
		port: 3306, // e.g. '3306'
		user: 'root', // e.g. 'my-db-user'
		password: 'root', // e.g. 'my-db-password'
		database: 'Book2Meet'
	};
	// Establish a connection to the database.
	return mysql.createPool(dbConfig);
};
export const mysqlconn = await createTcpPool();
// export const mysqlconn = mysql.createPool({
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: '',
// 	database: 'Book2Meet'
// });
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
	createTcpPool,
	changeDataInDatabase,
	getJsonFromSelectQuery,
	mysqlconn
};
