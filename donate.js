/**
 * Overcomers Caring Ministries - Donation Page JavaScript
 * This file handles all donation form interactions and calculations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching for donation forms
    const tabBtns = document.querySelectorAll('.tab-btn');
    const oneTimeForm = document.getElementById('one-time-form');
    const monthlyForm = document.getElementById('monthly-form');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs
                tabBtns.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show the corresponding form
                const tabType = this.getAttribute('data-tab');
                
                if (tabType === 'one-time') {
                    oneTimeForm.style.display = 'block';
                    monthlyForm.style.display = 'none';
                } else {
                    oneTimeForm.style.display = 'none';
                    monthlyForm.style.display = 'block';
                }
            });
        });
    }
    
    // One-time donation form handling
    const donationForm = document.getElementById('donation-form');
    
    if (donationForm) {
        // Amount radio button handling
        const amountRadios = donationForm.querySelectorAll('input[name="donation-amount"]');
        const customAmountContainer = donationForm.querySelector('.custom-amount-container');
        const customAmountInput = document.getElementById('custom-amount');
        const summaryAmount = document.getElementById('summary-amount');
        const summaryFee = document.getElementById('summary-fee');
        const summaryTotal = document.getElementById('summary-total');
        const feeRow = document.getElementById('fee-row');
        const addFeeCheckbox = document.getElementById('add-fee');
        
        // Function to update donation summary
        function updateDonationSummary() {
            let amount = 0;
            
            // Get the selected amount
            amountRadios.forEach(radio => {
                if (radio.checked && radio.value !== 'custom') {
                    amount = parseFloat(radio.value);
                } else if (radio.checked && radio.value === 'custom') {
                    amount = parseFloat(customAmountInput.value) || 0;
                }
            });
            
            // Update summary amount
            summaryAmount.textContent = '$' + amount.toFixed(2);
            
            // Handle processing fee
            let fee = 0;
            let total = amount;
            
            if (addFeeCheckbox.checked) {
                fee = amount * 0.03;
                total = amount + fee;
                feeRow.style.display = 'flex';
                summaryFee.textContent = '$' + fee.toFixed(2);
            } else {
                feeRow.style.display = 'none';
            }
            
            // Update total
            summaryTotal.textContent = '$' + total.toFixed(2);
        }
        
        // Event listeners for amount changes
        amountRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'custom') {
                    customAmountContainer.style.display = 'block';
                    customAmountInput.focus();
                } else {
                    customAmountContainer.style.display = 'none';
                }
                
                updateDonationSummary();
            });
        });
        
        // Event listener for custom amount input
        if (customAmountInput) {
            customAmountInput.addEventListener('input', updateDonationSummary);
        }
        
        // Event listener for add fee checkbox
        if (addFeeCheckbox) {
            addFeeCheckbox.addEventListener('change', updateDonationSummary);
        }
        
        // Payment method selection
        const paymentMethodRadios = donationForm.querySelectorAll('input[name="payment-method"]');
        const cardFields = document.getElementById('card-payment-fields');
        const paypalFields = document.getElementById('paypal-fields');
        
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'card') {
                    cardFields.style.display = 'block';
                    paypalFields.style.display = 'none';
                } else if (this.value === 'paypal') {
                    cardFields.style.display = 'none';
                    paypalFields.style.display = 'block';
                }
            });
        });
        
        // Gift in honor toggle
        const giftHonorCheckbox = document.getElementById('gift-honor');
        const honorFields = document.getElementById('honor-fields');
        
        if (giftHonorCheckbox && honorFields) {
            giftHonorCheckbox.addEventListener('change', function() {
                honorFields.style.display = this.checked ? 'block' : 'none';
            });
        }
        
        // Form submission handling
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = donationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Custom amount validation if selected
            const customRadio = document.getElementById('amount-custom');
            if (customRadio && customRadio.checked) {
                const customAmount = parseFloat(customAmountInput.value);
                if (!customAmount || customAmount <= 0) {
                    isValid = false;
                    customAmountInput.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real application, this would process the payment
                // For this demo, we'll simulate a successful donation
                
                // Replace form with success message
                const formContainer = donationForm.closest('.donation-form-wrapper');
                formContainer.innerHTML = `
                    <div class="donation-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h2>Thank You for Your Donation!</h2>
                        <p>Your generous gift will help provide education, shelter, and care for vulnerable children.</p>
                        <p>A confirmation email has been sent to your email address.</p>
                        <p class="donation-reference">Reference #: ${generateReference()}</p>
                        <a href="index.html" class="btn btn-secondary">Return to Homepage</a>
                    </div>
                `;
            }
        });
        
        // Generate a random reference number for the donation
        function generateReference() {
            return 'OCM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        }
    }
    
    // Monthly donation form handling (similar logic as one-time form)
    const monthlyDonationForm = document.getElementById('monthly-donation-form');
    
    if (monthlyDonationForm) {
        // Similar event handlers as one-time form, but with monthly-specific IDs
        const monthlyAmountRadios = monthlyDonationForm.querySelectorAll('input[name="monthly-donation-amount"]');
        const monthlyCustomAmountContainer = monthlyDonationForm.querySelector('.custom-amount-container');
        const monthlyCustomAmountInput = document.getElementById('monthly-custom-amount');
        const monthlySummaryAmount = document.getElementById('monthly-summary-amount');
        const monthlySummaryTotal = document.getElementById('monthly-summary-total');
        
        function updateMonthlySummary() {
            let amount = 0;
            
            monthlyAmountRadios.forEach(radio => {
                if (radio.checked && radio.value !== 'custom') {
                    amount = parseFloat(radio.value);
                } else if (radio.checked && radio.value === 'custom') {
                    amount = parseFloat(monthlyCustomAmountInput.value) || 0;
                }
            });
            
            monthlySummaryAmount.textContent = '$' + amount.toFixed(2);
            monthlySummaryTotal.textContent = '$' + amount.toFixed(2);
        }
        
        monthlyAmountRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'custom') {
                    monthlyCustomAmountContainer.style.display = 'block';
                    monthlyCustomAmountInput.focus();
                } else {
                    monthlyCustomAmountContainer.style.display = 'none';
                }
                
                updateMonthlySummary();
            });
        });
        
        if (monthlyCustomAmountInput) {
            monthlyCustomAmountInput.addEventListener('input', updateMonthlySummary);
        }
        
        // Form submission (similar to one-time donation form)
        monthlyDonationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Similar validation logic as one-time form
            
            // Replace form with success message for monthly donation
            const formContainer = monthlyDonationForm.closest('.donation-form-wrapper');
            formContainer.innerHTML = `
                <div class="donation-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Thank You for Your Monthly Commitment!</h2>
                    <p>Your ongoing support will provide consistent help for our children and programs.</p>
                    <p>A confirmation email has been sent to your email address with details of your monthly gift.</p>
                    <p class="donation-reference">Reference #: ${generateReference()}</p>
                    <a href="index.html" class="btn btn-secondary">Return to Homepage</a>
                </div>
            `;
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
}); 