document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.querySelector('.registration-form');
  
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
 
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const isDobValid = validateDob();
    const isLanguagesValid = validateLanguages();
    const isAddressValid = validateAddress();
    
    if (isNameValid && isPasswordValid && isEmailValid && isPhoneValid && 
        isGenderValid && isDobValid && isLanguagesValid && isAddressValid) {
      registrationForm.submit();
    }
  });


  function validateName() {
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z ]{6,}$/;
    
    if (nameValue === '') {
      showError(nameInput, 'Name is required');
      return false;
    } else if (!nameRegex.test(nameValue)) {
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
    
    if (passwordValue === '') {
      showError(passwordInput, 'Password is required');
      return false;
    } else if (passwordValue.length < 6) {
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
    
    if (emailValue === '') {
      showError(emailInput, 'Email is required');
      return false;
    } else if (!emailRegex.test(emailValue)) {
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
    
    if (phoneValue === '') {
      showError(phoneInput, 'Phone number is required');
      return false;
    } else if (!phoneRegex.test(digitsOnly)) {
      showError(phoneInput, 'Phone number must contain exactly 10 digits');
      return false;
    } else {
      clearError(phoneInput);
      return true;
    }
  }
 
  function validateGender() {
    const genderSelected = document.querySelector('input[name="sex"]:checked');
    const genderGroup = document.querySelector('.radio-group');
    
    if (!genderSelected) {
      showError(genderGroup, 'Please select your gender');
      return false;
    } else {
      clearError(genderGroup);
      return true;
    }
  }
  
  // Date of Birth validation (all fields selected)
  function validateDob() {
    const daySelect = document.querySelector('select[name="dob-day"]');
    const monthSelect = document.querySelector('select[name="dob-month"]');
    const yearSelect = document.querySelector('select[name="dob-year"]');
    const dobGroup = document.querySelector('.dob-fields').parentElement;
    
    if (daySelect.value === '' || monthSelect.value === '' || yearSelect.value === '') {
      showError(dobGroup, 'Please select your complete date of birth');
      return false;
    } else {
      clearError(dobGroup);
      return true;
    }
  }
  

  function validateLanguages() {
    const languagesSelected = document.querySelectorAll('input[name="languages"]:checked');
    const languagesGroup = document.querySelector('.checkbox-group');
    
    if (languagesSelected.length === 0) {
      showError(languagesGroup, 'Please select at least one language');
      return false;
    } else {
      clearError(languagesGroup);
      return true;
    }
  }
  

  function validateAddress() {
    const addressInput = document.getElementById('address');
    const addressValue = addressInput.value.trim();
    
    if (addressValue === '') {
      showError(addressInput, 'Address is required');
      return false;
    } else if (addressValue.length < 10) {
      showError(addressInput, 'Address should be at least 10 characters long');
      return false;
    } else {
      clearError(addressInput);
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
    
    if (input.style) {
      input.style.borderColor = 'var(--danger-color)';
    }
  }
 
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    if (input.style) {
      input.style.borderColor = '#e0e0e0';
    }
  }
  

  document.getElementById('name').addEventListener('blur', validateName);
  document.getElementById('password').addEventListener('blur', validatePassword);
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('phone').addEventListener('blur', validatePhone);
  document.getElementById('address').addEventListener('blur', validateAddress);
  
  
  const genderInputs = document.querySelectorAll('input[name="sex"]');
  genderInputs.forEach(input => {
    input.addEventListener('change', validateGender);
  });
  
  const languageInputs = document.querySelectorAll('input[name="languages"]');
  languageInputs.forEach(input => {
    input.addEventListener('change', validateLanguages);
  });
  
  
  const dobSelects = document.querySelectorAll('.dob-select');
  dobSelects.forEach(select => {
    select.addEventListener('change', validateDob);
  });
});
