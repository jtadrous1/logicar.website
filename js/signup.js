document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  const emailInput = document.getElementById('emailInput');
  const signupMessage = document.getElementById('signupMessage');

  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      if (!emailInput.value || !emailInput.value.includes('@')) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }

      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      
      // Simulating API call
      setTimeout(() => {
        showMessage('Thank you! We\'ll notify you when LogiCar launches.', 'success');
        emailInput.value = '';
        
        // Reset message after 5 seconds
        setTimeout(() => {
          signupMessage.textContent = '';
          signupMessage.classList.remove('visible', 'success', 'error');
        }, 5000);
      }, 1000);
    });
  }

  function showMessage(text, type) {
    signupMessage.textContent = text;
    signupMessage.classList.add('visible', type);
  }
}); 