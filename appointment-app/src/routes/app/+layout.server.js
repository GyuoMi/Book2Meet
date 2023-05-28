import database from '../api/database.js';
import {_clientID} from '../login/+page.server.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  let bookingDetailsFromDatbaseJson;
  let allBookings;
//checks if clientID is defined before trying to access database with this value
//if client has not logged in yet return an empty json
  if (_clientID !== undefined) {
    bookingDetailsFromDatbaseJson = await database.getJsonFromSelectQuery(
      `select B.*, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME from BOOKING_TBL B 
      JOIN(SELECT E.EVENT_ID, E.CLIENT_ID, C.CLIENT_FIRST_NAME, C.CLIENT_LAST_NAME FROM EVENT_TBL E JOIN CLIENT_TBL C 
      ON E.CLIENT_ID = C.CLIENT_ID) AS C ON B.EVENT_ID = C.EVENT_ID where B.CLIENT_ID = ${_clientID} AND B.EVENT_START > NOW()`
    );
    allBookings = await database.getJsonFromSelectQuery(
      `select * from BOOKING_TBL where EVENT_START > NOW()`
    );
  } else {
    bookingDetailsFromDatbaseJson = { results: [] };
    allBookings = { results: [] };
  }

  console.log(bookingDetailsFromDatbaseJson);
  console.log(allBookings);
  return {
    bookingDetails: bookingDetailsFromDatbaseJson,
    allBookings: allBookings
  };
}