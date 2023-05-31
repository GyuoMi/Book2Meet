<script lang = "ts">
    
    import { createEventDispatcher } from 'svelte';
    import { setContext, getContext } from 'svelte';


     /** @type {import('./$types').LayoutData} */
     export let data;

 let bookingChoice = null;
 let selectedbookingId = null;
 
   

 let bookingDetails = data.bookingDetails.results;
 
 
 //console.log(bookingDetails)

 //gets the table where BOOKING_VALID is null
 let tableData =bookingDetails;

 //gets the difference between EVENT_START and EVENT_ENF
 function getDuration(start, end) {
     const duration = new Date(end) - new Date(start);
     const hours = Math.floor(duration / (1000 * 60 * 60));
     const minutes = Math.floor((duration / (1000 * 60)) % 60);
     return `${hours}h ${minutes}m`;
 }
 

 // This is how take the booking ID and the value of the clicked button to back-end
 function handleSubmit(event, bookingID) {
 event.preventDefault();
 const formData = new FormData(event.target);
 bookingChoice = parseInt(formData.get('bookingChoice'), 10);
 selectedbookingId = parseInt(formData.get('selectedbookingId'), 10);
 setContext('bookingChoice', bookingChoice);
 setContext('selectedbookingId', selectedbookingId);
 
}


</script>



<div class="hero min-h-screen bg-base-100">

<!-- Header Text of the page-->
 <div class="lg:text-top">
     <h1 class="text-5xl font-bold" style="position:absolute; top:95px; left:150px">Confirm Bookings</h1>
     <p class="py-6 text-gray-400 font-medium" style="position:absolute; top:135px; left:150px">
         View, confirm or decline bookings which other users have scheduled with you.
     </p>
 </div>


 <div class="alert alert-info shadow-lg w-3/6 h-5" style="position:absolute; top:220px; left:145px">
     <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-4 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
       <span>Someone booked you for a meeting! Confirm or Decline below</span>
     </div>
   </div>


 <!-- Table of meetings booked with user, This where they can accept or decline-->
 <div class="card w-5/6 bg-base-100 shadow-xl" style="position:absolute; top:270px; left:100px">
     <div class="card-body">

         <div class="overflow-x-auto">
             {#if tableData.length > 0}
             <table class="table table-compact w-full">
               <thead>
                 <tr>
                     <th>Booked By</th>
                     <th>Date Booked</th>
                     <th>Duration</th>
                     <th>Accept/Decline Booking</th>
                 </tr>
               </thead> 
               <tbody>
                 {#each tableData as row}
                     <tr>
                     <td>{row.CLIENT_FIRST_NAME} {row.CLIENT_LAST_NAME}</td>
                     <td>{new Date(row.EVENT_START).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</td>
                     <td>{getDuration(row.EVENT_START, row.EVENT_END)}</td>
                     
                         <td>
                             <!-- form to get booking approval -->
                             <div class="flex-none">
                                 <form method="POST" action="?/bookingChoice" >
                                                   <input type="hidden" name="selectedbookingId" bind:value={row.BOOKING_ID}>
                                                   <button class="btn btn-sm btn-primary" type="submit" name="bookingChoice" value={1}>Accept</button>
                                 </form>
                                 <!-- form to get booking denial-->
                                 <form method="POST" action="?/bookingChoice">
                                                   <input type="hidden" name="selectedbookingId" bind:value={row.BOOKING_ID}>
                                                   <button  class="btn btn-sm btn-ghost" type="submit" name="bookingChoice" value={0}>Decline</button>
                                 </form>
 
                         </td>
                     
                     
                     
                     </tr>
                 {/each}
               </tbody>
                 
             </table>
         {:else if tableData.length === 0}
         <p>No one has booked meeting with you yet!</p>
         {:else}
         <p>Loading...</p>
         {/if}
     
         
             
         </div>
         
       

     </div>
 
   </div>
 

</div>

<!-- 
Footer
-->

<footer class="footer footer-center p-2 bg-primary text-primary-content">
 <div>
     <svg
         width="50"
         height="50"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
         fill-rule="evenodd"
         clip-rule="evenodd"
         class="inline-block fill-current"
         ><path
             d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
         /></svg
     >
     <p class="font-bold">
         Book2Meet (Pty) Ltd. <br />Providing reliable appointment platform
     </p>
     <p>Copyright © 2023 - All right reserved</p>
 </div>
 <div>
     <span class="footer-title">Social Media</span>
     <div class="grid grid-flow-col gap-4">
         <a
             ><svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 class="fill-current"
                 ><path
                     d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                 /></svg
             ></a
         >
         <a
             ><svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 class="fill-current"
                 ><path
                     d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                 /></svg
             ></a
         >
         <a
             ><svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 class="fill-current"
                 ><path
                     d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                 /></svg
             ></a
         >
     </div>
 </div>
</footer>

<slot />
