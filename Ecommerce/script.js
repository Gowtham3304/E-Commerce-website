document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById('cart-button');
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const navLinks = document.querySelectorAll('nav ul li a');
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;

    let cart = [];

    cartButton.addEventListener('click', function() {
        cartContent.style.display = cartContent.style.display === 'none' ? 'block' : 'none';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            addItemToCart(name, price);
        });
    });

    checkoutButton.addEventListener('click', function() {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
    });

    function addItemToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = (index === slideIndex) ? 'block' : 'none';
        });
        slideIndex = (slideIndex + 1) % slides.length;
    }

    setInterval(showSlides, 3000);
    showSlides();
});
