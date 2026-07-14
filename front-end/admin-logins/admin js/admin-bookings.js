const token = localStorage.getItem("adminToken");

if (!token) {

    window.location.href = "login.html";

}

fetch("https://lawson-grand-hotel.onrender.com/api/admin/verify", {

    headers: {

        Authorization: `Bearer ${token}`

    }

})
.then(res => {

    if (!res.ok) {

        localStorage.removeItem("adminToken");

        window.location.href = "login.html";

    }

});

async function loadBookings(){


try{
 const response = await fetch(
    "https://lawson-grand-hotel.onrender.com/api/bookings",
    {
        headers: getAuthHeaders()
    }
);

const bookings = await response.json();

    const table =
    document.getElementById(
    "bookingsTable"
    );

    table.innerHTML = "";

    bookings.forEach(booking => {

        const whatsappMessage =


`New Booking

Name: ${booking.fullName}

Room: ${booking.roomType}

Amount: ₦${booking.totalAmount}

Phone: ${booking.phone}`;


        let actionButtons = "";

        if(
            booking.status === "Pending"
        ){

            actionButtons = `
            <button
            class="approve-btn"
            onclick="updateBooking(
            '${booking._id}',
            'Confirmed'
            )">
            Approve
            </button>

            <button
            class="reject-btn"
            onclick="updateBooking(
            '${booking._id}',
            'Rejected'
            )">
            Reject
            </button>
            `;

        }else{

            actionButtons = `
            <span class="locked-status">
            ${booking.status}
            </span>
            `;

        }

        const paymentButton =

        booking.paymentStatus === "Paid"

        ?

        `<span class="paid-badge">
        Paid
        </span>`

        :

        `<button
        class="paid-btn"
        onclick="markPaid(
        '${booking._id}'
        )">
        Mark Paid
        </button>`;

        table.innerHTML += `

        <tr>

        <td>
        ${booking.bookingReference || "-"}
        </td>

        <td>
        ${booking.fullName}
        </td>

        <td>
        ${booking.roomType}
        </td>

        <td>
        ₦${booking.roomPrice?.toLocaleString() || 0}
        </td>

        <td>
        ${booking.nights || 0}
        </td>

        <td>
        ₦${booking.totalAmount?.toLocaleString() || 0}
        </td>

        <td>
        ${new Date(
            booking.checkIn
        ).toLocaleDateString()}
        </td>

        <td>

       ${booking.transactionReference}

        </td>

        
       
        <td>
        ${paymentButton}
        </td>

        <td>
        ${actionButtons}
        </td>

       
        <td>
        <a
        target="_blank"
        href="https://wa.me/2348071233350?text=${encodeURIComponent(whatsappMessage)}">

        WhatsApp

        </a>

        </td>

        </tr>

        `;

    });

}catch(error){

    console.error(error);

}


}

loadBookings();

async function updateBooking(
id, 
status
){


try{

    await fetch(

    `https://lawson-grand-hotel.onrender.com/api/bookings/${id}`,

    {

        method:"PATCH",

        headers:{
            ...getAuthHeaders(),
        },

        body:JSON.stringify({
            status
        })

    });

    loadBookings();

}catch(error){

    console.error(error);

}


}

async function markPaid(id){

try{

    await fetch(

    `https://lawson-grand-hotel.onrender.com/api/bookings/${id}/payment`,

    {
        method:"PATCH",
        headers: getAuthHeaders()
    });

    loadBookings();

}catch(error){

    console.error(error);

}


}


document
.getElementById("searchBooking")
.addEventListener("input", function(){

    const search =
    this.value.toLowerCase();

    const rows =
    document.querySelectorAll(
    "#bookingsTable tr"
    );

    rows.forEach(row => {

        const text =
        row.textContent.toLowerCase();

        row.style.display =
        text.includes(search)
        ? ""
        : "none";

    });

});
