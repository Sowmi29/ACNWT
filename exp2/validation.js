document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.querySelector('.registration-form');
  
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    
   
    if (isNameValid && isPasswordValid && isEmailValid && isPhoneValid) {
      registrationForm.submit();
    }
  });
  
  
  function validateName() {
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z ]{6,}$/;
    
    if (!nameRegex.test(nameValue)) {
      showError(nameInput, 'Name should contain only alphabets and be at least 6 characters long');
      return false;
    } else {
      clearError(nameInput);
      return true;
    }
  }
  
  
  function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;
    
    if (passwordValue.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters long');
      return false;
    } else {
      clearError(passwordInput);
      return true;
    }
  }
  
  function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailValue)) {
      showError(emailInput, 'Please enter a valid email address (e.g., name@domain.com)');
      return false;
    } else {
      clearError(emailInput);
      return true;
    }
  }
  

  function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    
  
    const digitsOnly = phoneValue.replace(/\D/g, '');
    
    if (!phoneRegex.test(digitsOnly)) {
      showError(phoneInput, 'Phone number must contain exactly 10 digits');
      return false;
    } else {
      clearError(phoneInput);
      return true;
    }
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('small');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'var(--danger-color)';
    input.style.borderColor = 'var(--danger-color)';
  }
 
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.style.borderColor = '#e0e0e0';
  }
  

  document.getElementById('name').addEventListener('blur', validateName);
  document.getElementById('password').addEventListener('blur', validatePassword);
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('phone').addEventListener('blur', validatePhone);
});
