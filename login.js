document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  loginForm.appendChild(errorDiv);

  // Add CSS for error messages
  const style = document.createElement("style");
  style.textContent = `
    .error-message {
      color: #d32f2f;
      background-color: #ffebee;
      padding: 8px 12px;
      border-radius: 4px;
      margin: 10px 0;
      font-size: 14px;
      border: 1px solid #ef9a9a;
    }
  `;
  document.head.appendChild(style);

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    errorDiv.textContent = "";

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Basic validation
    if (!email || !password) {
      errorDiv.textContent = "Please enter both email and password";
      return;
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorDiv.textContent = "Please enter a valid email address";
      return;
    }

    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("petAppUsers")) || [];
    console.log("Registered users:", users); // Debug log

    // Find matching user
    const user = users.find(u => 
      u.email.toLowerCase() === email && 
      u.password === password
    );

    if (user) {
      // Store current user session
      localStorage.setItem("petAppCurrentUser", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        lastLogin: new Date().toISOString()
      }));

      // Redirect to dashboard/homepage
      window.location.href = "../dashboard/dashboard.html"; // Update this path as needed
    } else {
      errorDiv.textContent = "Invalid email or password. Please try again.";
      document.getElementById("password").value = ""; // Clear password field
      console.log("Login failed. No matching user found."); // Debug log
    }
  });
});