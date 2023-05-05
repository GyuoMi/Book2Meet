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
    let clientBookings = [];
    try {

      clientBookings = await database.getJsonFromSelectQuery(`Select EVENT_TBL.EVENT_ID,BOOKING_TBL.EVENT_START,BOOKING_TBL.EVENT_END,BOOKING_TBL.EVENT_TITLE,EVENT_TBL.EVENT_COLOR FROM BOOKING_TBL LEFT JOIN EVENT_TBL ON BOOKING_TBL.EVENT_ID = EVENT_TBL.EVENT_ID where BOOKING_TBL.CLIENT_ID = ${_clientID} and EVENT_TBL.CLIENT_ID = ${currentlyViewedClient}`);
    }
    catch {

    }
    console.log(clientBookings);
    let allEvents;
    try {
      allEvents = {
        results: clientBookings.results.concat(userEvents.results)
      };

    }
    catch{
      allEvents = userEvents;
    }
        console.log(allEvents);
    return {
      success: true,
      post: allEvents,
    };
  },
  //TODO you need to then save all the bookings a guy made 
  saveBookings: async ({ request }) => {
    const responseData = await request.formData();
    console.log(responseData);
    const eventListJson = JSON.parse(responseData.get('userBookings'));

    const eventTitle = "Booking";
    let eventStart;
    let eventEnd;
    let eventId;
    console.log(eventListJson);
    for (let i = 0; i < eventListJson.length; i++) {
      eventId = eventListJson[i].id;
      eventStart = new Date(eventListJson[i].start);
      eventStart.setHours(eventStart.getHours());
      eventEnd = new Date(eventListJson[i].end);
      eventEnd.setHours(eventEnd.getHours());

      await database.mysqlconn.query('INSERT INTO BOOKING_TBL(CLIENT_ID,EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE) values(?,?,?,?,?)', [_clientID, eventId, eventStart, eventEnd, eventTitle]);
    }



  }
}