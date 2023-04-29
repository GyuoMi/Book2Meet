<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import { getArrayOfEventsFromDatabase } from '../schedule/page.modules';
 /** @type {import('./$types').ActionData} */    
  export let form;

  let eventsFromClient;
  let ec;
  let plugins = [TimeGrid, Interaction];
	let options = {
		view: 'timeGridWeek',
		allDaySlot: false,
		pointer: true,
		selectable: true,
		unselectAuto: true,
		nowIndicator: true,
		height: '800px',
		headerToolbar: { start: 'prev,next today', center: 'title', end: '' },
    events: getArrayOfEventsFromDatabase(form)
  }
   
</script>

<form method="POST" action="?/getSearchedEmailEvents">
<div align="center">
  <input name="email" type="text" placeholder="search by email" class="input input-bordered input-primary w-100" />
  <button class="btn btn-primary">Button</button>
</div>
</form>
<Calendar bind:this={ec} {plugins} {options} />
