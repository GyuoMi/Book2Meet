<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import '@event-calendar/core/index.css';
    import Interaction from '@event-calendar/interaction'


    let plugins = [TimeGrid,Interaction];
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        pointer: true,
        selectable: true,
        unselectAuto: false,
        nowIndicator: true,
        headerToolbar: { start: 'prev,next today', center: 'title', end:''},
        events: createEvents(),
    };
    function createEvents() { 
        
    }
    function setEvent(){

    }

    function _pad(num) { 
        let norm = Math.floor(Math.abs(num)); 
        return (norm < 10 ? '0' : '') + norm; 
    } 
</script>
<Calendar {plugins} {options} />
