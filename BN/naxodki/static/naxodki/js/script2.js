// TODO: REPLACE THIS '#' WITH THE PATH TO YOUR MAIN PAGE HTML FILE (e.g., 'main.html') — used after successful OTP verification
var MAIN_PAGE_URL = 'main.html';

function showScreen(screenId) {
    if (screenId === "otp-screen") window.location.href = "ver/";
    else if (screenId === "login-screen") window.location.href = "{% url 'log_in' %}";
    else if (screenId === "register-screen") window.location.href = "{% url 'reg' %}";
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleIcons = document.querySelectorAll('.toggle-password');
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.closest('.input-group').querySelector('input');
            
            if (input.type === "password") {
                input.type = "text";
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Strict email regex: standard providers (@gmail.com, @mail.ru, @yandex.ru) and international domains
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

    function validateEmail(inputElement, groupElement) {
        if (!inputElement || !groupElement) return;

        var errorEl = groupElement.querySelector('.error-message');
        
        inputElement.addEventListener('input', function() {
            var val = this.value.trim();
            
            if (val === "") {
                groupElement.classList.remove('invalid');
                inputElement.classList.remove('error');
                if (errorEl) errorEl.textContent = '';
                return;
            }

            if (!EMAIL_REGEX.test(val)) {
                groupElement.classList.add('invalid');
                inputElement.classList.add('error');
                if (errorEl) errorEl.textContent = 'Email noto\'g\'ri';
            } else {
                groupElement.classList.remove('invalid');
                inputElement.classList.remove('error');
                if (errorEl) errorEl.textContent = '';
            }
        });
    }
    validateEmail(document.getElementById('emailInput'), document.getElementById('email-group'));
    validateEmail(document.getElementById('emailInputReg'), document.getElementById('email-group-reg'));

    // Registration: store OTP code in localStorage when user clicks "Royxatdan o'tish" (simulated backend)
    var registerSubmitBtn = document.getElementById('register-submit-btn');
    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var nameInput = document.getElementById('nameInput');
            var phoneInput = document.getElementById('phoneInput');
            var emailInputReg = document.getElementById('emailInputReg');
            var passwordInputReg = document.getElementById('passwordInputReg');
            var confirmPasswordInput = document.getElementById('confirmPasswordInput');
            var nameGroup = document.getElementById('name-group');
            var phoneGroup = document.getElementById('phone-group');
            var emailGroupReg = document.getElementById('email-group-reg');
            var passwordGroupReg = document.getElementById('password-group-reg');
            var confirmPasswordGroup = document.getElementById('confirm-password-group');
            var isValid = true;

            // Clear previous errors
            if (nameInput) nameInput.classList.remove('error');
            if (phoneInput) phoneInput.classList.remove('error');
            if (emailInputReg) emailInputReg.classList.remove('error');
            if (passwordInputReg) passwordInputReg.classList.remove('error');
            if (confirmPasswordInput) confirmPasswordInput.classList.remove('error');
            if (nameGroup) nameGroup.classList.remove('invalid');
            if (phoneGroup) phoneGroup.classList.remove('invalid');
            if (emailGroupReg) emailGroupReg.classList.remove('invalid');
            if (passwordGroupReg) passwordGroupReg.classList.remove('invalid');
            if (confirmPasswordGroup) confirmPasswordGroup.classList.remove('invalid');

            // Validate Name
            if (!nameInput || !nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
                if (nameGroup) nameGroup.classList.add('invalid');
            }

            // Validate Phone
            if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim() === '+998 ') {
                isValid = false;
                phoneInput.classList.add('error');
                if (phoneGroup) phoneGroup.classList.add('invalid');
            }

            // Validate Email
            if (!emailInputReg || !emailInputReg.value.trim()) {
                isValid = false;
                emailInputReg.classList.add('error');
                if (emailGroupReg) emailGroupReg.classList.add('invalid');
            }

            // Validate Password
            if (!passwordInputReg || !passwordInputReg.value.trim()) {
                isValid = false;
                passwordInputReg.classList.add('error');
                if (passwordGroupReg) passwordGroupReg.classList.add('invalid');
            }

            // Validate Confirm Password
            if (!confirmPasswordInput || !confirmPasswordInput.value.trim()) {
                isValid = false;
                confirmPasswordInput.classList.add('error');
                if (confirmPasswordGroup) confirmPasswordGroup.classList.add('invalid');
            }

            // Only proceed if all fields are filled
            if (isValid) {
            localStorage.setItem('otpCode', '1234');
            showScreen('otp-screen');
            }
        });
    }

    // OTP verification (simulation: correct code is "1234" or value from localStorage set during registration)
    var otpConfirmBtn = document.getElementById('otp-confirm-btn');
    var otpInput = document.getElementById('otpInput');
    var otpGroup = document.getElementById('otp-group');
    var otpError = document.getElementById('otp-error');

    if (otpConfirmBtn && otpInput) {
        otpConfirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var correctCode = localStorage.getItem('otpCode') || '1234';
            var enteredCode = otpInput.value.trim();

            if (otpError) otpError.textContent = '';
            if (otpGroup) otpGroup.classList.remove('invalid');
            if (otpInput) otpInput.classList.remove('error');

            if (!enteredCode) {
                otpInput.classList.add('error');
                if (otpGroup) otpGroup.classList.add('invalid');
                if (otpError) otpError.textContent = 'Kodni kiriting';
                return;
            }

            if (enteredCode === correctCode) {
                window.location.href = MAIN_PAGE_URL;
            } else {
                otpInput.classList.add('error');
                if (otpError) otpError.textContent = 'Kod noto\'g\'ri';
                if (otpGroup) otpGroup.classList.add('invalid');
            }
        });
    }


    const phoneInput = document.getElementById('phoneInput');
    const phoneGroup = document.getElementById('phone-group');

    if (phoneInput) {
        const validCodes = [
            '20', '33', '36', '50', '55', 
            '61', '62', '65', '66', '67', '69', 
            '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', 
            '87', '88', 
            '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'
        ];

        phoneInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            
            
            if (!value.startsWith('998')) {
                value = '998' + value;
            }

            if (value.length > 12) value = value.substring(0, 12);

            let formattedValue = '+998 ';
            if (value.length > 3) formattedValue += value.substring(3, 5);
            if (value.length > 5) formattedValue += ' ' + value.substring(5, 8);
            if (value.length > 8) formattedValue += ' ' + value.substring(8, 10);
            if (value.length > 10) formattedValue += ' ' + value.substring(10, 12);

            this.value = formattedValue;

            const currentCode = value.substring(3, 5);
            if (currentCode.length === 2) {
                const errorMessage = phoneGroup ? phoneGroup.querySelector('.error-message') : null;
                
                if (validCodes.includes(currentCode)) {
                    phoneInput.classList.remove('error');
                    if (phoneGroup) phoneGroup.classList.remove('invalid');
                    if (errorMessage) errorMessage.textContent = '';
                } else {
                    phoneInput.classList.add('error');
                    if (phoneGroup) phoneGroup.classList.add('invalid');
                    if (errorMessage) errorMessage.textContent = `Kod noto'g'ri (${currentCode})`;
                }
            } else if (currentCode.length < 2) {
                phoneInput.classList.remove('error');
                if (phoneGroup) phoneGroup.classList.remove('invalid');
                const errorMessage = phoneGroup ? phoneGroup.querySelector('.error-message') : null;
                if (errorMessage) errorMessage.textContent = 'Shu joyni toldirish kerak';
            }
        });

        phoneInput.addEventListener('keydown', function(e) {
            if (this.selectionStart < 5 && (e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
            }
        });
        
        phoneInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.value = '+998 ';
            }
        });
    }
});