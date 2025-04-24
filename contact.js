/**
 * Overcomers Caring Ministries - Contact Page JavaScript
 * This file handles contact form validation and submission using EmailJS
 */

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate the form
            if (validateForm()) {
                // Submit the form using EmailJS
                submitFormWithEmailJS();
            }
        });
        
        // Form validation function
        function validateForm() {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Clear previous error states
            const allFields = contactForm.querySelectorAll('input, select, textarea');
            allFields.forEach(field => {
                field.classList.remove('error');
            });
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    shakeElement(field);
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
                isValid = false;
                emailField.classList.add('error');
                shakeElement(emailField);
            }
            
            return isValid;
        }
        
        // Email validation helper function
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Shake animation for invalid fields
        function shakeElement(element) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'shake 0.5s';
            }, 10);
        }
        
        // Form submission using EmailJS
        function submitFormWithEmailJS() {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                first_name: document.getElementById('first-name').value,
                last_name: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                inquiry_type: document.getElementById('inquiry-type').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter-signup').checked ? 'Yes' : 'No'
            };
            
            // Send email using EmailJS
            emailjs.send('service_rf6awzb', 'template_contact_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage();
                }, function(error) {
                    console.log('FAILED...', error);
                    showErrorMessage();
                    
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        }
        
        // Show success message
        function showSuccessMessage() {
            // Replace form with success message
            const formContainer = contactForm.closest('.contact-form-container');
            formContainer.innerHTML = `
                <div class="contact-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Message Sent Successfully!</h2>
                    <p>Thank you for reaching out to Overcomers Caring Ministries. We have received your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
                    <p>If your inquiry is urgent, please call us at +254724406285.</p>
                    <a href="index.html" class="btn btn-secondary">Return to Homepage</a>
                </div>
            `;
            
            // Scroll to success message
            formContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show error message
        function showErrorMessage() {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <p><i class="fas fa-exclamation-circle"></i> There was a problem sending your message. Please try again or contact us directly at ministryovercomers@gmail.com</p>
            `;
            
            // Add error message before the submit button
            const formActions = contactForm.querySelector('.form-actions');
            formActions.insertBefore(errorMessage, formActions.firstChild);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
        
        // Clear form field errors on input
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Add CSS animation for shake effect (for invalid fields)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        .error-message {
            background-color: #ffebee;
            color: #d32f2f;
            padding: 10px 15px;
            border-radius: 4px;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .error-message i {
            margin-right: 5px;
        }
    `;
    document.head.appendChild(styleSheet);
}); 