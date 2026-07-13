const token = localStorage.getItem("adminToken");

if (!token) {

    window.location.href = "login.html";

}

fetch("http://localhost:5200/api/admin/verify", {

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

async function loadMessages() {

    try {
        const response = await fetch(
    "http://localhost:5200/api/messages",
    {
        headers: getAuthHeaders()
    }
);

const messages = await response.json();

        const tbody =
        document.getElementById(
        "messagesTableBody"
        );

        tbody.innerHTML = "";

        messages.forEach(message => {

            tbody.innerHTML += `

            <tr>

                <td>${message.name}</td>

                <td>${message.email}</td>

                <td>${message.phone}</td>

                <td>${message.message}</td>

                <td>
                    ${new Date(
                        message.createdAt
                    ).toLocaleDateString()}
                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadMessages();