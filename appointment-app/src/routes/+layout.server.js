import database from '../routes/api/database.js';
import {_clientID} from '../routes/login/+page.server.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  let bookingDetailsFromDatbaseJson;

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
