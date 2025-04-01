const products = [
    {
        id: 1,
        name: "Black Hoodie",
        price: 700.00,
        description: "This Is Oversize Black Hoodie (There is also: Blue, Gray, White).",
        images: ["Hoodie.jpeg", "SizeChartHoodie.jpeg"],
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
        images: ["Pant.jpeg", "SizeChartPant.jpeg"],
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
        
        const imageSlider = document.createElement('div');
        imageSlider.className = 'product-image-slider';
        
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const slider = document.createElement('div');
        slider.className = 'slider';
        
        product.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const img = document.createElement('img');
            img.src = `${image}`;
            img.alt = `${product.name} - Image ${index + 1}`;
            img.className = 'product-image';
            slide.appendChild(img);
            slider.appendChild(slide);
        });
        
        const buttons = document.createElement('div');
        buttons.className = 'buttons';
        buttons.innerHTML = `
            <button class="prev">❮</button>
            <button class="next">❯</button>
        `;
        
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(buttons);
        imageSlider.appendChild(sliderContainer);
        
        productCard.innerHTML = `
            <h2 class="product-title">${product.name}</h2>
            <p class="product-price">EGP${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
        `;
        
        productCard.insertBefore(imageSlider, productCard.firstChild);
        
        productCard.addEventListener('click', () => showProductDetails(product));
        
        const prevButton = buttons.querySelector('.prev');
        const nextButton = buttons.querySelector('.next');
        let currentSlide = 0;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            } else {
                currentSlide = product.images.length - 1;
                updateSlider();
            }
        });
        
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentSlide < product.images.length - 1) {
                currentSlide++;
                updateSlider();
            } else {
                currentSlide = 0;
                updateSlider();
            }
        });
        
        container.appendChild(productCard);
    });
}

function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    const specs = Object.entries(product.specs)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');

    const modalSlider = document.createElement('div');
    modalSlider.className = 'modal-slider-container';
    
    const modalSliderInner = document.createElement('div');
    modalSliderInner.className = 'modal-slider';
    
    product.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'modal-slide';
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${product.name} - Image ${index + 1}`;
        img.className = 'modal-product-image';
        slide.appendChild(img);
        modalSliderInner.appendChild(slide);
    });
    
    const modalButtons = document.createElement('div');
    modalButtons.className = 'modal-buttons';
    modalButtons.innerHTML = `
        <button class="modal-prev">❮</button>
        <button class="modal-next">❯</button>
    `;
    
    modalSlider.appendChild(modalSliderInner);
    modalSlider.appendChild(modalButtons);
    
    modalContent.innerHTML = `
        <div class="modal-product-details">
            <h2>${product.name}</h2>
            <p class="product-price">EGP${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <div class="additional-details">
                <h3>Specifications:</h3>
                ${specs}
            </div>
            <button class="close-modal-btn" onclick="closeModal()">Cancel</button>
        </div>
    `;
    
    modalContent.insertBefore(modalSlider, modalContent.firstChild);
    
    let currentModalSlide = 0;
    
    function updateModalSlider() {
        modalSliderInner.style.transform = `translateX(-${currentModalSlide * 100}%)`;
    }
    
    modalButtons.querySelector('.modal-prev').addEventListener('click', () => {
        if (currentModalSlide > 0) {
            currentModalSlide--;
            updateModalSlider();
        } else {
            currentModalSlide = product.images.length - 1;
            updateModalSlider();
        }
    });
    
    modalButtons.querySelector('.modal-next').addEventListener('click', () => {
        if (currentModalSlide < product.images.length - 1) {
            currentModalSlide++;
            updateModalSlider();
        } else {
            currentModalSlide = 0;
            updateModalSlider();
        }
    });
    
    modal.style.display = "block";
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