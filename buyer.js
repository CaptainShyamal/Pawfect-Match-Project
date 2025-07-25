document.addEventListener("DOMContentLoaded", () => {
    const petList = document.getElementById("petList");

    function loadPets() {
        petList.innerHTML = ""; // Clear existing pets before reloading

        const savedPets = JSON.parse(localStorage.getItem("pets")) || [];

        savedPets.forEach(pet => {
            if (pet.name && pet.type) {
                addPetToList(pet);
            }
        });
    }

    function addPetToList(pet) {
        const petItem = document.createElement("div");
        petItem.className = "pet-item";
        petItem.innerHTML = `
            <img src="${pet.image || 'https://via.placeholder.com/150'}" alt="${pet.name}" class="pet-image">
            <h3>${pet.name}</h3>
            <p class="pet-details">Type: ${pet.type}</p>
            <p class="pet-details">${pet.description || 'No description available'}</p>
            <button class="adopt-btn">Adopt</button>
        `;

        petItem.querySelector(".adopt-btn").addEventListener("click", () => {
            alert(`Thank you for adopting ${pet.name}!`);
        });

        petList.appendChild(petItem);
    }

    // Load pets on page load
    loadPets();

    // Reload pets when localStorage changes
    window.addEventListener("storage", loadPets);
});
