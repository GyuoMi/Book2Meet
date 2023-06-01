import { mysqlconn } from '../api/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async ({ request }) => {
    //extracts json data from form
		const signupDetails = await request.formData();
    //extracts data from client input 
		const firstName = signupDetails.get('firstName');
		const lastName = signupDetails.get('lastName');
		const email = signupDetails.get('email');
		const password = signupDetails.get('password');
    const timeZone = signupDetails.get('timeZone');
    //inserts new client into database
		await mysqlconn.query(
			'INSERT INTO CLIENT_TBL (CLIENT_FIRST_NAME,CLIENT_LAST_NAME, CLIENT_EMAIL, CLIENT_PASSWORD,CLIENT_TIMEZONE) VALUES (?,?,?,?,?)',
			[firstName, lastName, email, password,timeZone]
		);
    //redirects to login if everything is correct
		throw redirect(303, '/login');

		/*
		await database.mysqlconn.query('Delete FROM EVENT_TBL where CLIENT_ID = ?', client);

		for (let i = 0; i < eventListJson.length; i++) {
			let event = eventListJson[i];
			await database.mysqlconn.query(
				'INSERT INTO EVENT_TBL (EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?)',
				[event.start, event.end, event.title, event.backgroundColor, client]
			);
		}*/
	}
};
