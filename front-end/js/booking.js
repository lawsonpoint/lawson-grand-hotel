
window.addEventListener("DOMContentLoaded", () => {
    
const urlParams =
new URLSearchParams(
window.location.search
);

const selectedRoom =
urlParams.get("room");

if(selectedRoom){

    const roomField =
    document.getElementById("room");

    if(roomField){

        roomField.value =
        selectedRoom;

        roomField.dispatchEvent(
            new Event("change")
        );

    }

}



    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;

    bookingForm.addEventListener("submit", submitBooking);

    roomField.addEventListener("change", updateBookingSummary);
    checkInField.addEventListener("change", updateBookingSummary);
    checkOutField.addEventListener("change", updateBookingSummary);

});

const roomField = document.getElementById("room");
const checkInField = document.getElementById("checkin");
const checkOutField = document.getElementById("checkout");

const bookingSummary =
document.getElementById("bookingSummary");

const paymentDetails =
document.getElementById("paymentDetails");

const totalPayment =
document.getElementById("totalPayment");

function getRoomPrice(room){

    switch(room){

        case "Deluxe Room":
            return 35000;

        case "Executive Room":
            return 40000;

        case "Exclusive Room":
            return 45000;

        case "Suite Room":
            return 55000;

        default:
            return 0;

    }

}

function updateBookingSummary(){

    const room = roomField.value;

    if(room === ""){

        bookingSummary.innerHTML = "";

        paymentDetails.style.display = "none";
        document.getElementById("transactionReference").required = false;

        return;

    }

    const roomPrice = getRoomPrice(room);

    let nights = 1;

    if(checkInField.value && checkOutField.value){

        const checkIn = new Date(checkInField.value);

        const checkOut = new Date(checkOutField.value);

        nights = Math.max(
            1,
            Math.ceil(
                (checkOut - checkIn) /
                (1000 * 60 * 60 * 24)
            )
        );

    }

    const total = roomPrice * nights;

    bookingSummary.innerHTML = `
        <h3>Booking Summary</h3>

        <p><strong>Room:</strong> ${room}</p>

        <p><strong>Price Per Night:</strong> ₦${roomPrice.toLocaleString()}</p>

        <p><strong>Nights:</strong> ${nights}</p>

        <h2>Total: ₦${total.toLocaleString()}</h2>
    `;

    totalPayment.innerHTML =
    `Total Amount: ₦${total.toLocaleString()}`;

    paymentDetails.style.display = "block";
    document.getElementById("transactionReference").required = true;

}

async function submitBooking(e){

    e.preventDefault();
    const reserveBtn =
document.getElementById("reserveBtn");

reserveBtn.disabled = true;

reserveBtn.innerHTML =
`
<span class="spinner"></span>
Processing Booking...
`;


    try{

        const roomType = roomField.value;

        const roomPrice = getRoomPrice(roomType);

        const checkIn = new Date(checkInField.value);

        const checkOut = new Date(checkOutField.value);

        const nights = Math.max(
            1,
            Math.ceil(
                (checkOut - checkIn) /
                (1000 * 60 * 60 * 24)
            )
        );

        const totalAmount =
        roomPrice * nights;


        const bookingData = {
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    roomType: roomType,
    roomPrice: roomPrice,
    guests: Number(document.getElementById("guests").value),
    checkIn: checkInField.value,
    checkOut: checkOutField.value,
    nights: nights,
    totalAmount: totalAmount,
    transactionReference: document.getElementById("transactionReference").value
};


const response = await fetch(
    "https://lawson-grand-hotel.onrender.com/api/bookings",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    } 
);

const result = await response.json();

        if(response.ok){

    reserveBtn.disabled = false;  

    reserveBtn.innerHTML = "Reserve Now";

    document.getElementById(
        "bookingMessage"
    ).innerHTML =
    "<p class='success'>✓ Booking Submitted Successfully!</p>";

    sessionStorage.setItem(
        "booking",
        JSON.stringify(result.booking)
    );

    setTimeout(()=>{

        window.location.href =
        "booking-success.html";

    },2000);

}
        
        else{
            reserveBtn.disabled = false;

        reserveBtn.innerHTML =
        "Reserve Now";

            document.getElementById(
                "bookingMessage"
            ).innerHTML =
            `<p class='error'>${result.error}</p>`;

        }

    }catch(error){
        reserveBtn.disabled = false;

reserveBtn.innerHTML =
"Reserve Now";

        console.error(error);

        document.getElementById(
            "bookingMessage"
        ).innerHTML =
        "<p class='error'>Unable to submit booking. Please try again.</p>";

    }

}
