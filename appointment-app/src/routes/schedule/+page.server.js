import database from '../api/database.js';

/** @type {import('./$types').PageServerLoad} */

export async function load({ params }) {
	//change when login has been implemented
	const eventsFromDatabase = await database.getJsonFromSelectQuery(
		'Select * from Event where ClientID = 1'
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
		let client = 1;
		await database.mysqlconn.query('Delete FROM Event where ClientID = 1');

		for (let i = 0; i < eventListJson.length; i++) {
			let event = eventListJson[i];

			await database.mysqlconn.query(
				'INSERT INTO Event (Event_Start,Event_End,Event_Title,Event_Colour,ClientID) VALUES (?,?,?,?,?)',
				[event.start, event.end, event.title, event.backgroundColor, client]
			);
		}
	}
};
