document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    let isValid = true;
    const errors = {};

    const orderId = document.getElementById('orderId');
    const message = document.getElementById('message');
    const orderIdError = document.getElementById('orderIdError');
    const messageError = document.getElementById('messageError');

    if (!orderId.value) {
      errors.orderId = 'Please select an order';
      isValid = false;
    }
    if (!message.value.trim() || message.value.length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    } else if (message.value.length > 500) {
      errors.message = 'Message cannot exceed 500 characters';
      isValid = false;
    }

    orderIdError.textContent = errors.orderId || '';
    messageError.textContent = errors.message || '';

    if (!isValid) {
      e.preventDefault();
    }
  });
});