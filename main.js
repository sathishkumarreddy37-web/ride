// ========================================
// Global Variables and State
// ========================================
let allVehicles = [];
let allOwners = [];
let filteredVehicles = [];
let currentFilters = {
    type: 'all',
    location: '',
    priceRange: '',
    rating: ''
};

// ========================================
// DOM Elements
// ========================================
const elements = {
    navbar: document.getElementById('navbar'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileMenuClose: document.getElementById('mobileMenuClose'),
    searchBtn: document.getElementById('searchBtn'),
    searchLocation: document.getElementById('searchLocation'),
    searchType: document.getElementById('searchType'),
    vehiclesGrid: document.getElementById('vehiclesGrid'),
    loadingState: document.getElementById('loadingState'),
    noResults: document.getElementById('noResults'),
    vehicleModal: document.getElementById('vehicleModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    modalContent: document.getElementById('modalContent'),
    bookingModal: document.getElementById('bookingModal'),
    bookingModalOverlay: document.getElementById('bookingModalOverlay'),
    bookingModalClose: document.getElementById('bookingModalClose'),
    bookingModalContent: document.getElementById('bookingModalContent'),
    filterLocation: document.getElementById('filterLocation'),
    filterPrice: document.getElementById('filterPrice'),
    filterRating: document.getElementById('filterRating'),
    contactForm: document.getElementById('contactForm')
};

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    initializeEventListeners();
    await loadData();
    displayVehicles(allVehicles);
    populateLocationFilter();
});

// ========================================
// Event Listeners
// ========================================
function initializeEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenu.classList.add('active');
    });
    
    elements.mobileMenuClose.addEventListener('click', () => {
        elements.mobileMenu.classList.remove('active');
    });
    
    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            elements.mobileMenu.classList.remove('active');
        });
    });
    
    // Search functionality
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchLocation.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.filter-btn').classList.add('active');
            currentFilters.type = e.target.closest('.filter-btn').dataset.type;
            applyFilters();
        });
    });
    
    // Filter selects
    elements.filterLocation.addEventListener('change', (e) => {
        currentFilters.location = e.target.value;
        applyFilters();
    });
    
    elements.filterPrice.addEventListener('change', (e) => {
        currentFilters.priceRange = e.target.value;
        applyFilters();
    });
    
    elements.filterRating.addEventListener('change', (e) => {
        currentFilters.rating = e.target.value;
        applyFilters();
    });
    
    // Modal close
    elements.modalOverlay.addEventListener('click', closeVehicleModal);
    elements.modalClose.addEventListener('click', closeVehicleModal);
    elements.bookingModalOverlay.addEventListener('click', closeBookingModal);
    elements.bookingModalClose.addEventListener('click', closeBookingModal);
    
    // Contact form
    elements.contactForm.addEventListener('submit', handleContactSubmit);
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// Scroll Handler
// ========================================
function handleScroll() {
    if (window.scrollY > 50) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
}

// ========================================
// Data Loading
// ========================================
async function loadData() {
    try {
        elements.loadingState.style.display = 'block';
        
        // Load vehicles and owners
        const [vehiclesResponse, ownersResponse] = await Promise.all([
            fetch('tables/vehicles?limit=100'),
            fetch('tables/owners?limit=100')
        ]);
        
        const vehiclesData = await vehiclesResponse.json();
        const ownersData = await ownersResponse.json();
        
        allVehicles = vehiclesData.data || [];
        allOwners = ownersData.data || [];
        filteredVehicles = [...allVehicles];
        
        elements.loadingState.style.display = 'none';
    } catch (error) {
        console.error('Error loading data:', error);
        elements.loadingState.innerHTML = '<p style="color: var(--danger-color);">Error loading vehicles. Please refresh the page.</p>';
    }
}

