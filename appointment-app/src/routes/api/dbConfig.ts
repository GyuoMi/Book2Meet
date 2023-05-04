import mysql from 'mysql2/promise';
import { Client } from 'ssh2';

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

let sshTunnel: Client | null = null;

const createConnectionPool = async () => {
  try {
    sshTunnel = new Client();
    await new Promise<void>((resolve, reject) => {
      sshTunnel!.on('ready', () => {
        sshTunnel!.forwardOut(
          sshConfig.localHost,
          sshConfig.localPort,
          sshConfig.dstHost,
          sshConfig.dstPort,
          (err, stream) => {
            if (err) {
              reject(err);
            } else {
              const connection = mysql.createConnection({
                ...mysqlConfig,
                stream,
              });
              connection.connect((err) => {
                if (err) {
                  reject(err);
                } else {
                  console.log('Connected to MySQL server through SSH tunnel');
                  resolve();
                }
              });
            }
          }
        );
      });
      sshTunnel!.on('error', (err) => {
        reject(err);
      });
      sshTunnel!.on('close', () => {
        console.log('SSH tunnel closed');
      });
      sshTunnel!.connect(sshConfig);
    });
    const connectionPool = mysql.createPool(mysqlConfig);
    console.log(`Connected to MySQL server through SSH tunnel`);
    return connectionPool;
  } catch (err) {
    console.error(`Error establishing SSH tunnel: ${err.message}`);
    process.exit(1);
  }
};

const mysqlconn = await createConnectionPool();

export async function getJsonFromSelectQuery(query: string) {
  const [rows, fields] = await mysqlconn.query(query);
  return { results: rows };
}

export async function changeDataInDatabase(query: string) {
  await mysqlconn.query(query);
}

process.on('SIGINT', () => {
  console.log('Closing SSH tunnel and MySQL connection pool');
  if (sshTunnel) {
    sshTunnel.end();
  }
  mysqlconn.end();
  process.exit();
});

export default {
  changeDataInDatabase,
  getJsonFromSelectQuery,
  mysqlconn,
};

