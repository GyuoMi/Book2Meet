import database from '../api/database.js';
import {_clientID} from '../login/+page.server.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  let bookingDetailsFromDatbaseJson;
//checks if clientID is defined before trying to access database with this value
//if client has not logged in yet return an empty json
  if (_clientID !== undefined) {
    bookingDetailsFromDatbaseJson = await database.getJsonFromSelectQuery(
      `select * from BOOKING_TBL where CLIENT_ID = ${_clientID} AND EVENT_START > NOW()`
    );
  } else {
    bookingDetailsFromDatbaseJson = { results: [] };
  }

  console.log(bookingDetailsFromDatbaseJson);
  return {
    post: bookingDetailsFromDatbaseJson
  };
}