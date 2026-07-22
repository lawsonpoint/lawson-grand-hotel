const booking =
JSON.parse(
sessionStorage.getItem("booking")
);

if(booking){

document.getElementById(
"bookingDetails"
).innerHTML =

`

<p>

<strong>Name:</strong>

${booking.fullName}

</p>

<p>

<strong>Booking Reference:</strong>

${booking.bookingReference}

</p>

<p>

<strong>Room:</strong>

${booking.roomType}

</p>

<p>

<strong>Total:</strong>

₦${booking.totalAmount.toLocaleString()}

</p>



<p>

<strong>Status:</strong>

${booking.status}

</p>

`;

}