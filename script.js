document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container');
    const thankYouMessage = document.querySelector('.thank-you-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            // Clear the input
            emailInput.value = '';
            
            // Update and show thank you message
            thankYouMessage.textContent = "Thank you, we will call you back";
            thankYouMessage.style.display = 'block';
        }
    });

    document.getElementById('submitBtn').addEventListener('click', function () {
        // Get the email input field and thank-you message elements
        const emailInput = document.getElementById('email');
        const thankYouMessage = document.getElementById('thankYouMessage');

        // Clear the email input field
        emailInput.value = '';

        // Show the thank-you message
        thankYouMessage.textContent = 'Thank You';
        thankYouMessage.style.display = 'block';
    });
});
