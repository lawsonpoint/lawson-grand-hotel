function getAuthHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "application/json"
    };
}