document.addEventListener("DOMContentLoaded", function () {
    const petList = document.getElementById("petList");
    const addPetBtn = document.getElementById("addPetBtn");
    
    addPetBtn.addEventListener("click", function () {
        const petName = document.getElementById("petName").value;
        const petType = document.getElementById("petType").value;
        const petImage = document.getElementById("petImage").value;
        const petDescription = document.getElementById("petDescription").value;
        
        if (petName && petType && petImage && petDescription) {
            const petItem = document.createElement("div");
            petItem.classList.add("pet-item");
            petItem.innerHTML = `
                <img src="${petImage}" alt="${petName}">
                <h4>${petName}</h4>
                <p>${petType}</p>
                <p>${petDescription}</p>
                <button class="remove-pet">Remove</button>
            `;
            
            petList.appendChild(petItem);
            updateBuyerPets();
            
            petItem.querySelector(".remove-pet").addEventListener("click", function () {
                petItem.remove();
                updateBuyerPets();
            });
        }
    });
    
    function updateBuyerPets() {
        const pets = [];
        document.querySelectorAll(".pet-item").forEach(item => {
            pets.push({
                name: item.querySelector("h4").innerText,
                type: item.querySelector("p:nth-of-type(1)").innerText,
                description: item.querySelector("p:nth-of-type(2)").innerText,
                image: item.querySelector("img").src
            });
        });
        
        localStorage.setItem("availablePets", JSON.stringify(pets));
    }
});
