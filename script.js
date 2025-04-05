const products = [
    {
        id: 1,
        name: "Black Hoodie",
        price: 700.00,
        description: "This Is Oversize Black Hoodie (There is also: Blue, Gray, White).",
        images: ["Imgs/Hoodie.jpeg"],
        coverPhoto: "Imgs/bgrmvd2.jpg",
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
        images: ["Imgs/Pant.jpeg"],
        coverPhoto: "Imgs/Pant.jpeg",
        specs: {
            size: "Small, Medium, Large",
            material: "MicroFiber"
        }
    }
];

function setCoverPhoto(productId, imageName) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (product.images.includes(imageName)) {
            product.coverPhoto = imageName;
            refreshProductDisplay(productId);
            return true;
        }
    }
    return false;
}

function refreshProductDisplay(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const oldCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (oldCard) {
            oldCard.remove();
        }
        
        const container = document.getElementById('productsContainer');
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    }
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image-container';
    
    const coverPhoto = document.createElement('img');
    coverPhoto.src = product.coverPhoto;
    coverPhoto.alt = `${product.name} - Cover Photo`;
    coverPhoto.className = 'product-image';
    imageContainer.appendChild(coverPhoto);
    
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    productInfo.innerHTML = `
        <h2 class="product-title">${product.name}</h2>
        <p class="product-price">EGP${product.price.toFixed(2)}</p>
    `;
    
    productCard.appendChild(imageContainer);
    productCard.appendChild(productInfo);
    
    productCard.addEventListener('click', () => showProductDetails(product));
    
    return productCard;
}

function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Function to initialize modal slider
function initializeModalSlider() {
    const slider = document.querySelector('.modal-slider');
    const slides = document.querySelectorAll('.modal-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || !slides.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    // Update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        updateSlider();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        updateSlider();
    });
    
    // Initialize slider position
    updateSlider();
}

function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    // Create modal content
    let content = `
        <div class="modal-slider-container">
            <div class="modal-slider">
    `;
    
    // Add each image to the slider
    product.images.forEach((image, index) => {
        content += `
            <div class="modal-slide">
                <img src="${image}" alt="${product.name}" class="modal-product-image">
                <button class="set-cover-btn" data-product-id="${product.id}" data-image="${image}">
                    ${product.coverPhoto === image ? '✓ Current Cover Photo' : 'Set as Cover Photo'}
                </button>
            </div>
        `;
    });
    
    content += `
            </div>
            <div class="modal-buttons">
                <button class="prev-btn">&lt;</button>
                <button class="next-btn">&gt;</button>
            </div>
        </div>
        <div class="modal-product-details">
            <h2>${product.name}</h2>
            <p class="product-price">EGP${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            
            <div class="product-specs">
                <h3>Product Specifications</h3>
                <ul class="specs-list">
                    <li><strong>Material:</strong> ${product.specs?.material || 'Premium Cotton Blend'}</li>
                    <li><strong>Fit:</strong> ${product.specs?.fit || 'Regular Fit'}</li>
                    <li><strong>Care:</strong> ${product.specs?.care || 'Machine Washable'}</li>
                    <li><strong>Origin:</strong> ${product.specs?.origin || 'Egypt'}</li>
                    <li><strong>Style:</strong> ${product.specs?.style || 'Casual'}</li>
                </ul>
            </div>
            
            <div class="modal-actions">
                <button class="size-chart-btn" onclick="openSizeChart(${product.id})">Size Chart</button>
                <button class="cancel-btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Initialize slider functionality
    initializeModalSlider();
    
    // Add event listeners for cover photo buttons
    document.querySelectorAll('.set-cover-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-product-id');
            const image = this.getAttribute('data-image');
            setCoverPhoto(productId, image);
            
            // Update button text and disable it
            this.textContent = '✓ Current Cover Photo';
            this.disabled = true;
            
            // Enable other buttons
            document.querySelectorAll('.set-cover-btn').forEach(btn => {
                if (btn !== this) {
                    btn.disabled = false;
                    btn.textContent = 'Set as Cover Photo';
                }
            });
        });
    });
}

// Function to open size chart
function openSizeChart(productId) {
    // Find the product to get its size chart image
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Determine which size chart image to use based on the product
    let sizeChartImage = "";
    if (product.name.includes("Hoodie")) {
        sizeChartImage = "Imgs/SizeChartHoodie.jpeg";
    } else if (product.name.includes("Pants")) {
        sizeChartImage = "Imgs/SizeChartPant.jpeg";
    } else {
        sizeChartImage = "Imgs/SizeChartHoodie.jpeg"; // Default fallback
    }
    
    // Create a new modal for the size chart
    const sizeChartModal = document.createElement('div');
    sizeChartModal.className = 'modal size-chart-modal';
    sizeChartModal.id = 'sizeChartModal';
    
    // Size chart content - only image, no text table
    const sizeChartContent = `
        <div class="modal-content size-chart-content">
            <span class="close" onclick="closeSizeChart()">&times;</span>
            <h2>Size Chart - ${product.name}</h2>
            
            <div class="size-chart-image-container">
                <img src="${sizeChartImage}" alt="Size Chart Diagram" class="size-chart-image">
            </div>
        </div>
    `;
    
    sizeChartModal.innerHTML = sizeChartContent;
    document.body.appendChild(sizeChartModal);
    
    // Ensure the modal is displayed properly
    setTimeout(() => {
        sizeChartModal.style.display = 'block';
    }, 10);
    
    // Add event listener to close when clicking outside the content
    sizeChartModal.addEventListener('click', function(event) {
        if (event.target === sizeChartModal) {
            closeSizeChart();
        }
    });
}

// Function to close size chart
function closeSizeChart() {
    const sizeChartModal = document.getElementById('sizeChartModal');
    if (sizeChartModal) {
        sizeChartModal.style.display = 'none';
        document.body.removeChild(sizeChartModal);
    }
}

document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('productModal');
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = "none";
}

window.addEventListener('load', displayProducts);