import database from '../api/database.js'

/** @type {import('./$types').Actions} */
export const actions = {
  getSearchedEmailEvents: async ({request})=>{
    const responseData = await request.formData();
    const email = responseData.get('email');
    let clientEvents = await database.getJsonFromSelectQuery(
      `Select EVENT_ID,EVENT_START,EVENT_END,EVENT_TITLE,EVENT_COLOR FROM EVENT_TBL RIGHT JOIN CLIENT_TBL ON EVENT_TBL.CLIENT_ID = CLIENT_TBL.CLIENT_ID WHERE CLIENT_TBL.CLIENT_EMAIL = "${email}"`);
    return{
      success: true,
      post: clientEvents
    };
  }
}
