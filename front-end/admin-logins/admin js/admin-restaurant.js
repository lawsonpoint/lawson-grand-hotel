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

async function loadReservations(){
   const response = await fetch("https://lawson-grand-hotel.onrender.com/api/restaurant", {
       headers: getAuthHeaders()
   });
   const reservations =
   await response.json();

    const table =
    document.getElementById(
    "restaurantTable"
    );

    table.innerHTML = "";

    reservations.forEach(
    reservation=>{
        let actionButtons = "";

if(reservation.status === "Pending"){

    actionButtons = `
    <button
    class="approve-btn"
    onclick="updateReservation(
    '${reservation._id}',
    'Confirmed'
    )">
    Approve
    </button>

    <button
    class="reject-btn"
    onclick="updateReservation(
    '${reservation._id}',
    'Rejected'
    )">
    Reject
    </button>
    `;

}else{

    actionButtons = `
    <span class="locked-status">
    ${reservation.status}
    </span>
    `;

}

        table.innerHTML +=

        `
        <tr>

        <td>${reservation.fullName}</td>

        <td>${reservation.phone}</td>

        <td>${reservation.email}</td>

        <td>${reservation.date}</td>

        <td>${reservation.time}</td>

        <td>${reservation.guests}</td>
        <td>${actionButtons}</td>

        <td>${reservation.status}</td>


    
        </tr>
        `;

    });

}

loadReservations();

async function updateReservation(
id,
status
){
      
    try{

        await fetch(

        `https://lawson-grand-hotel.onrender.com/api/restaurant/${id}`,

        {

            method:"PATCH",

            headers:{
                ...getAuthHeaders()
            },

            body:JSON.stringify({
                status
            })

        });

        loadReservations();

    }catch(error){

        console.error(error);

    }

}