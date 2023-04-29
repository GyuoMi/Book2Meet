import { describe, it, expect } from 'vitest';
import { convertJsonToEventObject } from './page.modules.js';

describe('equivalence tests', () => {
	it('checks if convertJsonToEventObject works as expected', () => {

    const eventObjGiven = {
      EVENT_START: '2023-04-25T08:30:00.000Z',
      EVENT_END: '2023-04-25T14:00:00.000Z',
      EVENT_TITLE: "Availiable for Appointment", 
      EVENT_COLOR: '#7d459a'
    }

    const eventObjExpected = {
      start: '2023-04-25T08:30:00.000Z',
      end: '2023-04-25T14:00:00.000Z',
      title: "Availiable for Appointment", 
      color: '#7d459a'
    }

		expect(convertJsonToEventObject(eventObjGiven)).toMatchObject(eventObjExpected);
	});

});
 
