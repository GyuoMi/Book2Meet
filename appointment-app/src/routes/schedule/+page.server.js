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
    event.get()
		console.log(event[Symbol]);
		/*
    database.changeDataInDatabase("INSERT INTO Event VALUES (?,?,?,?,?,?)".concat(event.id,event.start,event.end,event.title,event.color,1));*/
	}
};
