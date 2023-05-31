<script>
    /** @type {import('./$types').PageServerLoad} */
    export let data;
  
    let showMessage = false;
    let desiredEventID = "";
  
    function handleClick(eventId) {
      showMessage = !showMessage;
      desiredEventID = eventId; // Set the desiredEventID to the selected eventId
    }
  
    //obtain the separate queries from data
    let bookingDetails = data.bookingDetails.results;
    let allBookings = data.allBookings.results;
  
    //sort the results returned according to the start date/times
    let bookings = [];
    bookingDetails.sort((a, b) => new Date(a.EVENT_START) - new Date(b.EVENT_START));
    let waitingList = [];
    allBookings.sort((a, b) => new Date(a.EVENT_START) - new Date(b.EVENT_START));
    let cancelledBookings = [];
    //checks each booking to see status of event 
    bookingDetails.forEach(function (booking) {
      let eventId = booking.EVENT_ID;
      let eventWaitingList = [];
      allBookings.forEach(function (entry) {
        if (entry.EVENT_ID === eventId) {
          eventWaitingList = eventWaitingList.concat(entry)
        }
        eventWaitingList.sort((a, b) => new Date(a.DATE_BOOKED) - new Date(b.DATE_BOOKED));
      });
    //   if (eventWaitingList.length > 0 && eventWaitingList[0].CLIENT_ID === booking.CLIENT_ID) {
        if (booking.BOOKING_VALID) {
          bookings.push(booking);
        } else {
          cancelledBookings.push(booking);
        }
    //   } else {
    //     if (booking.BOOKING_VALID) {
    //       waitingList.push(booking);
    //     } else {
    //       cancelledBookings.push(booking);
    //     }
    //   }
    });
  
  </script>
 
  <div class="hero min-h-screen bg-base-100">

    <div class="lg:text-top">
      <h1 class="text-5xl font-bold" style="position:absolute; top:95px; left:150px">Upcoming Meetings</h1>
      <p class="py-6 text-gray-400 font-medium" style="position:absolute; top:135px; left:150px">
        See Upcoming meetings and waitlist order!
      </p>
    </div>
  
    <div class="card w-5/6 bg-base-100 shadow-xl" style="position:absolute; top:200px">
      <div class="card-body">
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th>Meeting Name</th>
              <th>Booked With</th>
              <th>Time</th>
              <th>Waiting List</th>
            </tr>
          </thead>
          <tbody>
            <!--loops over every object returned from backend-->
            {#each bookings as booking}
            <!--the rows of the table-->
            <tr>
              <td>{booking.EVENT_TITLE}</td>
              <td>{booking.CLIENT_FIRST_NAME + " " + booking.CLIENT_LAST_NAME}</td>
              <td>{new Date(booking.EVENT_START).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }) + " - " + new Date(booking.EVENT_END).toLocaleString(undefined, {
                  hour: 'numeric',
                  minute: 'numeric'
                })}</td>
              <td>
                <div class="dropdown">
                    <button class="btn btn-circle swap swap-rotate" style="height: 1.5rem; width: 1.5rem" on:click={() => handleClick(booking.EVENT_ID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>                      
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                    <div class="overflow-x-auto">
                      <table class="table table-compact w-full">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                            <!-- filters the EVENT_ID from onclick and lists waiting list for that specific event -->
                          {#each allBookings.filter(booking => booking.EVENT_ID === desiredEventID) as booking}
                          <tr>
                            <td>{booking.CLIENT_FIRST_NAME.substring(0,1) + ". " + booking.CLIENT_LAST_NAME}</td>
                            <td>{new Date(booking.EVENT_START).toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false
                              })}</td>
                          </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  
  </div>
  
    
    
