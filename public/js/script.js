// Handle Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  });
  
  // Handle Login
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        // Redirect to home.html
        window.location.href = 'templates/home.html';
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  });

  