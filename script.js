// ============================================
// TIMELINE DATA
// ============================================
// Edit this array to add, remove, or modify timeline events
// Each event should have: year, title, and description

const timelineEvents = [
    {
        year: "1858-1884",
        title: "French Conquest and Colonization",
        description: "French forces began their military campaign in Vietnam, starting with the attack on Đà Nẵng in 1858. By 1884, France had established control over the entire country, dividing it into three regions: Cochinchina (south), Annam (center), and Tonkin (north). This period marked the beginning of formal colonial administration."
    },
    {
        year: "1880s-1900s",
        title: "Infrastructure Development Begins",
        description: "The French colonial administration initiated major infrastructure projects, including the construction of railways connecting major cities. The Trans-Indochina Railway project began, linking Hanoi to Saigon and connecting port cities. These projects required significant labor and transformed transportation networks."
    },
    {
        year: "1900s-1920s",
        title: "Expansion of Plantations and Mines",
        description: "Large-scale rubber plantations were established in Cochinchina, particularly in areas like Biên Hòa and Bình Dương. Coal mining operations expanded in Tonkin, especially around Hạ Long Bay. These extractive industries created new economic relationships and a growing Vietnamese working class."
    },
    {
        year: "1920s-1930s",
        title: "Growth of Vietnamese Working Class",
        description: "As industrial and extractive sectors expanded, a significant Vietnamese working class emerged. Workers in factories, plantations, and mines began organizing, despite harsh working conditions and limited rights. This period saw the first major labor strikes and the formation of worker organizations."
    },
    {
        year: "1930",
        title: "Formation of the Indochinese Communist Party",
        description: "The Indochinese Communist Party (ICP) was founded, bringing together various revolutionary groups. Led by figures like Hồ Chí Minh, the party organized workers, peasants, and intellectuals, marking a new phase in anti-colonial resistance with a clear organizational structure."
    },
    {
        year: "1930s",
        title: "Major Strikes and Protests",
        description: "The 1930s witnessed significant labor unrest and peasant protests across Vietnam. Major strikes occurred in industrial centers, plantation workers organized for better conditions, and rural uprisings challenged colonial authority. These movements demonstrated growing popular resistance to colonial rule."
    },
    {
        year: "1940-1945",
        title: "World War II and Japanese Occupation",
        description: "During World War II, Japan occupied Vietnam while France maintained nominal control. This period of dual occupation created opportunities for Vietnamese resistance movements to organize more effectively. The ICP expanded its networks and prepared for a potential power vacuum."
    },
    {
        year: "1945",
        title: "The August Revolution",
        description: "Following Japan's surrender in August 1945, the Việt Minh (led by the ICP) launched the August Revolution. They quickly took control of major cities and declared Vietnamese independence on September 2, 1945. This marked a crucial turning point in Vietnam's struggle for sovereignty."
    },
    {
        year: "1945-1954",
        title: "Post-Independence Challenges",
        description: "After declaring independence, Vietnam faced immediate challenges including French attempts to reassert colonial control, leading to the First Indochina War. The new government also began implementing land reform, educational expansion, and other modernization projects while fighting for full independence."
    }
];

// ============================================
// MAP LOCATIONS DATA
// ============================================
// Edit this array to add, remove, or modify map locations
// Each location needs: name, description, lat (latitude), lng (longitude)
// Coordinates are in decimal degrees (WGS84)

const mapLocations = [
    {
        name: "Hanoi",
        description: "Capital of French Indochina and major administrative center. Site of important railway connections, industrial development, and key revolutionary organizing. The city became a hub for Vietnamese intellectuals and political movements.",
        lat: 21.0285,
        lng: 105.8542
    },
    {
        name: "Saigon (Ho Chi Minh City)",
        description: "Major commercial port and economic center of Cochinchina. Hub for rice export, rubber processing, and colonial trade. Site of significant working-class organizing and revolutionary activity, particularly in the 1930s and 1940s.",
        lat: 10.8231,
        lng: 106.6297
    },
    {
        name: "Hạ Long Bay Region",
        description: "Center of coal mining operations in Tonkin. Thousands of Vietnamese workers labored in mines under harsh conditions. The region saw significant labor organizing and strikes, particularly in the 1930s.",
        lat: 20.9101,
        lng: 107.1839
    },
    {
        name: "Rubber Plantation Region",
        description: "Large-scale rubber plantations in Cochinchina, particularly around Biên Hòa and Bình Dương. These plantations employed thousands of workers and became sites of labor resistance. The harsh working conditions and exploitation fueled anti-colonial sentiment.",
        lat: 10.9447,
        lng: 106.8243
    },
    {
        name: "Đà Nẵng",
        description: "Major port city where French forces first attacked in 1858, marking the beginning of formal colonization. Important trading center and site of early resistance movements. The city connected central Vietnam to international trade networks.",
        lat: 16.0544,
        lng: 108.2022
    },
    {
        name: "Huế",
        description: "Former imperial capital of Vietnam. The city represented traditional Vietnamese authority, which coexisted uneasily with French colonial administration. Site of important cultural and political developments during the colonial period.",
        lat: 16.4637,
        lng: 107.5908
    }
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTimeline();
    initializeMap();
    initializeThemeCards();
    initializeSmoothScrolling();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// TIMELINE FUNCTIONALITY
// ============================================

function initializeTimeline() {
    const timelineContainer = document.getElementById('timeline-events');
    const detailPanel = document.getElementById('timeline-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailDate = document.getElementById('detail-date');
    const detailDescription = document.getElementById('detail-description');
    const closeBtn = detailPanel.querySelector('.close-btn');

    // Render timeline events
    timelineEvents.forEach((event, index) => {
        const eventElement = createTimelineEvent(event, index);
        timelineContainer.appendChild(eventElement);
    });

    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideTimelineDetail();
        });
    }

    // Close detail when clicking outside
    document.addEventListener('click', function(e) {
        if (!detailPanel.contains(e.target) && 
            !e.target.closest('.timeline-event') &&
            !detailPanel.classList.contains('hidden')) {
            hideTimelineDetail();
        }
    });
}

