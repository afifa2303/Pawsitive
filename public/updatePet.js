document.addEventListener('DOMContentLoaded', () => {
    const petId = new URLSearchParams(window.location.search).get('id');
    const form = document.getElementById('updatePetForm');
    const responseMessage = document.getElementById('responseMessage');
  
    // Fetch existing pet data to pre-fill the form
    fetch(`/pets/${petId}`)
      .then((res) => res.json())
      .then((pet) => {
        if (pet.error) throw new Error(pet.error);
  
        form.name.value = pet.name;
        form.age.value = pet.age;
        form.breed.value = pet.breed;
        form.gender.value = pet.gender;
        form.dietNutrition.value = pet.dietNutrition;
        form.healthWellness.value = pet.healthWellness;
        form.uniqueCharacteristics.value = pet.uniqueCharacteristics;
        form.miscellaneous.value = pet.miscellaneous;
      })
      .catch((error) => {
        console.error(error);
        responseMessage.textContent = 'Error fetching pet details.';
      });
  
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      fetch(`/pets/update/${petId}`, {
        method: 'PUT',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
  
          responseMessage.textContent = data.message;
        })
        .catch((error) => {
          console.error(error);
          responseMessage.textContent = 'Error updating pet profile.';
        });
    });
  });
  