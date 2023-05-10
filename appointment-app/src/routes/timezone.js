import { DateTime } from "luxon";

export function convertDateToClientTimezone(uctTimeFromDb,clientTimezone){
  let uctTime = DateTime.fromISO(uctTimeFromDb);
  let rezonedTime = uctTime.setZone(clientTimezone);
  return rezonedTime.toString();
}

export function convertTimezoneOfEventList(eventList, clientTimezone) {
  for (let i = 0; i < eventList.results.length; i++) {
    eventList.results[i].EVENT_START = convertDateToClientTimezone(eventList.results[i].EVENT_START, clientTimezone);
    eventList.results[i].EVENT_END = convertDateToClientTimezone(eventList.results[i].EVENT_END, clientTimezone);
  }
  return eventList;
}

