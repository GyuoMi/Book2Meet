import database from '../api/database.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
  let bookingDetailsFromDatabaseJson;
  let allBookings;

//checks if clientID is defined before trying to access database with this value
//if client has not logged in yet return an empty json
  let clientId = cookies.get('clientId');
  if (clientId !== undefined) {

    //gets all the events which the client has booked with another user
    bookingDetailsFromDatabaseJson = await database.getJsonFromSelectQuery(
      `select B.*, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME from BOOKING_TBL B 
      JOIN(SELECT E.EVENT_ID, E.CLIENT_ID, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME FROM EVENT_TBL E JOIN CLIENT_TBL C 
      ON E.CLIENT_ID = C.CLIENT_ID) AS C ON B.EVENT_ID = C.EVENT_ID where B.CLIENT_ID = ${clientId} AND B.EVENT_START > NOW()`
    );
    //gets all booked events that are bigger then the current date
    allBookings = await database.getJsonFromSelectQuery(
      `select * from BOOKING_TBL where EVENT_START > NOW()`

    );
  } else {
    bookingDetailsFromDatabaseJson = { results: [] };
    allBookings = { results: [] };
  }
  
  return {
    bookingDetails: bookingDetailsFromDatabaseJson,
    allBookings: allBookings
  };
}
