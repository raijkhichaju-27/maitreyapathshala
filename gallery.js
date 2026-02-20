// Gallery Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterSelect = document.getElementById('filterSelect');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter functionality for buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterGallery(filterValue);
        });
    });
    
    // Filter functionality for dropdown (mobile)
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value;
            
            // Update active button if visible
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === filterValue) {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
            
            filterGallery(filterValue);
        });
    }
    
    // Filter function
    function filterGallery(filterValue) {
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Open lightbox when clicking on gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Set current index for navigation
            currentIndex = index;
        });
    });
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Keyboard navigation for lightbox
    let currentIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            }
            if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
    
    // Lightbox navigation arrows
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
        nextBtn.addEventListener('click', () => navigateLightbox(1));
    }
    
    function navigateLightbox(direction) {
        const visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
        
        if (visibleItems.length === 0) return;
        
        // Find current item among visible items
        const currentItemSrc = lightboxImg.src;
        let foundIndex = visibleItems.findIndex(item => 
            item.querySelector('img').src === currentItemSrc
        );
        
        if (foundIndex === -1) foundIndex = currentIndex;
        
        currentIndex = foundIndex + direction;
        
        if (currentIndex < 0) currentIndex = visibleItems.length - 1;
        if (currentIndex >= visibleItems.length) currentIndex = 0;
        
        const item = visibleItems[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const caption = item.querySelector('.gallery-overlay h3').textContent;
        const description = item.querySelector('.gallery-overlay p').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
    }
}); 