const restaurantForm =
document.getElementById("restaurantForm");

if (restaurantForm) {

    restaurantForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const restaurantBtn =
        document.getElementById("restaurantBtn");

        restaurantBtn.disabled = true;

        restaurantBtn.innerHTML = `
        <span class="spinner"></span>
        Processing...
        `;

        try {

            const response =
            await fetch(
                "http://localhost:5200/api/restaurant",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        fullName:
                        document.getElementById("name").value,

                        phone:
                        document.getElementById("phone").value,

                        email:
                        document.getElementById("email").value,

                        date:
                        document.getElementById("date").value,

                        time:
                        document.getElementById("time").value,

                        guests:
                        document.getElementById("guests").value

                    })

                }
            );

            const result =
            await response.json();

            if (response.ok) {

                document.getElementById(
                    "restaurantMessage"
                ).innerHTML = `
                <p class="success">
                ✅ Reservation Submitted Successfully!
                </p>
                `;

                restaurantForm.reset();

            } else {

                document.getElementById(
                    "restaurantMessage"
                ).innerHTML = `
                <p class="error">
                ${result.error || "Reservation Failed."}
                </p>
                `;

            }

        } catch (error) {

            console.error(error);

            document.getElementById(
                "restaurantMessage"
            ).innerHTML = `
            <p class="error">
            Unable to connect to the server.
            Please try again.
            </p>
            `;

        }

        restaurantBtn.disabled = false;

        restaurantBtn.innerHTML =
        "Reserve Table";

    });

}