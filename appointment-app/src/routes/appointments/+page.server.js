import database from '../api/database.js'
//gets the currently logged in users ID
import { _clientID } from '../login/+page.server.js';
import { sendEmail } from '../api/emailConfig.js'

import { convertTimezoneOfEventList } from '../timezone.js';
let currentlyViewedClient;
let clientEmail;
//email is the email for the person the client has searched up and wants to book
let userEmail;


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const eventsFromDatabase = await database.getJsonFromSelectQuery(
    `Select CLIENT_EMAIL from CLIENT_TBL where CLIENT_ID = ${_clientID}`);


   let allEmailsFromDatabase = await database.getJsonFromSelectQuery(`Select CLIENT_EMAIL from CLIENT_TBL`);

  //the following code returns the possible suggested searces from all availible emails
  clientEmail = eventsFromDatabase.results[0].CLIENT_EMAIL;
  let emailArray = [];
  for(let i =0; i < allEmailsFromDatabase.results.length;i++){
    emailArray.push(allEmailsFromDatabase.results[i].CLIENT_EMAIL);
  }
  console.log(emailArray);
	return {
    emails: emailArray,    
	};

}




/** @type {import('./$types').Actions} */
export const actions = {
  getSearchedEmailEvents: async ({ request }) => {
    const responseData = await request.formData();
    const email = responseData.get('email');
    //setting user email so that it can be used for sending off the notification
    userEmail = email;
    //getting the searched users ID

    let userRating = await database.getJsonFromSelectQuery(`Select CLIENT_RATING from CLIENT_TBL where CLIENT_EMAIL = "${email}"`);


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
    let allEvents;
    try {
      allEvents = {
        results: clientBookings.results.concat(userEvents.results)
      };

    }
    catch {
      allEvents = userEvents;
    }

    let userTimeZone = await database.getJsonFromSelectQuery(`Select CLIENT_TIMEZONE from CLIENT_TBL where CLIENT_ID = ${_clientID}`);
    let convertedTimeZones = convertTimezoneOfEventList(allEvents, userTimeZone.results[0].CLIENT_TIMEZONE);

    console.log();
    return {
      success: true,
      post: allEvents,
      rating: userRating.results[0].CLIENT_RATING
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
      //to toISOString converts the date from the calender into something that can be inserted into the database
      await database.mysqlconn.query('INSERT INTO BOOKING_TBL(CLIENT_ID,EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE) values(?,?,?,?,?)', [_clientID, eventId, eventStart.toISOString(), eventEnd.toISOString(), eventTitle]);
      sendEmail(clientEmail, userEmail, eventStart, eventEnd,)
    }
  }
}
