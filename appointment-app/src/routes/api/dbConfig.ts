import mysql from 'mysql2/promise';
import tunnel from 'tunnel-ssh';

const sshConfig = {
    host: 'connect.wits.ac.za',
    username: 'student',
    password: 'ohx4cung',
    dstHost: '127.0.0.1',
    dstPort: 3306, // Default MySQL port
    localHost: '127.0.0.1',
    localPort: 3307, // Any unused port
};

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'db_user',
    password: 'db_user',
    database: 'Book2Meet',
    port: 3307, // Port opened by SSH tunnel
};

let tunnelConfig = {
    ...sshConfig,
    keepAlive: true,
    keepAliveInterval: 10000,
};

const createConnectionPool = async () => {
    try {
        const server = await tunnel(tunnelConfig);
        const connectionPool = mysql.createPool(mysqlConfig);
        console.log(`Connected to MySQL server through SSH tunnel`);
        return connectionPool;
    } catch (err) {
        console.error(`Error establishing SSH tunnel: ${err.message}`);
        process.exit(1);
    }
};

const mysqlconn = await createConnectionPool();

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


