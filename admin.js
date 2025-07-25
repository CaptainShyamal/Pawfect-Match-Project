// admin.js
document.addEventListener("DOMContentLoaded", function() {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("petAppCurrentUser"));
  
  
  // Update UI with logged in user info
  const adminContainer = document.querySelector(".admin-container");
  const welcomeMessage = document.createElement("h3");
  welcomeMessage.textContent = `Welcome, ${currentUser.name || "Admin"}!`;
  welcomeMessage.style.marginBottom = "1rem";
  welcomeMessage.style.color = "#333";
  adminContainer.insertBefore(welcomeMessage, adminContainer.querySelector("h2").nextSibling);

  // Add last login time if available
  if (currentUser.lastLogin) {
    const lastLogin = document.createElement("p");
    lastLogin.textContent = `Last login: ${new Date(currentUser.lastLogin).toLocaleString()}`;
    lastLogin.style.marginBottom = "1rem";
    lastLogin.style.fontSize = "0.9rem";
    adminContainer.insertBefore(lastLogin, welcomeMessage.nextSibling);
  }

  // Update current user's last login time
  currentUser.lastLogin = new Date().toISOString();
  localStorage.setItem("petAppCurrentUser", JSON.stringify(currentUser));

  // Logout functionality
  document.querySelector(".logout").addEventListener("click", function() {
    localStorage.removeItem("petAppCurrentUser");
    window.location.href = "../login/login.html";
  });

  // Dashboard item click handlers
  document.getElementById("manageUsers").addEventListener("click", function() {
    window.location.href = "../manage_users/manage_users.html";
  });

  document.getElementById("managePets").addEventListener("click", function() {
    window.location.href = "../manage_pets/manage_pets.html";
  });

  // Add activity logging
  console.log(`Admin dashboard accessed by ${currentUser.email} at ${new Date().toISOString()}`);
});