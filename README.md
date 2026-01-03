# RideEase - Premium Vehicle Rental Platform

A modern, responsive web application for renting cars and bikes with kilometer-based pricing. Built with vanilla HTML, CSS, and JavaScript with a focus on user experience and clean design.

## 🚀 Live Demo

Access your rental platform through the **Publish** tab to get your live URL.

## ✨ Features Implemented

### Core Functionality
- ✅ **Vehicle Listings**: Browse cars and bikes with detailed information
- ✅ **Location-Based Search**: Find vehicles in specific cities
- ✅ **Advanced Filtering**: Filter by vehicle type, location, price range, and ratings
- ✅ **Kilometer-Based Pricing**: Transparent per-kilometer pricing display
- ✅ **User Ratings & Reviews**: View ratings and review counts for each vehicle
- ✅ **Vehicle Condition Status**: See condition status (Excellent, Good, Fair)
- ✅ **Video Previews**: Watch vehicle videos before renting
- ✅ **Owner Information**: Complete owner details with contact information
- ✅ **Pickup Locations**: Multiple pickup location options
- ✅ **Booking System**: Easy rental process with owner contact details
- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ✅ **Fixed Viewport**: Prevents zooming for app-like experience
- ✅ **Smooth Animations**: Modern transitions and hover effects throughout

### Design Features
- ✅ Modern gradient-based color scheme
- ✅ Glassmorphism effects on cards and modals
- ✅ Smooth scroll animations
- ✅ Interactive hover states
- ✅ Clean, professional typography (Outfit & Inter fonts)
- ✅ Icon-based feature indicators
- ✅ Floating background shapes for visual appeal
- ✅ Mobile-first responsive layout

### Technical Features
- ✅ RESTful API integration for data management
- ✅ Real-time search and filtering
- ✅ Modal-based detail views
- ✅ Lazy loading for images
- ✅ Keyboard accessibility (ESC to close modals)
- ✅ Touch-friendly mobile interface
- ✅ CSS custom properties for easy theming
- ✅ Optimized performance

## 📁 Project Structure

```
rideease/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles with animations
├── js/
│   └── main.js            # Application logic and interactions
└── README.md              # Project documentation
```

## 🎨 Design Specifications

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#ec4899` (Pink)
- **Success**: `#10b981` (Green)
- **Background**: Dark theme with gradient overlays
- **Text**: High contrast white/gray hierarchy

### Typography
- **Headings**: Outfit (800, 700, 600 weights)
- **Body**: Inter (300-700 weights)

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Vanilla JS for all interactions
- **Font Awesome**: Icon library
- **Google Fonts**: Outfit & Inter fonts
- **RESTful API**: Built-in table API for data management

## 📊 Data Models

### Vehicles Table
- `id`: Unique vehicle identifier
- `name`: Vehicle model name
- `type`: car or bike
- `brand`: Manufacturer
- `image`: Vehicle image URL
- `video`: Optional video URL
- `condition`: Excellent, Good, or Fair
- `price_per_km`: Price per kilometer
- `location`: City/region
- `rating`: Average rating (1-5)
- `total_reviews`: Number of reviews
- `owner_id`: Reference to owner
- `pickup_locations`: Array of pickup locations
- `features`: Array of vehicle features
- `year`: Manufacturing year
- `seats`: Number of seats (for cars)
- `transmission`: Manual or Automatic
- `fuel_type`: Petrol, Diesel, Electric

### Owners Table
- `id`: Unique owner identifier
- `name`: Owner full name
- `phone`: Contact phone number
- `email`: Contact email
- `profile_image`: Avatar/photo URL
- `rating`: Owner rating (1-5)
- `total_vehicles`: Number of vehicles owned
- `member_since`: Year joined
- `location`: Owner city/location

## 🎯 API Endpoints

All endpoints use relative URLs:

### Vehicles
- `GET tables/vehicles?limit=100` - Get all vehicles
- `GET tables/vehicles/{id}` - Get specific vehicle
- `POST tables/vehicles` - Add new vehicle
- `PUT tables/vehicles/{id}` - Update vehicle
- `DELETE tables/vehicles/{id}` - Remove vehicle

