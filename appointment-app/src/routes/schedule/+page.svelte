<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import '@event-calendar/core/index.css';
    import Interaction from '@event-calendar/interaction';
    /** @type {import('./$types').PageServerLoad} */ 
    export let data;

    let ec;
    let eventSelected;
    let plugins = [TimeGrid,Interaction];
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        pointer: true,
        selectable: true,
        unselectAuto: true,
        nowIndicator: true,
        height: "800px",
        headerToolbar: { start: 'prev,next today', center: 'title', end:''},
        select: createEventWithPointer,
        eventClick: getCurrentEventClicked,
        events: getArrayOfEventsFromDatabase()
    };
    
    function formatDateTime(date){
       let formatedDate = date.getFullYear() + "-" + _pad(date.getMonth()+1) + "-" +_pad(date.getDate()) + " "+date.getHours()+":"+date.getMinutes(); 
        
       return formatedDate;

    }
    function formatEventObject(event){
        const eventObj = {
            start: event.Event_Start,
            end: event.Event_End,
            title: event.Event_Title,
            color: event.Event_Colour
        };

        return eventObj;
    }
    function createEventWithPointer(info) { 
        let timeStart= formatDateTime(info.start); 

        let timeEnd = formatDateTime(info.end); 
        
        ec.addEvent(
        {
            start: timeStart,
            end: timeEnd,
            title: "Availiable for Appointment",
            color: getRandomHexColor()
        })
    }
    function getCurrentEventClicked(info){
       eventSelected = info;
       
    }


    function deleteEventFromCalender(){
        console.log(eventSelected);
        ec.removeEventById(eventSelected.event.id);
    }

    function getArrayOfEventsFromDatabase(){
        let eventsJson = data.post.results;
        let eventObjects = [];
        for(let i = 0; i<eventsJson.length; i++){
            
            eventObjects.push(formatEventObject(eventsJson[i]))
        }
        return eventObjects;
    }
    

    

    //setInterval(saveAllEventsIntoDatabase,1000);
function getRandomHexColor() {
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}
    /*
    example of what data needs to be in the event object. 
    {
        
        start: days[5] + " 10:00", 
        end: days[5] + " 16:00", 
        resourceId: 2, titleHTML: "You have complete control over the <i><b>display</b></i> of events…", 
        color: "#779ECB"
    }*/ 
    function _pad(num) { 
        let norm = Math.floor(Math.abs(num)); 
        return (norm < 10 ? '0' : '') + norm; 
    } 
</script>


<Calendar bind:this={ec} {plugins} {options} />

<div class="flex flex-col items-center ">
    <button on:click={deleteEventFromCalender} class="btn btn-primary place-item-center">Delete Event</button>
</div>