document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('input, select').forEach(input => input.classList.remove('invalid'));

        const fullName = document.getElementById('fullName');
        if (!/^[A-Za-z\s]+$/.test(fullName.value)) {
            document.getElementById('fullNameError').textContent = 'Only alphabets and spaces allowed';
            fullName.classList.add('invalid');
            isValid = false;
        }

        const email = document.getElementById('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').textContent = 'Enter a valid email address';
            email.classList.add('invalid');
            isValid = false;
        }

        
        const phone = document.getElementById('phone');
        if (!/^[0-9]{10,15}$/.test(phone.value)) {
            document.getElementById('phoneError').textContent = 'Must be 10-15 digits';
            phone.classList.add('invalid');
            isValid = false;
        }

        const address = document.getElementById('address');
        if (!address.value.trim()) {
            document.getElementById('addressError').textContent = 'Address is required';
            address.classList.add('invalid');
            isValid = false;
        }

        const cardNumber = document.getElementById('cardNumber');
        if (!/^[0-9]{16}$/.test(cardNumber.value)) {
            document.getElementById('cardNumberError').textContent = 'Must be 16 digits';
            cardNumber.classList.add('invalid');
            isValid = false;
        }
        
        const expiryDate = document.getElementById('expiryDate');
        const today = new Date();
        const [month, year] = expiryDate.value.split('/').map(Number);
        const expiry = new Date(`20${year}`, month - 1);
        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate.value) || expiry <= today) {
            document.getElementById('expiryDateError').textContent = 'Must be a valid future date (MM/YY)';
            expiryDate.classList.add('invalid');
            isValid = false;
        }

        const cvv = document.getElementById('cvv');
        if (!/^[0-9]{3}$/.test(cvv.value)) {
            document.getElementById('cvvError').textContent = 'Must be 3 digits';
            cvv.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            alert('Payment successful!');
            form.reset();
        }
    });
});