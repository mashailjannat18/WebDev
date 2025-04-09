document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.checkout-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('.error').forEach(error => error.textContent = '');

        const firstName = document.getElementById('firstName');
        if (!/^[A-Za-z\s]+$/.test(firstName.value)) {
            document.getElementById('firstNameError').textContent = 'Only alphabets and spaces allowed.';
            firstName.classList.add('invalid');
            isValid = false;
        } else {
            firstName.classList.remove('invalid');
        }

        const lastName = document.getElementById('lastName');
        if (!/^[A-Za-z\s]+$/.test(lastName.value)) {
            document.getElementById('lastNameError').textContent = 'Only alphabets and spaces allowed.';
            lastName.classList.add('invalid');
            isValid = false;
        } else {
            lastName.classList.remove('invalid');
        }

        const country = document.getElementById('country');
        if (!country.value) {
            document.getElementById('countryError').textContent = 'Country is required.';
            country.classList.add('invalid');
            isValid = false;
        } else {
            country.classList.remove('invalid');
        }

        const address = document.getElementById('address');
        if (!address.value.trim()) {
            document.getElementById('addressError').textContent = 'Address is required.';
            address.classList.add('invalid');
            isValid = false;
        } else {
            address.classList.remove('invalid');
        }

        const city = document.getElementById('city');
        if (!city.value.trim()) {
            document.getElementById('cityError').textContent = 'City is required.';
            city.classList.add('invalid');
            isValid = false;
        } else {
            city.classList.remove('invalid');
        }

        const phone = document.getElementById('phone');
        if (!/^[0-9]{10,15}$/.test(phone.value)) {
            document.getElementById('phoneError').textContent = 'Must be 10-15 digits.';
            phone.classList.add('invalid');
            isValid = false;
        } else {
            phone.classList.remove('invalid');
        }

        const cardNumber = document.getElementById('cardNumber');
        if (!/^[0-9]{16}$/.test(cardNumber.value)) {
            document.getElementById('cardNumberError').textContent = 'Must be 16 digits.';
            cardNumber.classList.add('invalid');
            isValid = false;
        } else {
            cardNumber.classList.remove('invalid');
        }

        const expiryDate = document.getElementById('expiryDate');
        const today = new Date();
        const [month, year] = expiryDate.value.split('/').map(Number);
        const selectedDate = new Date(`20${year}`, month - 1);
        if (!expiryDate.value || selectedDate <= today) {
            document.getElementById('expiryDateError').textContent = 'Must be a future date (MM/YY).';
            expiryDate.classList.add('invalid');
            isValid = false;
        } else {
            expiryDate.classList.remove('invalid');
        }

        const cvv = document.getElementById('cvv');
        if (!/^[0-9]{3}$/.test(cvv.value)) {
            document.getElementById('cvvError').textContent = 'Must be 3 digits.';
            cvv.classList.add('invalid');
            isValid = false;
        } else {
            cvv.classList.remove('invalid');
        }

        const cardName = document.getElementById('cardName');
        if (!/^[A-Za-z\s]+$/.test(cardName.value)) {
            document.getElementById('cardNameError').textContent = 'Only alphabets and spaces allowed.';
            cardName.classList.add('invalid');
            isValid = false;
        } else {
            cardName.classList.remove('invalid');
        }

        const mobile = document.getElementById('mobile');
        if (mobile.value && !/^[0-9]{10,15}$/.test(mobile.value)) {
            document.getElementById('mobileError').textContent = 'Must be 10-15 digits.';
            mobile.classList.add('invalid');
            isValid = false;
        } else {
            mobile.classList.remove('invalid');
        }

        if (isValid) {
            alert('Payment successful!');
            window.location.reload();
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .invalid {
            border-color: #ff0000;
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
});