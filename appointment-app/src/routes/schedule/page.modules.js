
/*the key values for the event objects returned from the database.js file uses the database naming format for the keys which is all caps, the scheduling library that we're can only read key values in a certain format. So we have to add a conversion.*/
export function convertJsonToEventObject(event) {
  const eventObj = {
		start: event.EVENT_START,
		end: event.EVENT_END,
		title: event.EVENT_TITLE,
		color: event.EVENT_COLOR
	};
	return eventObj;
	}	

/*following code parses events for a user returned by the database.js file. Formats each event and returns an event Object array which the calendar library can take in and add each event into the calendar*/
export function getArrayOfEventsFromDatabase(data) {
  
  if(data == null){
    return [];
  }
		let eventsJson = data.post.results;
		let eventObjects = [];
  if (eventsJson[0]['EVENT_ID'] == null){
    return [];
  }
		for (let i = 0; i < eventsJson.length; i++) { 
			eventObjects.push(convertJsonToEventObject(eventsJson[i]));
		}
		return eventObjects;
	}

	/*used to assign a random hex color to events on the calendar*/
	export function getRandomHexColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

	export function deleteEventFromCalender(ec,currentEventSelected) {
		ec.removeEventById(currentEventSelected.event.id);
	}
	/*will return a string of all events objects currently on the calendar, this is done so it can be bound to an <input bind:value=someVal> and sent through a <form> to the backend +page.server.js. We bind final string value to the allEvents variable which is then bound to the <input>.

		you might notice that 2 hours are added to each events start and end time, this was due to a bug which shifted the time of each event back 2 hours */
	export function getAllEventsFromCalendarAsJson(ec) {
		let eventsFromCalendar = ec.getEvents();
		let updatedEventsFromcalendar = [];
		//TEMPORARY FIX PLEASE!!!!!!!!!!!!!!
		for (let i = 0; i < eventsFromCalendar.length; i++) {
			let event = eventsFromCalendar[i];
			event.start.setHours(event.start.getHours() + 2);
			event.end.setHours(event.end.getHours() + 2);

			updatedEventsFromcalendar.push(event);
		}
		return JSON.stringify(updatedEventsFromcalendar);
	}

  

