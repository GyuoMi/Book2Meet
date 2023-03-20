<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import '@event-calendar/core/index.css';
    import Interaction from '@event-calendar/interaction'

    let text;
    let plugins = [TimeGrid,Interaction];
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        pointer: true,
        selectable: true,
        nowIndicator: true,
        headerToolbar: { start: 'prev,next today', center: 'title', end:''},
        events: createEvents(),
    };
function createEvents() { 
    let days = []; 
    for (let i = 0; i < 7; ++i) { 
	    let day = new Date(); 
	    let diff = i - day.getDay(); 
	    day.setDate(day.getDate() + diff); 
	    days[i] = day.getFullYear() + "-" + _pad(day.getMonth()+1) + "-" +_pad(day.getDate()); 
	}  
    return [
    {
        start: days[5] + " 18:00", 
        end: days[5] + " 21:00", 
        resourceId: 2, 
        title: "", 
        color: "#B29DD9"}, 
     ]; 
}

    function _pad(num) { 
        let norm = Math.floor(Math.abs(num)); 
        return (norm < 10 ? '0' : '') + norm; 
    } 
</script>
<Calendar {plugins} {options} />
