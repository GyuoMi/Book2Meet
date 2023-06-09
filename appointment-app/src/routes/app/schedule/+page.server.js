import database from '../../api/database.js';
import { convertTimezoneOfEventList} from '../../timezone.js';
/* For further details of svelte actions go to https://kit.svelte.dev/docs/load

gets all client events from the database and sends it to the front end in a post object*/
/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  //gets users id through cookies
  let clientId = cookies.get('clientId');

  //gets all clients events 
  let eventsFromDatabase = await database.getJsonFromSelectQuery(
    `Select * from EVENT_TBL where CLIENT_ID = ${clientId}`);
  //gets clients timezone
  const clientInfo = await database.getJsonFromSelectQuery(`Select CLIENT_TIMEZONE from CLIENT_TBL where CLIENT_ID = ${clientId}`);
  console.log(clientInfo);
  let clientTimezone = clientInfo.results[0].CLIENT_TIMEZONE;
  //converts clients timezone from UTC to current timezone
  eventsFromDatabase = convertTimezoneOfEventList(eventsFromDatabase,clientTimezone);
  //returns data to the front end
  return {
    post: eventsFromDatabase
  };
}
/* For further details of svelte actions go to https://kit.svelte.dev/docs/form-actions

saves all the users events back into the database. Since events can be dragged around, for simplicity currently all events for a user are first deleted and then rewritten to the database. This approach should be changed in the future*/
/** @type {import('./$types').Actions} */
export const actions = {
  saveDatabaseEvents: async ({ request,cookies }) => {
    //gets form data from front end
    let clientId = cookies.get('clientId');

    const event = await request.formData();
    //gets the data from the <input> tag named eventArray
    const eventListJson = JSON.parse(event.get('eventArray'));
    console.log(eventListJson);
    //deletes all users events this is to ensure no duplicates are created
    await database.mysqlconn.query('Delete FROM EVENT_TBL where CLIENT_ID = ?', clientId);

    //inserts the events one at a time into the database
    for (let i = 0; i < eventListJson.length; i++) {
      let event = eventListJson[i];
      //if an existing event is inserted into the database
      if (typeof Number(event.id) == 'number') {
        await database.mysqlconn.query(
          'INSERT INTO EVENT_TBL (EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?)',
          [event.start, event.end, event.title, event.backgroundColor, clientId]
        );

      } else {
        //if a new event is inserted into the database
        await database.mysqlconn.query(
          'INSERT INTO EVENT_TBL (EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR,CLIENT_ID) VALUES (?,?,?,?,?,?)',
          [event.id, new Date(event.start).toISOString(), new Date(event.end).toISOString(), event.title, event.backgroundColor, clientId]
        );

      }
    }
  }
};
