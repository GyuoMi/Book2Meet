
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

