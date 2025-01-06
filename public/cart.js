// Load the cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    cartList.innerHTML = ''; // Clear the cart list
    let totalPrice = 0;

    // Display each item in the cart
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - ${item.price} Tk</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);

        // Update the total price
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice; // Update the total price display
}

// Remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the selected item
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart display
    loadCart();
}

// Load the cart when the page is loaded
loadCart();
