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
        unselectAuto: true,
        nowIndicator: true,
        
        headerToolbar: { start: 'prev,next today', center: 'title', end:''},
        select: createEventWithPointer,
        
        //events: 
    };
    function setEvent(){

    }
    function formatDateTime(date){
       let formatedDate = date.getFullYear() + "-" + _pad(date.getMonth()+1) + "-" +_pad(date.getDate()) + " "+date.getHours()+":"+date.getMinutes(); 
        
       return formatedDate;

    }
    function createEventWithPointer(info) { 
        let timeStart= formatDateTime(info.start); 

        let timeEnd = formatDateTime(info.end); 
        
        ec.addEvent(
        {
            start: timeStart,
            end: timeEnd,
            resourceId:2,
            title: "this",
            color: "#779ECB"
        })
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
