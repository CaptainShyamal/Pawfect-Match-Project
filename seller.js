document.getElementById("petForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;
  const description = document.getElementById("petDescription").value;
  const imageInput = document.getElementById("petImage");
  
  const reader = new FileReader();
  reader.onload = function(e) {
      const image = e.target.result; // Save image as Base64

      const newPet = { name, type, description, image };

      const savedPets = JSON.parse(localStorage.getItem("pets")) || [];
      savedPets.push(newPet);
      localStorage.setItem("pets", JSON.stringify(savedPets));

      alert("Your pet has been listed successfully!");

      // Reset form and preview
      document.getElementById("petForm").reset();
      document.getElementById("imagePreview").innerHTML = "No Image Selected";
  };

  if (imageInput.files[0]) {
      reader.readAsDataURL(imageInput.files[0]); // Convert image to Base64 before saving
  } else {
      alert("Please upload an image!");
  }
});
