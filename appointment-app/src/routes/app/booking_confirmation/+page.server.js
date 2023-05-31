import database from '../../api/database.js';
import bookingChoice from "./+page.svelte";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
  let bookingDetailsFromDatabaseJson;
  let allBookings;

//checks if clientID is defined before trying to access database with this value
//if client has not logged in yet return an empty json
  let clientId = cookies.get('clientId');
  //let clientId =44;
  if (clientId !== undefined) {
  
    // gets meetings with null values from the database
  bookingDetailsFromDatabaseJson = await database.getJsonFromSelectQuery(
    `select B.*, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME from BOOKING_TBL B 
    JOIN(SELECT E.EVENT_ID, E.CLIENT_ID, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME FROM EVENT_TBL E JOIN CLIENT_TBL C 
    ON E.CLIENT_ID = C.CLIENT_ID) AS C ON B.EVENT_ID = C.EVENT_ID where B.CLIENT_ID = ${clientId} AND B.EVENT_START > NOW() AND BOOKING_VALID IS NULL`
  );

  //retrieve all the bookings from the database.
  allBookings = await database.getJsonFromSelectQuery(
    `select * from BOOKING_TBL where EVENT_START > NOW()`

  );
  } 
  else {
    bookingDetailsFromDatabaseJson = { results: [] };
    allBookings = { results: [] };
  }

  //console.log(bookingDetailsFromDatabaseJson);
  //console.log(allBookings);
  return {
    bookingDetails: bookingDetailsFromDatabaseJson,
    allBookings: allBookings
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  bookingChoice: async ({ request }) => {
    const buttonDetails = await request.formData();

    const bookingChoice = buttonDetails.get('bookingChoice');
    const bookingID = buttonDetails.get('selectedbookingId');
    console.log('bookingChoice:', bookingChoice);
    console.log('bookingID:', bookingID);

    // Perform the necessary database update operations using the bookingChoice value
    await database.mysqlconn.query('UPDATE BOOKING_TBL SET BOOKING_VALID = ? where BOOKING_ID = ?',[bookingChoice,bookingID]);
    
  }
};

