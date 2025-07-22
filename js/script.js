// Existing code...

// Add the signup functionality
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
  
  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  window.toggleMobileMenu = () => {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  };
  
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Pricing toggle
  const togglePricing = () => {
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyToggle = document.getElementById('monthlyToggle');
    const yearlyToggle = document.getElementById('yearlyToggle');
    const premiumPrice = document.getElementById('premiumPrice');
    
    if (pricingToggle && monthlyToggle && yearlyToggle && premiumPrice) {
      if (pricingToggle.checked) {
        monthlyToggle.classList.remove('active');
        yearlyToggle.classList.add('active');
        premiumPrice.textContent = '$59.99/year';
      } else {
        monthlyToggle.classList.add('active');
        yearlyToggle.classList.remove('active');
        premiumPrice.textContent = '$9.99/month';
      }
    }
  };
  
  // Make functions available globally
  window.togglePricing = togglePricing;
  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    }
  };
}); 