### Owners
- `GET tables/owners?limit=100` - Get all owners
- `GET tables/owners/{id}` - Get specific owner
- `POST tables/owners` - Add new owner
- `PUT tables/owners/{id}` - Update owner
- `DELETE tables/owners/{id}` - Remove owner

### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 100)
- `search`: Search query
- `sort`: Sort field

## 🚀 Features in Action

### Hero Section
- Eye-catching gradient background with floating animated shapes
- Prominent search box with location and vehicle type filters
- Statistics showcase (500+ vehicles, 50+ cities, 10k+ users)
- Smooth scroll to sections

### Vehicle Browsing
- Grid layout with responsive cards
- Real-time filtering by type, location, price, and rating
- Hover effects with image zoom
- Video indicator icon
- Quick view of key details (transmission, fuel, seats, year)
- Star rating display
- Price per kilometer prominently shown

### Vehicle Details Modal
- Large image and video player
- Complete specifications
- Owner information with profile photo
- Contact details (phone, email)
- Multiple pickup locations
- Feature list
- "Rent Now" call-to-action

### Booking Flow
1. User clicks "Rent Now" on any vehicle
2. Modal displays booking summary
3. Shows owner contact information
4. Lists pickup locations
5. User can call owner directly or send email

### Mobile Experience
- Hamburger menu navigation
- Touch-optimized buttons and cards
- Vertical layout for easy scrolling
- Fixed viewport prevents accidental zooming
- Full-screen modals
- Swipe-friendly interface

## 🎨 Animation Effects

1. **Page Load Animations**: Fade in and slide up effects
2. **Hover Animations**: Scale, translate, and glow effects
3. **Floating Shapes**: Continuous floating background elements
4. **Modal Transitions**: Smooth slide-up entrance
5. **Button Interactions**: Press effects and color transitions
6. **Scroll Animations**: Elements fade in as they enter viewport
7. **Filter Transitions**: Smooth grid updates when filtering

## 🔧 Customization Guide

### Adding New Vehicles
Use the RESTful API to add vehicles:

```javascript
await fetch('tables/vehicles', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: "Tesla Model 3",
        type: "car",
        brand: "Tesla",
        // ... other fields
    })
});
```

### Updating Colors
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... other variables */
}
```

### Modifying Layout
All responsive breakpoints are in `style.css` at the bottom:
- Desktop: Default styles
- Tablet: `@media (max-width: 1024px)`
- Mobile: `@media (max-width: 768px)`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- All API calls use relative URLs
- No sensitive data stored in frontend
- Owner contact information protected until booking
- Input validation on all forms

## 🎯 User Journey

1. **Landing**: User arrives at hero section with search
2. **Search**: User enters location or filters by vehicle type
3. **Browse**: User scrolls through filtered vehicle grid
4. **Filter**: User refines results by type, location, price, rating
5. **Details**: User clicks vehicle card to view full details
6. **Watch**: User watches vehicle video preview
7. **Review**: User checks ratings and owner information
8. **Book**: User clicks "Rent Now" to see booking details
9. **Contact**: User calls or emails owner to confirm booking

## 📈 Performance Optimizations

- Lazy loading for images
- CSS animations using GPU-accelerated properties
- Efficient DOM manipulation
- Debounced filter updates
- Minimal dependencies
- Optimized bundle size

## 🚦 Getting Started

1. Open `index.html` in a modern web browser
2. Browse available vehicles
3. Use search and filters to find your perfect ride
4. Click "View Details" for complete information
5. Click "Rent Now" to start booking process
6. Contact owner using provided phone/email

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Real-time availability calendar
- [ ] Online payment integration
- [ ] GPS-based location tracking
- [ ] In-app messaging between renters and owners
- [ ] Booking history and user profiles
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Native mobile app versions

## 📞 Support

For questions or issues:
- Email: support@rideease.com
- Phone: +91 98765 43210

## 📄 License

© 2024 RideEase. All rights reserved.

---

**Built with ❤️ for seamless vehicle rental experiences**
