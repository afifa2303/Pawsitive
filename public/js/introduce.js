// // register.js

// document.getElementById('register-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent default form submission
    
//     const form = event.target;
//     const formData = new FormData(form); // Collect form data including image
  
//     try {
//       const response = await fetch('/api/pets/introduce', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to register pet.');
//       }
  
//       const result = await response.json();
//       alert(result.message); // Show success message
//       form.reset(); // Reset the form
//       fetchPetProfiles(); // Refresh pet profiles
//     } catch (error) {
//       console.error(error);
//       alert('Failed to register pet.');
//     }
//   });
  