import database from '../api/database.js';   

/** @type {import('./$types').PageServerLoad} */ 

export async function load({ params }) {
  const eventsFromDatabase = await database.getJsonFromSelectQuery("Select * from Event where ClientID = 1")
  
  return {
    post: eventsFromDatabase
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  updateDatabaseEvents: async (event) => {
    
  },
  
};

