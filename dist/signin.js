// Handle Sign-In form submission
document.getElementById('signin-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting traditionally
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', result.token); // Save token for authentication
        window.location.href = 'dashboard.html'; // Redirect to dashboard or another page
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
  