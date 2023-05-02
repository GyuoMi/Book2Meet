import database from '../api/database.js'
//gets the currently logged in users ID
import { _clientID } from '../login/+page.server.js';

let currentlyViewedClient;
/** @type {import('./$types').Actions} */
export const actions = {
  getSearchedEmailEvents: async ({ request }) => {
    const responseData = await request.formData();
    const email = responseData.get('email');
    //getting the searched users ID
    let userEvents = await database.getJsonFromSelectQuery(
      `Select EVENT_TBL.CLIENT_ID,EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR FROM EVENT_TBL RIGHT JOIN CLIENT_TBL ON EVENT_TBL.CLIENT_ID = CLIENT_TBL.CLIENT_ID WHERE CLIENT_TBL.CLIENT_EMAIL = "${email}"`);
    try {
      currentlyViewedClient = userEvents.results[0].CLIENT_ID;
      console.log(currentlyViewedClient);
    }
    catch {

    }
    //todo get this to work you were trying to basically display all the events that a person booked with a user
    let clientBookings = await database.getJsonFromSelectQuery(`Select EVENT_TBL.EVENT_ID,EVENT_TBL.EVENT_START,EVENT_TBL.EVENT_END,EVENT_TBL.EVENT_TITLE,EVENT_TBL.EVENT_COLOR FROM BOOKING_TBL LEFT JOIN EVENT_TBL ON BOOKING_TBL.EVENT_ID = EVENT_TBL.EVENT_ID where BOOKING_TBL.CLIENT_ID = ${_clientID} and EVENT_TBL.CLIENT_ID = ${currentlyViewedClient}`);

    let allEvents = {
      results: clientBookings.results.concat(userEvents.results)
    };
    console.log(allEvents);
    return {
      success: true,
      post: allEvents,
    };
  },
  //TODO you need to then save all the bookings a guy made 
  saveBookings: async ({ request }) => {
    const responseData = await request.formData();
    const eventListJson = JSON.parse(event.get('eventArray'));

    await database.mysqlconn.query('DELETE FROM BOOKING_TBL WHERE CLIENT_ID = ?', _clientID)


  }
}
