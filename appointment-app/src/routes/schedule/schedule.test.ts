import { convertJsonToEventObject,deleteEventFromCalender} from './page.modules.js';
import { describe,assert,it, test, expect} from 'vitest';
import Page from './+page.svelte';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import Interaction from '@event-calendar/interaction';
import {createEventWithPointer} from './+page.svelte';
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
  const ec = {
      addEvent: (event) => {
        assert.deepEqual(event, {
          start: '2022-03-21 10:20',
          end: '2022-03-21 11:20',
          title: 'Availiable for Appointment',
          color: '#123456'
        });
      }
    };

// createEventWithPointer
test('createEventWithPointer adds a new event to the calendar', () => {
    const info = {
      start: new Date('2022-03-21T10:20:00'),
      end: new Date('2022-03-21T11:20:00')
    };
    createEventWithPointer(info);
  });
  
  // getCurrentEventClicked
  it('stores the currently clicked event in the eventSelected variable', async () => {
    const info = {
      event: {
        id: '12345',
        title: 'Some event'
      }
    };
    Page.getCurrentEventClicked(info);
    expect(Page.eventSelected).toEqual(info);
  });
  
  // deleteEventFromCalendar
  it('removes the currently selected event from the calendar', async () => {
    const event = {
      id: '12345',
      title: 'Some event'
    };
    const info = {
      event
    };
    ec.addEvent(event);
    const removeEventByIdSpy = jest.spyOn(ec, 'removeEventById');
    Page.getCurrentEventClicked(info);
    Page.deleteEventFromCalendar();
    expect(removeEventByIdSpy).toHaveBeenCalledWith(event.id);
    removeEventByIdSpy.mockRestore();
  });
 });
 