// ========================================
// Search Handler
// ========================================
function handleSearch() {
    const location = elements.searchLocation.value.toLowerCase();
    const type = elements.searchType.value;
    
    currentFilters.location = location;
    if (type) currentFilters.type = type;
    
    applyFilters();
    
    // Scroll to vehicles section
    document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// Filter Application
// ========================================
function applyFilters() {
    filteredVehicles = allVehicles.filter(vehicle => {
        // Type filter
        if (currentFilters.type !== 'all' && vehicle.type !== currentFilters.type) {
            return false;
        }
        
        // Location filter
        if (currentFilters.location && 
            !vehicle.location.toLowerCase().includes(currentFilters.location.toLowerCase())) {
            return false;
        }
        
        // Price range filter
        if (currentFilters.priceRange) {
            const price = vehicle.price_per_km;
            if (currentFilters.priceRange === '0-5' && (price < 0 || price > 5)) return false;
            if (currentFilters.priceRange === '5-10' && (price < 5 || price > 10)) return false;
            if (currentFilters.priceRange === '10-20' && (price < 10 || price > 20)) return false;
            if (currentFilters.priceRange === '20+' && price < 20) return false;
        }
        
        // Rating filter
        if (currentFilters.rating && vehicle.rating < parseFloat(currentFilters.rating)) {
            return false;
        }
        
        return true;
    });
    
    displayVehicles(filteredVehicles);
}

// ========================================
// Display Vehicles
// ========================================
function displayVehicles(vehicles) {
    if (vehicles.length === 0) {
        elements.vehiclesGrid.style.display = 'none';
        elements.noResults.style.display = 'block';
        return;
    }
    
    elements.vehiclesGrid.style.display = 'grid';
    elements.noResults.style.display = 'none';
    
    elements.vehiclesGrid.innerHTML = vehicles.map(vehicle => {
        const hasVideo = vehicle.video && vehicle.video !== '';
        
        return `
            <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                    <div class="vehicle-badge">${vehicle.type}</div>
                    ${hasVideo ? '<div class="vehicle-video-icon"><i class="fas fa-play"></i></div>' : ''}
                </div>
                <div class="vehicle-info">
                    <div class="vehicle-header">
                        <div>
                            <div class="vehicle-name">${vehicle.name}</div>
                            <div class="vehicle-brand">${vehicle.brand}</div>
                        </div>
                        <div class="vehicle-price">
                            <div class="price-amount">₹${vehicle.price_per_km}</div>
                            <div class="price-label">per km</div>
                        </div>
                    </div>
                    
                    <div class="vehicle-rating">
                        <div class="rating-stars">${generateStars(vehicle.rating)}</div>
                        <span class="rating-number">${vehicle.rating}</span>
                        <span class="rating-count">(${vehicle.total_reviews} reviews)</span>
                    </div>
                    
                    <div class="vehicle-details">
                        <div class="detail-item">
                            <i class="fas fa-cog"></i>
                            <span>${vehicle.transmission}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-gas-pump"></i>
                            <span>${vehicle.fuel_type}</span>
                        </div>
                        ${vehicle.seats ? `
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${vehicle.seats} Seats</span>
                        </div>
                        ` : ''}
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${vehicle.year}</span>
                        </div>
                    </div>
                    
                    <div class="vehicle-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${vehicle.location}</span>
                    </div>
                    
                    <div class="vehicle-footer">
                        <button class="btn btn-primary" onclick="openVehicleDetail('${vehicle.id}')">
                            <i class="fas fa-info-circle"></i>
                            View Details
                        </button>
                        <button class="btn btn-secondary" onclick="openBookingModal('${vehicle.id}')">
                            <i class="fas fa-key"></i>
                            Rent Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Generate Star Rating
// ========================================
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// ========================================
// Open Vehicle Detail Modal
// ========================================
function openVehicleDetail(vehicleId) {
    const vehicle = allVehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const owner = allOwners.find(o => o.id === vehicle.owner_id);
    const hasVideo = vehicle.video && vehicle.video !== '';
    
    const modalHTML = `
        <div class="vehicle-detail-header">
            <div class="vehicle-detail-media">
                <div class="vehicle-detail-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>
                ${hasVideo ? `
                <div class="vehicle-detail-video">
                    <video controls playsinline webkit-playsinline>
                        <source src="${vehicle.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                ` : ''}
            </div>
            
            <div class="vehicle-detail-info">
                <h2>${vehicle.name}</h2>
                <div class="vehicle-detail-brand">${vehicle.brand}</div>
                
                <div class="vehicle-detail-rating">
                    <div class="rating-stars">${generateStars(vehicle.rating)}</div>
                    <span class="rating-number">${vehicle.rating}</span>
                    <span class="rating-count">(${vehicle.total_reviews} reviews)</span>
                </div>
                
                <div class="detail-price">₹${vehicle.price_per_km}</div>
                <div class="detail-price-label">per kilometer</div>
                
                <div class="detail-badges">
                    <span class="detail-badge">${vehicle.type.toUpperCase()}</span>
                    <span class="detail-badge">${vehicle.condition}</span>
                    <span class="detail-badge">${vehicle.transmission}</span>
                </div>
                
                <div class="vehicle-specs">
                    <div class="spec-item">
                        <i class="fas fa-calendar"></i>
                        <div class="spec-info">
                            <div class="spec-label">Year</div>
                            <div class="spec-value">${vehicle.year}</div>
                        </div>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-gas-pump"></i>
                        <div class="spec-info">
                            <div class="spec-label">Fuel Type</div>
                            <div class="spec-value">${vehicle.fuel_type}</div>
                        </div>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cog"></i>
                        <div class="spec-info">
                            <div class="spec-label">Transmission</div>
                            <div class="spec-value">${vehicle.transmission}</div>
                        </div>
                    </div>
                    ${vehicle.seats ? `
                    <div class="spec-item">
                        <i class="fas fa-users"></i>
                        <div class="spec-info">
                            <div class="spec-label">Seats</div>
                            <div class="spec-value">${vehicle.seats}</div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                ${vehicle.features && vehicle.features.length > 0 ? `
                <div class="vehicle-features">
                    <h3>Features</h3>
                    <div class="features-list">
                        ${vehicle.features.map(feature => `
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        
        ${owner ? `
        <div class="owner-section">
            <h3>Owner Information</h3>
            <div class="owner-info">
                <div class="owner-avatar">
                    <img src="${owner.profile_image}" alt="${owner.name}">
                </div>
                <div class="owner-details">
                    <h4>${owner.name}</h4>
                    <div class="owner-meta">
                        <i class="fas fa-star" style="color: #fbbf24;"></i>
                        ${owner.rating} Rating • Member since ${owner.member_since}
                    </div>
                    <div class="owner-meta">
                        <i class="fas fa-car"></i>
                        ${owner.total_vehicles} vehicles
                    </div>
                </div>
            </div>
            
            <div class="owner-contact">
                <div class="contact-detail">
                    <i class="fas fa-phone"></i>
                    <span>${owner.phone}</span>
                </div>
                <div class="contact-detail">
                    <i class="fas fa-envelope"></i>
                    <span>${owner.email}</span>
                </div>
                <div class="contact-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${owner.location}</span>
                </div>
            </div>
            
            ${vehicle.pickup_locations && vehicle.pickup_locations.length > 0 ? `
            <div class="pickup-locations">
                <h4>Available Pickup Locations</h4>
                <div class="locations-list">
                    ${vehicle.pickup_locations.map(location => `
                        <div class="location-item">
                            <i class="fas fa-map-pin"></i>
                            <span>${location}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
        ` : ''}
        
        <div class="modal-actions">
            <button class="btn btn-secondary btn-large" onclick="closeVehicleModal()">
                <i class="fas fa-times"></i>
                Close
            </button>
            <button class="btn btn-primary btn-large" onclick="openBookingModalFromDetail('${vehicle.id}')">
                <i class="fas fa-key"></i>
                Rent This Vehicle
            </button>
        </div>
    `;
    
    elements.modalContent.innerHTML = modalHTML;
    elements.vehicleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================================
// Close Vehicle Detail Modal
// ========================================
function closeVehicleModal() {
    elements.vehicleModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Open Booking Modal
// ========================================
function openBookingModal(vehicleId) {
    const vehicle = allVehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const owner = allOwners.find(o => o.id === vehicle.owner_id);
    
    const bookingHTML = `
        <div class="booking-success-icon">
            <i class="fas fa-check"></i>
        </div>
        <h2>Booking Information</h2>
        <p>Review the details below and contact the owner to confirm your booking</p>
        
        <div class="booking-details">
            <div class="booking-detail-item">
                <span class="detail-label">Vehicle</span>
                <span class="detail-value">${vehicle.name}</span>
            </div>
            <div class="booking-detail-item">
                <span class="detail-label">Price per km</span>
                <span class="detail-value">₹${vehicle.price_per_km}</span>
            </div>
            <div class="booking-detail-item">
                <span class="detail-label">Condition</span>
                <span class="detail-value">${vehicle.condition}</span>
            </div>
            ${owner ? `
            <div class="booking-detail-item">
                <span class="detail-label">Owner</span>
                <span class="detail-value">${owner.name}</span>
            </div>
            <div class="booking-detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">${owner.phone}</span>
            </div>
            <div class="booking-detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">${owner.email}</span>
            </div>
            ` : ''}
            ${vehicle.pickup_locations && vehicle.pickup_locations.length > 0 ? `
            <div class="booking-detail-item">
                <span class="detail-label">Pickup Locations</span>
                <span class="detail-value">${vehicle.pickup_locations.join(', ')}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-secondary btn-large" onclick="closeBookingModal()">
                Close
            </button>
            ${owner ? `
            <button class="btn btn-primary btn-large" onclick="window.location.href='tel:${owner.phone}'">
                <i class="fas fa-phone"></i>
                Call Owner
            </button>
            ` : ''}
        </div>
    `;
    
    elements.bookingModalContent.innerHTML = bookingHTML;
    elements.bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================================
// Open Booking Modal from Detail
// ========================================
function openBookingModalFromDetail(vehicleId) {
    closeVehicleModal();
    setTimeout(() => openBookingModal(vehicleId), 300);
}

// ========================================
// Close Booking Modal
// ========================================
function closeBookingModal() {
    elements.bookingModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Populate Location Filter
// ========================================
function populateLocationFilter() {
    const locations = [...new Set(allVehicles.map(v => v.location))].sort();
    
    elements.filterLocation.innerHTML = '<option value="">All Locations</option>' +
        locations.map(location => `<option value="${location}">${location}</option>`).join('');
}

// ========================================
// Contact Form Handler
// ========================================
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Show success message
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        form.reset();
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1000);
}

// ========================================
// Utility Functions
// ========================================

// Prevent zoom on mobile
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Keyboard accessibility for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elements.vehicleModal.classList.contains('active')) {
            closeVehicleModal();
        }
        if (elements.bookingModal.classList.contains('active')) {
            closeBookingModal();
        }
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
setTimeout(() => {
    document.querySelectorAll('.vehicle-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}, 100);
