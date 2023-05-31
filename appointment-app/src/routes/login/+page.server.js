import database from '../api/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, cookies }) => {
    const loginDetails = await request.formData();
    const email = loginDetails.get('email');
    const password = loginDetails.get('password');
    //gets all clients data from tbl where email matches
    const clientData = await database.getJsonFromSelectQuery(
      `SELECT * FROM CLIENT_TBL WHERE CLIENT_EMAIL = "${email}"`
    );
    //checks to see if array is empty
    if (clientData.results.length > 0) {
      //if array is not empty then it checks if the password is correct
      if (password == clientData.results[0].CLIENT_PASSWORD) {
        let getClientId = clientData.results[0].CLIENT_ID;
        //sets client ID in cookies to be retrieved when necessary again
        cookies.set('clientId',getClientId, {
          secure: false,
          path:'/'
        });
        //redirects to another page 303 is necessary
        throw redirect(303, '/app/schedule');
      }
    } else {
      //if it doesn't work it returns false
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
