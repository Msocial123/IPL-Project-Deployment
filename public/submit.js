document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Clear previous error messages
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(element => element.textContent = '');

            // Validate form fields
            let isValid = true;

            // Check for required fields
            const requiredFields = ['first_name', 'second_name', 'role', 'email', 'phone', 'dob', 'matches', 'address', 'marital_status', 'consent'];
            requiredFields.forEach(field => {
                const input = form.elements[field];
                if (!input || !input.value.trim()) {
                    displayError(field, 'This field is required.');
                    isValid = false;
                }
            });

            // Validate email
            const email = form.elements['email'].value.trim();
            if (email && !validateEmail(email)) {
                displayError('email', 'Invalid email address. It must contain an "@" symbol.');
                isValid = false;
            }

            // Validate phone number
            const phone = form.elements['phone'].value.trim();
            if (phone && !validatePhone(phone)) {
                displayError('phone', 'Phone number must be exactly 10 digits.');
                isValid = false;
            }

            // If form is valid, submit the form
            if (isValid) {
                form.submit(); // You can remove this line if you want to handle form submission with AJAX
                alert('New Cricketer Registered Successfully!');
            }
        });
    }

    // Display error message
    function displayError(field, message) {
        const input = form.elements[field];
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.style.color = 'red';
        errorElement.textContent = message;
        if (input) {
            input.parentElement.appendChild(errorElement);
        }
    }

    // Validate email address
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) && email.includes('@');
    }

    // Validate phone number (must be exactly 10 digits)
    function validatePhone(phone) {
        const digitsOnly = phone.replace(/\D/g, ''); // Remove non-digit characters
        return digitsOnly.length === 10;
    }
});
