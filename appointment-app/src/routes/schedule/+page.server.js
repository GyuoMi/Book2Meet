import database from '../api/database.js';
//CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { _clientID } from '../login/+page.server.js';
import { convertTimezoneOfEventList} from '../timezone.js';
/* For further details of svelte actions go to https://kit.svelte.dev/docs/load

gets all client events from the database and sends it to the front end in a post object*/
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let eventsFromDatabase = await database.getJsonFromSelectQuery(
    `Select * from EVENT_TBL where CLIENT_ID = ${_clientID}`);
  const clientInfo = await database.getJsonFromSelectQuery(`Select CLIENT_TIMEZONE from CLIENT_TBL where CLIENT_ID = ${_clientID}`);
  console.log(clientInfo);
  let clientTimezone = clientInfo.results[0].CLIENT_TIMEZONE;
  
  eventsFromDatabase = convertTimezoneOfEventList(eventsFromDatabase,clientTimezone);
  console.log(eventsFromDatabase);
  return {
    post: eventsFromDatabase
  };
}
/* For further details of svelte actions go to https://kit.svelte.dev/docs/form-actions

saves all the users events back into the database. Since events can be dragged around, for simplicity currently all events for a user are first deleted and then rewritten to the database. This approach should be changed in the future*/
/** @type {import('./$types').Actions} */
export const actions = {
  saveDatabaseEvents: async ({ request }) => {
    //gets form data from front end
    const event = await request.formData();
    //gets the data from the <input> tag named eventArray
    const eventListJson = JSON.parse(event.get('eventArray'));
    console.log(eventListJson);
    await database.mysqlconn.query('Delete FROM EVENT_TBL where CLIENT_ID = ?', _clientID);

    for (let i = 0; i < eventListJson.length; i++) {
      let event = eventListJson[i];
      if (typeof Number(event.id) == 'number') {
        await database.mysqlconn.query(
          'INSERT INTO EVENT_TBL (EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?)',
          [event.start, event.end, event.title, event.backgroundColor, _clientID]
        );

      } else {
        await database.mysqlconn.query(
          'INSERT INTO EVENT_TBL (EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?,?)',
          [event.id, event.start, event.end, event.title, event.backgroundColor, _clientID]
        );

      }
    }
  }
};
