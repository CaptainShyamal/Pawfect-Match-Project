document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  // Validate inputs
  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  // Get existing users or initialize empty array
  let users = JSON.parse(localStorage.getItem("petAppUsers")) || [];

  // Check if user exists
  if (users.some(user => user.email === email)) {
    alert("Email already registered. Please login.");
    window.location.href = '../login/login.html'; // Relative path
    return;
  }

  // Create and save new user
  users.push({
    id: Date.now(),
    name,
    email,
    password, // Note: In production, hash passwords!
    registeredAt: new Date().toISOString()
  });

  localStorage.setItem("petAppUsers", JSON.stringify(users));
  console.log("Registration successful. Users:", users);
  
  alert("Registration successful! Redirecting to login...");
  window.location.href = '../login/login.html'; // Relative path
});