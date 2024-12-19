document.getElementById('signup-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      window.location.href = 'signin.html'; // Redirect to sign-in page
      alert(result.message);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  }
});
