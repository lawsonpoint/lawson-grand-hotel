const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginBtn = loginForm.querySelector("button");

    loginBtn.disabled = true;
    loginBtn.innerHTML = `
        <span class="spinner"></span>
        Logging In...
    `;

    try {

        const response = await fetch(
            "https://lawson-grand-hotel.onrender.com/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    username: document.getElementById("username").value,

                    password: document.getElementById("password").value

                })
            }
        );

        const result = await response.json();

        if (result.success) {

            localStorage.setItem(
                "adminToken",
                result.token
            );

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginMessage").innerHTML =
                `<p class="error">${result.message}</p>`;

        }

    } catch (error) {

        document.getElementById("loginMessage").innerHTML =
            `<p class="error">Server Error</p>`;

    }

    loginBtn.disabled = false;
    loginBtn.innerHTML = "Login";

});