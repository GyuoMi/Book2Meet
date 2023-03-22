<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import '@event-calendar/core/index.css';
    import Interaction from '@event-calendar/interaction'
    
    let ec;
    let plugins = [TimeGrid,Interaction];
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        pointer: true,
        selectable: true,
        unselectAuto: false,
        nowIndicator: true,
        
        headerToolbar: { start: 'prev,next today', center: 'title', end:''},
        select: createEvents,
        
        //events: 
    };
    function setEvent(){

    }
    function createEvents() { 
        /*ec.setEvent([
        {
            start: info.start,
            end: info.end,
            resourceId:2,
            titleHTML: "this",
            color: "#779ECB"
        }])*/
        let days = []; 
    for (let i = 0; i < 7; ++i) { 
	    let day = new Date(); 
	    let diff = i - day.getDay(); 
	    day.setDate(day.getDate() + diff); 
	    days[i] = day.getFullYear() + "-" + _pad(day.getMonth()+1) + "-" +_pad(day.getDate()); 
	    } 
        ec.addEvent({
        
        start: days[5] + " 10:00", 
        end: days[5] + " 16:00", 
        resourceId: 2, titleHTML: "You have complete control over the <i><b>display</b></i> of events…", 
        color: "#779ECB"
    })
    }
    function _pad(num) { let norm = Math.floor(Math.abs(num)); return (norm < 10 ? '0' : '') + norm; } 
    /*
    example of what data needs to be in the event object. 
    {
        
        start: days[5] + " 10:00", 
        end: days[5] + " 16:00", 
        resourceId: 2, titleHTML: "You have complete control over the <i><b>display</b></i> of events…", 
        color: "#779ECB"
    }*/ 
</script>
<button on:click={createEvents}>this</button>
<Calendar bind:this={ec} {plugins} {options} />
