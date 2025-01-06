function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    cartList.innerHTML = ''; 
    let totalPrice = 0;

    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - ${item.price} Tk</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);

        
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice; // Update the total price display
}


function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cart.splice(index, 1);

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    loadCart();
}


loadCart();
