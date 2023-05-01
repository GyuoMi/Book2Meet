import database from '../api/database.js'

/** @type {import('./$types').Actions} */
export const actions = {
  getSearchedEmailEvents: async ({ request }) => {
    const responseData = await request.formData();
    const email = responseData.get('email');
    let clientEvents = await database.getJsonFromSelectQuery(
      `Select EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR FROM EVENT_TBL RIGHT JOIN CLIENT_TBL ON EVENT_TBL.CLIENT_ID = CLIENT_TBL.CLIENT_ID WHERE CLIENT_TBL.CLIENT_EMAIL = "${email}"`);
    let userBookings = await database.getJsonFromSelectQuery('Select EVENT_TBL.EVENT_ID,EVENT_TBL.EVENT_START,EVENT_TBL.EVENT_END,EVENT_TBL.EVENT_TITLE,EVENT_TBL.EVENT_COLOR FROM BOOKING_TBL LEFT JOIN EVENT_TBL ON BOOKING_TBL.EVENT_ID = EVENT_TBL.EVENT_ID');
    let allEvents = {
      results: clientEvents.results.concat(userBookings.results)
    };
    console.log(allEvents);
    return {
      success: true,
      post: allEvents,
    };
  }
}
