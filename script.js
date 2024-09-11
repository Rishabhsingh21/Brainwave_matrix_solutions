let cart = [];
let cartTotal = 0;

// Function to show subcategories
function showSubCategories(id) {
    // Hide all subcategories first
    const allSubCategories = document.querySelectorAll('.sub-categories');
    allSubCategories.forEach(subCat => subCat.style.display = 'none');

    // Show the clicked subcategory
    document.getElementById(id).style.display = 'block';
}

// Function to add items to cart
function addToCart(product, price) {
    const item = { product, price, id: cart.length + 1 };
    cart.push(item);
    cartTotal += price;
    document.getElementById('cart-count').innerText = cart.length;
    updateCartModal();
    showNotification(); // Show "Product added" notification
}

// Function to show cart notification
function showNotification() {
    const notification = document.getElementById('cart-notification');
    notification.style.display = 'block';
    notification.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.style.display = 'none', 500);
    }, 3000);
}

// Function to update the cart modal content
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous items
    cart.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <p>${item.product} - ₹${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(div);
    });
    document.getElementById('cart-total').innerText = cartTotal;
}

// Function to remove items from cart
function removeFromCart(id) {
    const itemToRemove = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    cartTotal -= itemToRemove.price;
    document.getElementById('cart-count').innerText = cart.length;
    updateCartModal();
}

// Display the cart modal
document.querySelector('.cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'flex';
});

// Close the cart modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Checkout functionality
function checkout() {
    if (cart.length > 0) {
        alert(`Thank you for your purchase! Total: ₹${cartTotal}`);
        cart = [];
        cartTotal = 0;
        document.getElementById('cart-count').innerText = 0;
        updateCartModal();
        document.getElementById('cart-modal').style.display = 'none';
    } else {
        alert('Your cart is empty.');
    }
}
