let currentIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const slider = document.querySelector('.slider');
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        document.getElementById('next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        document.getElementById('prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        /*setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 3000);*/