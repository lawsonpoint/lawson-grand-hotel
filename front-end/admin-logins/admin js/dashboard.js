async function loadDashboardStats(){

    try{

        const token = localStorage.getItem("adminToken");

        const hotelResponse =
        await fetch(
        "https://lawson-grand-hotel.onrender.com/api/bookings",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const restaurantResponse =
        await fetch(
        "https://lawson-grand-hotel.onrender.com/api/restaurant",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        

        const hotels =
        await hotelResponse.json();

        const restaurants =
        await restaurantResponse.json();

        document.getElementById(
        "hotelBookings"
        ).textContent =
        hotels.length;

        document.getElementById(
        "restaurantBookings"
        ).textContent =
        restaurants.length;

        

        document.getElementById(
        "totalReservations"
        ).textContent =
        hotels.length + restaurants.length;

    }catch(error){

        console.error(error);

    }

}

loadDashboardStats();

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

localStorage.removeItem("adminToken");

window.location.href="login.html";

});