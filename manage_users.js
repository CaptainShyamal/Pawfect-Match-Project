// document.addEventListener("DOMContentLoaded", function () {
//     const userTable = document.getElementById("userTable");

//     function loadUsers() {
//         const users = JSON.parse(localStorage.getItem("users")) || [];
//         userTable.innerHTML = "";

//         users.forEach((user, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${index + 1}</td>
//                 <td>${user.name || "N/A"}</td>
//                 <td>${user.email}</td>
//                 <td><button onclick="deleteUser('${user.email}')">Delete</button></td>
//             `;
//             userTable.appendChild(row);
//         });
//     }

//     window.deleteUser = function (email) {
//         let users = JSON.parse(localStorage.getItem("users")) || [];
//         users = users.filter(user => user.email !== email);
//         localStorage.setItem("users", JSON.stringify(users));
//         loadUsers();
//     };

//     loadUsers();
// });
document.addEventListener("DOMContentLoaded", function() {
    const userTable = document.getElementById("userTable");
    const refreshBtn = document.getElementById("refreshBtn");

    // Load users on page load
    loadUsers();

    // Refresh button functionality
    refreshBtn.addEventListener("click", loadUsers);

    function loadUsers() {
        // Clear existing table rows
        userTable.innerHTML = '';

        // Get all registered users
        const registeredUsers = JSON.parse(localStorage.getItem("petAppUsers")) || [];
        
        // Get active sessions
        const activeSessions = JSON.parse(localStorage.getItem("petAppActiveSessions")) || {};

        registeredUsers.forEach(user => {
            const row = document.createElement("tr");
            
            // Check if user is active
            const isActive = activeSessions[user.id] !== undefined;
            const lastActive = isActive ? new Date(activeSessions[user.id].lastActive) : null;

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="${isActive ? 'status-active' : 'status-inactive'}">
                    ${isActive ? 'Active' : 'Inactive'}
                </td>
                <td>${lastActive ? lastActive.toLocaleString() : 'Never'}</td>
                <td>
                    ${isActive ? 
                        `<button class="action-btn deactivate-btn" data-id="${user.id}">Deactivate</button>` : 
                        `<button class="action-btn activate-btn" data-id="${user.id}">Activate</button>`
                    }
                </td>
            `;

            userTable.appendChild(row);
        });

        // Add event listeners to action buttons
        document.querySelectorAll(".action-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const userId = this.getAttribute("data-id");
                if (this.classList.contains("deactivate-btn")) {
                    deactivateUser(userId);
                } else {
                    activateUser(userId);
                }
            });
        });
    }

    function activateUser(userId) {
        const activeSessions = JSON.parse(localStorage.getItem("petAppActiveSessions")) || {};
        const users = JSON.parse(localStorage.getItem("petAppUsers")) || [];
        
        const user = users.find(u => u.id === userId);
        if (user) {
            activeSessions[userId] = {
                userId: userId,
                email: user.email,
                lastActive: new Date().toISOString()
            };
            localStorage.setItem("petAppActiveSessions", JSON.stringify(activeSessions));
            loadUsers();
        }
    }

    function deactivateUser(userId) {
        const activeSessions = JSON.parse(localStorage.getItem("petAppActiveSessions")) || {};
        delete activeSessions[userId];
        localStorage.setItem("petAppActiveSessions", JSON.stringify(activeSessions));
        loadUsers();
    }
});