import database from '../api/database.js';

/** @type {import('./$types').PageServerLoad} */

let client = 1;

export async function load({ params }) {
	
	const eventsFromDatabase = await database.getJsonFromSelectQuery(
		`Select * from EVENT_TBL where CLIENT_ID = ${client}`
	);

	return {
		post: eventsFromDatabase
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	saveDatabaseEvents: async ({ request }) => {
		const event = await request.formData();
		const eventListJson = JSON.parse(event.get('eventArray'));
		await database.mysqlconn.query('Delete FROM EVENT_TBL where CLIENT_ID = ?',client);

		for (let i = 0; i < eventListJson.length; i++) {
			let event = eventListJson[i];
			await database.mysqlconn.query(
				'INSERT INTO EVENT_TBL (EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?)',
				[event.start, event.end, event.title, event.backgroundColor, client]
			);
		}
	}
};
