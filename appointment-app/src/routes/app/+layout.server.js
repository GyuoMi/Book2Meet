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
      `select * from BOOKING_TBL where CLIENT_ID = ${_clientID} AND EVENT_START > NOW()`
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