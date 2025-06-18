document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', (e) => {
    let isValid = true;
    const errors = {};

    const fields = [
      { id: 'firstName', pattern: /^[A-Za-z\s]+$/, message: 'First name must contain only letters and spaces' },
      { id: 'lastName', pattern: /^[A-Za-z\s]+$/, message: 'Last name must contain only letters and spaces' },
      { id: 'address', message: 'Address is required' },
      { id: 'city', message: 'City is required' },
      { id: 'phone', pattern: /^[0-9]{10,15}$/, message: 'Phone must be 10-15 digits' },
    ];

    fields.forEach(({ id, pattern, message }) => {
      const input = document.getElementById(id);
      const errorSpan = document.getElementById(`${id}Error`);
      if (!input.value.trim()) {
        errors[id] = 'This field is required';
        isValid = false;
      } else if (pattern && !pattern.test(input.value.trim())) {
        errors[id] = message;
        isValid = false;
      }
      errorSpan.textContent = errors[id] || '';
    });

    if (!isValid) {
      e.preventDefault();
    }
  });
});