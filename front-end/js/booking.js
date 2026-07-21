/* =========================================================
   LAWSON GRAND HOTEL BOOKING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const bookingForm = document.getElementById("bookingForm");
    const roomField = document.getElementById("room");
    const checkInField = document.getElementById("checkin");
    const checkOutField = document.getElementById("checkout");
    const bookingSummary = document.getElementById("bookingSummary");
    const bookingMessage = document.getElementById("bookingMessage");
    const reserveBtn = document.getElementById("reserveBtn");

    if (!bookingForm) return;

    /* =====================================
       PRESELECT ROOM FROM URL
    ===================================== */

    const params = new URLSearchParams(window.location.search);

    const selectedRoom = params.get("room");

    if (selectedRoom) {

        roomField.value = selectedRoom;

    }

    /* =====================================
       ROOM PRICE
    ===================================== */

    function getRoomPrice(room) {

        switch (room) {

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

    /* =====================================
       BOOKING SUMMARY
    ===================================== */

    function updateBookingSummary() {

        const room = roomField.value;

        if (!room) {

            bookingSummary.innerHTML = "";

            return;

        }

        const roomPrice = getRoomPrice(room);

        let nights = 1;

        if (checkInField.value && checkOutField.value) {

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

            <p><strong>Price Per Night:</strong>
            ₦${roomPrice.toLocaleString()}</p>

            <p><strong>Nights:</strong> ${nights}</p>

            <h2>Total: ₦${total.toLocaleString()}</h2>

        `;

    }

    roomField.addEventListener("change", updateBookingSummary);

    checkInField.addEventListener("change", updateBookingSummary);

    checkOutField.addEventListener("change", updateBookingSummary);

    updateBookingSummary();

    /* =====================================
       SUBMIT BOOKING
    ===================================== */

    bookingForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        reserveBtn.disabled = true;

        reserveBtn.innerHTML = `
        <span class="spinner"></span>
        Saving Reservation...
        `;

        try {

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

            const totalAmount = roomPrice * nights;

            const bookingData = {

                fullName:
                document.getElementById("name").value,

                email:
                document.getElementById("email").value,

                phone:
                document.getElementById("phone").value,

                roomType,

                roomPrice,

                guests:
                Number(document.getElementById("guests").value),

                checkIn:
                checkInField.value,

                checkOut:
                checkOutField.value,

                nights,

                totalAmount

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

            if (!response.ok) {

                throw new Error(

                    result.error ||

                    "Unable to submit booking."

                );

            }

            /* Disable form */

            bookingForm.querySelectorAll(

                "input,select"

            ).forEach(input => {

                input.disabled = true;

            });

            bookingSummary.insertAdjacentHTML(
    "beforeend",
    `
    <p class="booking-reference">
        Booking Reference:
        <strong>${result.booking.bookingReference}</strong>
    </p>
    `
);

            // No success message
bookingMessage.innerHTML = "";
const whatsappMessage = `Hello Lawson Grand Hotel,

I have just submitted a room reservation through your website.

Booking Reference:
${result.booking.bookingReference}

Name:
${bookingData.fullName}

Phone:
${bookingData.phone}

Email:
${bookingData.email}

Room:
${bookingData.roomType}

Guests:
${bookingData.guests}

Check-in:
${bookingData.checkIn}

Check-out:
${bookingData.checkOut}

Nights:
${bookingData.nights}

Estimated Total:
₦${bookingData.totalAmount.toLocaleString()}

Kindly let me know if this room is available.

Thank you.`;

reserveBtn.disabled = false;

reserveBtn.classList.add("whatsapp-ready");

reserveBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="currentColor"
viewBox="0 0 16 16">
<path d="M13.601 2.326A7.854 7.854 0 0 0 8.01 0C3.58 0 0 3.58 0 8.01a7.94 7.94 0 0 0 1.18 4.188L0 16l3.93-1.15A7.94 7.94 0 0 0 8.01 16C12.44 16 16 12.42 16 7.99a7.85 7.85 0 0 0-2.399-5.664z"/>
</svg>

<span>Continue Reservations on WhatsApp</span>
`;

reserveBtn.onclick = () => {

    window.open(

        `https://wa.me/2348134022589?text=${encodeURIComponent(whatsappMessage)}`,

        "_blank"

    );

};

        }

        catch (error) {

            console.error(error);

            reserveBtn.disabled = false;

            reserveBtn.innerHTML =

            "Reserve Now";

            bookingMessage.innerHTML = `

            <p class="error">

            ${error.message}

            </p>

            `;

        }

    });

});

/* =====================================
   WHATSAPP POPUP
===================================== */

const popup = document.getElementById("whatsappPopup");

const closePopup = document.getElementById("closePopup");

window.addEventListener("load", () => {

    if (!popup) return;

    setTimeout(() => {

        popup.style.display = "block";

    }, 2500);

});

if (closePopup) {

    closePopup.addEventListener("click", () => {

        popup.style.display = "none";

    });

}

/* =====================================
   LIVE MESSAGE TIME
===================================== */

function updateMessageTime() {

    const time = document.getElementById("messageTime");

    if (!time) return;

    time.textContent =

        "Today • " +

        new Date().toLocaleTimeString([], {

            hour: "numeric",

            minute: "2-digit"

        });

}

updateMessageTime();

setInterval(updateMessageTime, 60000);