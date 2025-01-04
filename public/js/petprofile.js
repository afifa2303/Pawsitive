async function fetchPetProfiles() {
  try {
    const response = await fetch('/api/pets/all'); // Correct API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch pet profiles.');
    }
    const pets = await response.json();
    displayPetProfiles(pets);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch pet profiles.');
  }
}

// Function to display pet profiles
function displayPetProfiles(pets) {
  const petProfilesContainer = document.getElementById('petProfiles');
  petProfilesContainer.innerHTML = ''; // Clear previous content

  pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.classList.add('pet-card');
    petCard.setAttribute('data-pet-id', pet.petId); // Add data-pet-id attribute

    petCard.innerHTML = `
      <img src="/uploads/${pet.image || 'default.png'}" alt="${pet.name}" class="pet-image">
      <h2>${pet.name}</h2>
      <p><strong>Age:</strong> ${pet.age}</p>
      <p><strong>Breed:</strong> ${pet.breed}</p>
      <p><strong>Gender:</strong> ${pet.gender}</p>
      <p><strong>Diet & Nutrition:</strong> ${pet.dietNutrition || 'N/A'}</p>
      <p><strong>Health & Wellness:</strong> ${pet.healthWellness || 'N/A'}</p>
      <p><strong>Unique Characteristics:</strong> ${pet.uniqueCharacteristics || 'N/A'}</p>
      <button class="remove-pet">Remove</button>
    `;

    // Add event listener for Remove button
    petCard.querySelector('.remove-pet').addEventListener('click', async (event) => {
      const petId = petCard.getAttribute('data-pet-id'); // Get petId from the card
      const confirmed = window.confirm(`Are you sure you want to delete ${pet.name}?`);
      if (!confirmed) {
        return; // Exit if the user cancels
      }
      try {
        const response = await fetch(`/api/pets/delete/${petId}`, { method: 'DELETE' });
        if (response.ok) {
          alert('Pet removed successfully!');
          fetchPetProfiles(); // Reload pet profiles
        } else {
          throw new Error('Failed to remove pet.');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to remove pet.');
      }
    });

    petProfilesContainer.appendChild(petCard); // Add pet card to the container
  });
}

// Fetch and display pet profiles when the page loads
document.addEventListener('DOMContentLoaded', fetchPetProfiles);
