import database from '../../api/database.js'
//gets the currently logged in users ID
import { _clientID } from '../../login/+page.server.js';
import { convertTimezoneOfEventList } from '../../timezone.js';


/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    let bookingDetailsFromDatabaseJson;
    let allBookings;
  //checks if clientID is defined before trying to access database with this value
  //if client has not logged in yet return an empty json
    if (_clientID !== undefined) {
      bookingDetailsFromDatabaseJson = await database.getJsonFromSelectQuery(
        `select * from BOOKING_TBL where CLIENT_ID = ${_clientID} AND EVENT_START > NOW()`
      );
      allBookings = await database.getJsonFromSelectQuery(
        `select * from BOOKING_TBL where EVENT_START > NOW()`
      );
    } else {
      bookingDetailsFromDatabaseJson = { results: [] };
      allBookings = { results: [] };
    }
  
    console.log(bookingDetailsFromDatabaseJson);
    console.log(allBookings);
    return {
      bookingDetails: bookingDetailsFromDatabaseJson,
      allBookings: allBookings
    };
  }