// Sample items for random selection
const items = [
    { img: '8.webp', name: 'Sample Item 1', size: 'M', qty: 1, price: 120 },
    { img: '9.webp', name: 'Sample Item 2', size: 'S', qty: 1, price: 150 },
    { img: '10.webp', name: 'Sample Item 3', size: 'L', qty: 1, price: 100 }
];

// Function to populate cart with a random item
function populateCart() {
    const cartContent = document.querySelector('.cart-content');
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    cartContent.innerHTML = `
        <h2>Your Bag</h2>
        <div class="cart-item">
            <img src="${randomItem.img}" alt="Item" class="cart-item-img">
            <div class="cart-item-details">
                <p class="cart-item-name">${randomItem.name}</p>
                <p>Size: ${randomItem.size}</p>
                <p>Qty: ${randomItem.qty}</p>
                <p class="cart-item-price">£${randomItem.price}</p>
            </div>
            <button class="remove-item-btn">Remove</button>
        </div>
        <div class="cart-summary">
            <p>Subtotal: <span id="subtotal">£${randomItem.price}</span></p>
            <a href="checkout.html"><button class="checkout-btn">Checkout</button></a>
        </div>
    `;

    // Add remove functionality
    document.querySelector('.remove-item-btn').addEventListener('click', () => {
        cartContent.innerHTML = `
            <h2>Your Bag</h2>
            <p>Your cart is empty.</p>
            <div class="cart-summary">
                <p>Subtotal: <span id="subtotal">£0</span></p>
                <a href="checkout.html"><button class="checkout-btn">Checkout</button></a>
            </div>
        `;
    });
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const cartPanel = document.getElementById('cartPanel');
        cartPanel.classList.add('open');
        populateCart(); // Populate with a random item
    });
});

// Function to close the cart panel
function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
}