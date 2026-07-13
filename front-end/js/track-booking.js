const trackingForm =
document.getElementById("trackingForm");

trackingForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const bookingReference =
document.getElementById("bookingReference").value;

const email =
document.getElementById("email").value;

const response =
await fetch(
"http://localhost:5200/api/bookings/track",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

bookingReference,

email

})

}

);

const result =
await response.json();

const output =
document.getElementById("trackingResult");

if(result.success){

const booking =
result.booking;

output.innerHTML = `

<div class="result-card">

<h2>Booking Found</h2>

<p><strong>Name:</strong> ${booking.fullName}</p>

<p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>

<p><strong>Room:</strong> ${booking.roomType}</p>

<p><strong>Transaction Reference:</strong> ${booking.transactionReference}</p>

<p><strong>Status:</strong>
<span class="status-badge ${booking.status.toLowerCase()}">
${booking.status}
</span>
</p>

<p><strong>Payment:</strong>
<span class="status-badge ${booking.paymentStatus.toLowerCase()}">
${booking.paymentStatus}
</span>
</p>

<p><strong>Check In:</strong>

${new Date(booking.checkIn).toDateString()}

</p>

<p><strong>Check Out:</strong>

${new Date(booking.checkOut).toDateString()}

</p>

</div>

`;

}else{

output.innerHTML =

"<p class='error'>Booking not found.</p>";

}

});