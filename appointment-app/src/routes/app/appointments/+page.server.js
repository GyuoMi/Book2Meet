import database from '../../api/database.js'
//gets the currently logged in users ID
import { sendEmail } from '../../api/emailConfig.js'

import { convertTimezoneOfEventList } from '../../timezone.js';
let currentlyViewedClient;
let clientEmail;
//email is the email for the person the client has searched up and wants to book
let userEmail;


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
  let clientId = cookies.get('clientId');
  const eventsFromDatabase = await database.getJsonFromSelectQuery(
    `Select CLIENT_EMAIL from CLIENT_TBL where CLIENT_ID = ${clientId}`);


  //gets all the clients emails to be used in the suggestive search
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
  //when the user clicks enter then will return the searched users data
  getSearchedEmailEvents: async ({ request , cookies}) => {
    let clientId = cookies.get('clientId');
    const responseData = await request.formData();
    const email = responseData.get('email');
    //setting user email so that it can be used for sending off the notification
    userEmail = email;
    //getting the searched users ID
    //gets the star rating of the client
    let userRating = await database.getJsonFromSelectQuery(`Select CLIENT_RATING from CLIENT_TBL where CLIENT_EMAIL = "${email}"`);

    //selects all the events that the client that you searched for has availible using his email
    let userEvents = await database.getJsonFromSelectQuery(
      `Select EVENT_TBL.CLIENT_ID,EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR FROM EVENT_TBL RIGHT JOIN CLIENT_TBL ON EVENT_TBL.CLIENT_ID = CLIENT_TBL.CLIENT_ID WHERE CLIENT_TBL.CLIENT_EMAIL = "${email}"`);
    try {
      currentlyViewedClient = userEvents.results[0].CLIENT_ID;
      console.log(currentlyViewedClient);
    }
    catch {

    }
    //display all the events that a person booked with a user
    let clientBookings = [];
    try {
      clientBookings = await database.getJsonFromSelectQuery(`Select EVENT_TBL.EVENT_ID,BOOKING_TBL.EVENT_START,BOOKING_TBL.EVENT_END,BOOKING_TBL.EVENT_TITLE,EVENT_TBL.EVENT_COLOR FROM BOOKING_TBL LEFT JOIN EVENT_TBL ON BOOKING_TBL.EVENT_ID = EVENT_TBL.EVENT_ID where BOOKING_TBL.CLIENT_ID = ${clientId} and EVENT_TBL.CLIENT_ID = ${currentlyViewedClient}`);
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
    //converts usr time zone to your timezone
    let userTimeZone = await database.getJsonFromSelectQuery(`Select CLIENT_TIMEZONE from CLIENT_TBL where CLIENT_ID = ${clientId}`);
    let convertedTimeZones = convertTimezoneOfEventList(allEvents, userTimeZone.results[0].CLIENT_TIMEZONE);

    return {
      success: true,
      post: allEvents,
      rating: userRating.results[0].CLIENT_RATING
    };
  },
  //save all the bookings a guy made 
  saveBookings: async ({ request ,cookies}) => {
    let clientId = cookies.get('clientId');
    const responseData = await request.formData();
    console.log(responseData);
    //parses the data sent from the page
    const eventListJson = JSON.parse(responseData.get('userBookings'));
    //extracts data sent from the page
    const eventTitle = "Booking";
    let eventStart;
    let eventEnd;
    let eventId;
    //convert json to date objects to convert the dates to UTC time first before sending them back into the database
    for (let i = 0; i < eventListJson.length; i++) {
      eventId = eventListJson[i].id;
      eventStart = new Date(eventListJson[i].start);
      eventStart.setHours(eventStart.getHours());
      eventEnd = new Date(eventListJson[i].end);
      eventEnd.setHours(eventEnd.getHours());

      //to toISOString converts the date from the calender into something that can be inserted into the database
      await database.mysqlconn.query('INSERT INTO BOOKING_TBL (CLIENT_ID, EVENT_ID, EVENT_START, EVENT_END, EVENT_TITLE, DATE_BOOKED) VALUES (?, ?, ?, ?, ?, NOW())', [clientId, eventId, eventStart.toISOString(), eventEnd.toISOString(), eventTitle, new Date().toISOString()]);
      sendEmail(clientEmail, userEmail, eventStart, eventEnd);
    }
  }
}