function createTimelineEvent(event, index) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'timeline-event';
    eventDiv.setAttribute('tabindex', '0'); // For keyboard accessibility
    eventDiv.setAttribute('role', 'button');
    eventDiv.setAttribute('aria-label', `Learn more about ${event.title}`);

    eventDiv.innerHTML = `
        <div class="event-year">${event.year}</div>
        <div class="event-title">${event.title}</div>
    `;

    // Click handler
    eventDiv.addEventListener('click', function() {
        showTimelineDetail(event, eventDiv);
    });

    // Keyboard handler
    eventDiv.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showTimelineDetail(event, eventDiv);
        }
    });

    return eventDiv;
}

function showTimelineDetail(event, eventElement) {
    const detailPanel = document.getElementById('timeline-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailDate = document.getElementById('detail-date');
    const detailDescription = document.getElementById('detail-description');

    // Update detail panel content
    detailTitle.textContent = event.title;
    detailDate.textContent = event.year;
    detailDescription.textContent = event.description;

    // Show detail panel
    detailPanel.classList.remove('hidden');

    // Update active state
    document.querySelectorAll('.timeline-event').forEach(el => {
        el.classList.remove('active');
    });
    eventElement.classList.add('active');

    // Scroll detail into view on mobile
    if (window.innerWidth <= 768) {
        detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function hideTimelineDetail() {
    const detailPanel = document.getElementById('timeline-detail');
    detailPanel.classList.add('hidden');
    
    // Remove active state
    document.querySelectorAll('.timeline-event').forEach(el => {
        el.classList.remove('active');
    });
}

// ============================================
// MAP FUNCTIONALITY (using Leaflet)
// ============================================

let vietnamMap = null; // Store map instance globally

function initializeMap() {
    const mapContainer = document.getElementById('vietnam-map');
    const detailPanel = document.getElementById('map-detail');
    const locationName = document.getElementById('map-location-name');
    const locationDescription = document.getElementById('map-location-description');
    const closeBtn = detailPanel.querySelector('.close-btn');

    // Initialize Leaflet map centered on Vietnam
    // Vietnam's approximate center: 16.0583° N, 108.2772° E
    vietnamMap = L.map('vietnam-map', {
        center: [16.0583, 108.2772],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true
    });

    // Add OpenStreetMap tiles (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(vietnamMap);

    // Create custom icon for markers
    const customIcon = L.divIcon({
        className: 'leaflet-custom-marker',
        html: '<div class="custom-marker-dot"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Add markers for each location
    const markers = [];
    mapLocations.forEach((location, index) => {
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon
        }).addTo(vietnamMap);

        // Add click handler
        marker.on('click', function() {
            showMapDetail(location, marker, markers);
        });

        // Add popup with location name (optional - can be removed if you prefer only the detail panel)
        marker.bindPopup(location.name, {
            closeButton: false,
            className: 'location-popup'
        });

        markers.push(marker);
    });

    // Fit map bounds to show all markers
    if (mapLocations.length > 0) {
        const bounds = mapLocations.map(loc => [loc.lat, loc.lng]);
        vietnamMap.fitBounds(bounds, { padding: [50, 50] });
    }

    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideMapDetail();
        });
    }

    // Close detail when clicking on map (but not on markers)
    vietnamMap.on('click', function() {
        if (!detailPanel.classList.contains('hidden')) {
            hideMapDetail();
        }
    });
}

function showMapDetail(location, markerElement, allMarkers) {
    const detailPanel = document.getElementById('map-detail');
    const locationName = document.getElementById('map-location-name');
    const locationDescription = document.getElementById('map-location-description');

    // Update detail panel content
    locationName.textContent = location.name;
    locationDescription.textContent = location.description;

    // Show detail panel
    detailPanel.classList.remove('hidden');

    // Highlight active marker (optional visual feedback)
    allMarkers.forEach(m => {
        if (m === markerElement) {
            // You can add visual feedback here if desired
        }
    });

    // Scroll detail into view on mobile
    if (window.innerWidth <= 768) {
        detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function hideMapDetail() {
    const detailPanel = document.getElementById('map-detail');
    detailPanel.classList.add('hidden');
}

// ============================================
// THEME CARDS FUNCTIONALITY
// ============================================

function initializeThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');

    themeCards.forEach(card => {
        const header = card.querySelector('.theme-card-header');
        
        if (header) {
            header.addEventListener('click', function() {
                toggleThemeCard(card);
            });

            // Keyboard accessibility
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleThemeCard(card);
                }
            });
        }
    });
}

function toggleThemeCard(card) {
    const expandedContent = card.querySelector('.theme-card-expanded');
    const isActive = card.classList.contains('active');

    // Close all other cards (optional - remove if you want multiple open)
    document.querySelectorAll('.theme-card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('active');
            otherCard.querySelector('.theme-card-expanded').classList.add('hidden');
        }
    });

    // Toggle current card
    if (isActive) {
        card.classList.remove('active');
        expandedContent.classList.add('hidden');
    } else {
        card.classList.add('active');
        expandedContent.classList.remove('hidden');
        
        // Scroll into view if needed
        if (window.innerWidth <= 768) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// You can add additional helper functions here as needed

