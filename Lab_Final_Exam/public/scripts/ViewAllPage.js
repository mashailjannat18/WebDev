document.addEventListener('DOMContentLoaded', () => {
  console.log('ViewAllPage.js loaded');
  const cartPanel = document.getElementById('cartPanel');
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const bagIcon = document.querySelector('.bag-icon');

  if (!cartPanel || !cartItemsContainer || !subtotalElement || !bagIcon) {
    console.error('Missing DOM elements:', { cartPanel, cartItemsContainer, subtotalElement, bagIcon });
    return;
  }

  // Open/close cart panel
  bagIcon.addEventListener('click', () => {
    console.log('Bag icon clicked');
    cartPanel.classList.toggle('open');
    updateCartPanel();
  });

  // Close cart button
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-cart-btn');
  closeButton.textContent = 'Close';
  document.querySelector('.cart-content').prepend(closeButton);
  closeButton.addEventListener('click', () => {
    console.log('Close button clicked');
    cartPanel.classList.remove('open');
  });

  // Add to cart
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      console.log('Add to cart button clicked:', button.dataset);
      const productId = button.getAttribute('data-id');

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/cart/add';
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'productId';
      input.value = productId;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    });
  });

  // Update cart panel (fetch cart from server if needed)
  function updateCartPanel() {
    // For simplicity, redirect to /cart for full cart view
    cartItemsContainer.innerHTML = '<p>View full cart <a href="/cart">here</a>.</p>';
    subtotalElement.textContent = '£0.00';
  }
});