const products = [
    {
        id: 1,
        name: "Black Hoodie",
        price: 700.00,
        description: "This Is Oversize Black Hoodie (There is also: Blue, Gray, White).",
        image: "Imgs/Hoodie.jpeg",
        specs: {
            size: "Small, Medium, Large",
            material: "MicroFiber"
        }
    },
    {
        id: 2,
        name: "Pants",
        price: 999.99,
        description: "Black Oversize Pants (There is also: Blue, Gray, White).",
        image: "Imgs/Pant.jpeg",
        specs: {
            size: "Small, Medium, Large",
            material: "MicroFiber"
        }
    }
];

function displayProducts() {
    const container = document.getElementById('productsContainer');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-price">EGP${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
        `;
        
        productCard.addEventListener('click', () => showProductDetails(product));
        container.appendChild(productCard);
    });
}

function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    const specs = Object.entries(product.specs)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');

    modalContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <div class="modal-product-details">
            <h2>${product.name}</h2>
            <p class="product-price">EGP${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <div class="additional-details">
                <h3>Specifications:</h3>
                ${specs}
            </div>
        </div>
    `;
    
    modal.style.display = "block";
}

// Close modal when clicking the X
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('productModal').style.display = "none";
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Load products when the page loads
window.addEventListener('load', displayProducts);