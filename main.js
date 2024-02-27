(function ($) {
    "use strict";
    
    $(document).ready(function() {
        $('#comment-form').submit(function(e) {
            e.preventDefault(); // Prevent form submission
    
            let form = $(this);
            let url = form.attr('action');
            let submitBtn = $('#submit-btn');
            
            // Remove existing error messages
            form.find('.error-message').remove();
    
            // Validate form fields before submission
            let author = form.find('input[name="author"]').val().trim();
            let email = form.find('input[name="email"]').val().trim();
            let isValid = true;
    
            // Check each field individually and display error messages
            if (author === '') {
                form.find('input[name="author"]').after('<div class="error-message">Please enter your name</div>');
                isValid = false;
            }
            if (email === '') {
                form.find('input[name="email"]').after('<div class="error-message">Please enter your email</div>');
                isValid = false;
            } else if (!isValidEmail(email)) {
                form.find('input[name="email"]').after('<div class="error-message">Please enter a valid email</div>');
                isValid = false;
            }
    
            if (!isValid) {
                return; // Exit the function if any field is empty or invalid
            }
    
            // Disable the submit button
            submitBtn.prop('disabled', true);
            submitBtn.addClass('disabled-btn'); // Add disabled class
    
            // Show loading spinner
            $('#loading-spinner').show();
    
            $.ajax({
                type: 'POST',
                url: url,
                data: form.serialize(), // Serialize form data
                success: function(data) {
                    // Display success message
                    $('#success-message').show();
    
                    // Reset form data
                    form[0].reset();
    
                    // Hide loading spinner
                    $('#loading-spinner').hide();
    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        $('#success-message').hide();
                    }, 5000);
    
                    // Re-enable the submit button
                    submitBtn.prop('disabled', false);
                    submitBtn.removeClass('disabled-btn'); // Remove disabled class
                },
                error: function(xhr, status, error) {
                    // Hide loading spinner in case of error
                    $('#loading-spinner').hide();
    
                    // Handle errors
                    console.error(xhr.responseText);
    
                    // Re-enable the submit button
                    submitBtn.prop('disabled', false);
                    submitBtn.removeClass('disabled-btn'); // Remove disabled class
                }
            });
        });
    });
    
    // Function to validate email format
    function isValidEmail(email) {
        // Use regular expression to validate email format
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    

})(jQuery);
