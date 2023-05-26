import database from '../api/database';
import { redirect } from '@sveltejs/kit';

export let _clientID = 1;

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const loginDetails = await request.formData();
		const email = loginDetails.get('email');
		const password = loginDetails.get('password');

		const clientData = await database.getJsonFromSelectQuery(
			`SELECT * FROM CLIENT_TBL WHERE CLIENT_EMAIL = '${email}'`
		);

		if (clientData.results.length > 0) {
			if (password == clientData.results[0].CLIENT_PASSWORD) {
				_clientID = clientData.results[0].CLIENT_ID;
				throw redirect(303, '/app/schedule');
			}
		} else {
			return { success: false };
		}

		/*
		await database.mysqlconn.query('Delete FROM EVENT_TBL where CLIENT_ID = ?', client);

		for (let i = 0; i < eventListJson.length; i++) {
			let event = eventListJson[i];
			await database.mysqlconn.query(
				'INSERT INTO EVENT_TBL (EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?)',
				[event.start, event.end, event.title, event.backgroundColor, client]
			);
        throw redirect(303,'/login');
		}*/
	}
};
