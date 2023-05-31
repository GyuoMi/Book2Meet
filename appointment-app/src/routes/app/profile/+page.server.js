import database from '../../api/database.js';

/* For further details of svelte actions go to https://kit.svelte.dev/docs/load

gets all client events from the database and sends it to the front end in a post object*/
/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  let clientId = cookies.get('clientId');
	const clientDetailsFromDatbaseJson = await database.getJsonFromSelectQuery(
		`Select * from CLIENT_TBL where CLIENT_ID = ${clientId}`);
  
  console.log(clientDetailsFromDatbaseJson);
	return {
		post: clientDetailsFromDatbaseJson
	};
}


/** @type {import('./$types').Actions} */
export const actions = {
  saveClientInfoToDatabase: async ({request, cookies}) => {
    const clientId = cookies.get('clientId');

    const clientDataUpdated = await request.formData();
    const firstName = clientDataUpdated.get("name");
    const lastName = clientDataUpdated.get("surname");
    const email = clientDataUpdated.get("email");
    const password =clientDataUpdated.get("password");
    const timeZone = clientDataUpdated.get("timeZone");
    await database.mysqlconn.query('UPDATE CLIENT_TBL SET CLIENT_FIRST_NAME = ?, CLIENT_LAST_NAME=?,CLIENT_EMAIL=?,CLIENT_PASSWORD=?,CLIENT_TIMEZONE=? where CLIENT_ID = ?',[firstName,lastName,email,password,timeZone,clientId]);
    }
};
