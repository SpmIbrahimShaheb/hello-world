const pizzas = [
    {
        id: 1,
        name: "Pepperoni Passion",
        description: "Double pepperoni & extra mozzarella cheese on our signature sauce.",
        price: 14.99,
        emoji: "🍕"
    },
    {
        id: 2,
        name: "Veggie Supreme",
        description: "Mushrooms, green peppers, onions, and black olives loaded on top.",
        price: 12.99,
        emoji: "🥦"
    },
    {
        id: 3,
        name: "BBQ Meatlovers",
        description: "Smoked bacon, pepperoni, ham, and sausage with tangy BBQ drizzle.",
        price: 16.99,
        emoji: "🍖"
    },
    {
        id: 4,
        name: "Margherita",
        description: "Classic tomato sauce, 100% mozzarella, and fresh basil.",
        price: 11.99,
        emoji: "🧀"
    },
    {
        id: 5,
        name: "Spicy Chicken",
        description: "Grilled chicken breast, jalapeños, and hot buffalo sauce swirl.",
        price: 15.49,
        emoji: "🌶️"
    },
    {
        id: 6,
        name: "Hawaiian",
        description: "Ham, pineapple, and mozzarella cheese. Love it or hate it.",
        price: 13.99,
        emoji: "🍍"
    }
];

let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartDrawer = document.querySelector('.cart-drawer');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cart-total');

// Init
function init() {
    renderMenu();
}

// Render Menu
function renderMenu() {
    menuGrid.innerHTML = pizzas.map(pizza => `
        <div class="pizza-card">
            <div class="card-img-container">
                ${pizza.emoji}
            </div>
            <div class="card-info">
                <h3>${pizza.name}</h3>
                <p class="card-desc">${pizza.description}</p>
                <div class="card-footer">
                    <span class="price">$${pizza.price}</span>
                    <button class="add-btn" onclick="addToCart(${pizza.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Cart
function toggleCart() {
    cartDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

// Add to Cart
function addToCart(id) {
    const pizza = pizzas.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...pizza, quantity: 1 });
    }

    updateCart();

    // Open cart automatically on first add or visual feedback
    if (!cartDrawer.classList.contains('open')) {
        toggleCart();
    }
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart UI
function updateCart() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#ff4444;cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = '$' + total.toFixed(2);
}

// Expose functions to global scope for HTML onclicks
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

init();
