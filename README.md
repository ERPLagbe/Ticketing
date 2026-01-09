# TourTicket 🎫

A comprehensive GetYourGuide clone built with React, Redux Toolkit, and modern web technologies. TourTicket is a full-featured tour and activity booking platform with advanced search capabilities, multilingual support, and a complete end-to-end booking experience.

## 🌟 Features

### Core Functionality
- **Activity Browsing**: Browse tours, attractions, and experiences with rich image galleries
- **Advanced Search & Filtering**: Multi-filter search with price range, ratings, duration, categories, and destinations
- **Activity Details**: Comprehensive activity pages with image galleries, reviews, and detailed information
- **Smart Booking System**: Date selection, traveler count management, and activity option selection
- **Shopping Cart**: Add multiple activities, manage quantities, and proceed to checkout
- **Wishlist**: Save favorite activities for later
- **Reviews & Ratings**: User-generated reviews with rating distribution and verification badges

### User Experience
- **User Authentication**: Login and registration with demo account support
- **User Dashboard**: Manage bookings, view booking history, track orders, and manage wishlist
- **Dual-Status Booking System**: 
  - Pending Payment bookings (requires completion)
  - Completed bookings (fully paid)
- **Complete Payment Flow**: Resume and complete pending bookings from dashboard
- **Public Booking Tracking**: Track bookings by confirmation code without authentication

### Design & Navigation
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices using 8px grid spacing
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS v4
- **Mega Menu Navigation**: Category-based navigation with dynamic content
- **Hero Banner**: Eye-catching homepage with call-to-action
- **Activity Carousels**: Featured activities, tour packages, and destination showcases
- **Smooth Animations**: Glossy hover effects and fade-in animations throughout

### Advanced Features
- **Multilingual Support**: 30+ languages with Google Translate integration and language selector
- **Tour Packages**: Special tour packages with custom handling that bypass date selection
- **Currency Selector**: Multiple currency support (placeholder functionality)
- **Blog System**: Travel inspiration articles and guides
- **Partner Portal**: Partner registration and submission form
- **Track Booking Modal**: Public booking search in navbar without login required

### Pages
- **HomePage**: Hero banner, categories, featured activities, destinations, FAQ
- **SearchPage**: Advanced filtering, sorting, and activity grid
- **ActivityDetailPage**: Image gallery, booking widget, reviews, detailed information
- **CheckoutPage**: Multi-step checkout with traveler details and payment
- **UserDashboardPage**: Bookings (pending & completed), wishlist, profile settings
- **LoginPage & RegisterPage**: Authentication with demo account
- **BlogPage & BlogDetailsPage**: Travel content and inspiration
- **AboutUsPage**: Company information
- **ContactPage**: Customer support contact form
- **PartnerPage**: Partner registration portal
- **PrivacyPolicyPage & TermsConditionsPage**: Legal pages

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks
- **React Router DOM 7.11.0**: Client-side routing
- **TypeScript**: Type-safe development (via JSX)

### State Management
- **Redux Toolkit 2.11.2**: Centralized state management
- **React Redux 9.2.0**: React bindings for Redux

### UI & Styling
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components built on Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Beautiful icon set
- **Plus Jakarta Sans**: Primary font family

### Additional Libraries
- **date-fns 3.6.0**: Modern date utility library
- **embla-carousel-react 8.6.0**: Carousel/slider functionality
- **recharts 2.15.2**: Charts and data visualization
- **sonner 2.0.3**: Toast notifications
- **motion 12.23.24**: Animation library (formerly Framer Motion)
- **react-hook-form 7.55.0**: Form management
- **Material-UI 7.3.5**: Additional UI components

### Build Tools
- **Vite 6.3.5**: Fast build tool and dev server

## 🎨 Design System

### Color Scheme
- **Primary**: `#0071eb` (Blue) - Main brand color for CTAs and interactive elements
- **Secondary**: `#1a2b49` (Midnight Blue) - Headers and dark accents
- **Accent**: `#FF4905` (Orange-Red) - Special highlights and badges
- **Surface**: White and light grays for backgrounds
- **Text**: Hierarchical label system (primary, secondary, tertiary)

### CSS Variables
The project uses a comprehensive CSS variable system defined in `/src/styles/theme.css`:
- **Colors**: `--interactive-primary`, `--surface-primary`, `--label-primary`, etc.
- **Spacing**: 8px grid system via `--spacing-*` variables
- **Typography**: Font sizes, weights, and line heights
- **Borders & Shadows**: Consistent border radius and shadow styles

### Typography
- **Font Family**: Plus Jakarta Sans (imported from Google Fonts)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive**: Font sizes adjust for mobile, tablet, and desktop viewports

## 📁 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── figma/           # Figma-specific components
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── ActivityCarousel.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── DestinationCarousel.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── LanguageModal.tsx
│   │   │   ├── LoadingShimmer.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── OriginalsSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── TopAttractionsSection.tsx
│   │   ├── contexts/
│   │   │   └── LocaleContext.tsx # Multilingual support
│   │   ├── pages/
│   │   │   ├── AboutUsPage.tsx
│   │   │   ├── ActivityDetailPage.tsx
│   │   │   ├── BlogDetailsPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── PartnerPage.tsx
│   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── SearchPage.tsx
│   │   │   ├── TermsConditionsPage.tsx
│   │   │   └── UserDashboardPage.tsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── activitiesSlice.ts
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── blogSlice.ts
│   │   │   │   ├── cartSlice.ts
│   │   │   │   ├── filtersSlice.ts
│   │   │   │   └── wishlistSlice.ts
│   │   │   └── store.ts
│   │   └── App.tsx
│   └── styles/
│       ├── fonts.css           # Font imports
│       ├── index.css           # Global styles
│       ├── tailwind.css        # Tailwind imports
│       └── theme.css           # CSS variables & design tokens
├── guidelines/
│   └── Guidelines.md           # Project guidelines (customizable)
├── ATTRIBUTIONS.md             # License attributions
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm/yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Start the development server:
```bash
npm run build
# Then deploy or serve the build
```

### Demo Account
For testing authentication features:
- **Email**: demo@getyourguide.com
- **Password**: Any password (demo mode)

## 🔄 User Flows

### Booking Flow
1. **Browse Activities**: User browses homepage or searches for activities
2. **View Details**: Click activity card to view full details
3. **Configure Booking**: Select date, travelers, and activity options
4. **Add to Cart**: Add configured booking to shopping cart
5. **Review Cart**: Review items in cart drawer
6. **Checkout**: Proceed to checkout (requires authentication)
7. **Enter Details**: Fill in traveler information
8. **Payment**: Choose payment option (full or pay later)
9. **Confirmation**: Receive booking confirmation with unique ID
10. **Dashboard**: View booking in user dashboard

### Booking Completion Flow (Pay Later)
1. **Dashboard**: User sees pending booking with "Complete Payment" button
2. **Resume Checkout**: Clicks button to return to checkout
3. **Auto-filled Details**: User details pre-filled from account
4. **Payment Step**: Directly goes to payment step
5. **Complete Payment**: User completes payment
6. **Status Update**: Booking moves from Pending to Completed

### Public Booking Tracking
1. **Track Booking Link**: User clicks "Track a booking" in navbar
2. **Enter Code**: Modal opens to enter confirmation code
3. **Search**: System searches for booking
4. **Display Results**: Shows booking details or error message
5. **No Login Required**: Accessible without authentication

### Authentication Flow
1. **Attempt Checkout**: User tries to access checkout
2. **Redirect to Login**: System redirects to login with return URL
3. **Login/Register**: User logs in or creates account
4. **Return to Checkout**: Automatically redirected back to checkout
5. **Complete Booking**: User completes booking process

## 🗄️ Redux Store Structure

### Slices

#### activitiesSlice
- **State**: `items[]`, `selectedActivity`, `loading`, `error`
- **Purpose**: Manages activity data and selection
- **Actions**: `setSelectedActivity()`

#### authSlice
- **State**: `isAuthenticated`, `user`, `loading`, `error`
- **Purpose**: User authentication state
- **Actions**: `login()`, `logout()`, `register()`
- **Demo User**: Built-in demo account support

#### cartSlice
- **State**: `items[]`, `total`, `isOpen`
- **Purpose**: Shopping cart management
- **Actions**: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`, `openCartDrawer()`, `closeCartDrawer()`

#### wishlistSlice
- **State**: `items[]`
- **Purpose**: User's saved activities
- **Actions**: `addToWishlist()`, `removeFromWishlist()`

#### filtersSlice
- **State**: `priceRange`, `rating`, `duration`, `sortBy`, `category`, `destination`
- **Purpose**: Search and filter preferences
- **Actions**: `setPriceRange()`, `setRating()`, `setDuration()`, `setSortBy()`, `setCategory()`, `setDestination()`, `resetFilters()`

#### blogSlice
- **State**: `posts[]`, `loading`, `error`
- **Purpose**: Blog content management
- **Actions**: Blog post data

### Store Configuration
- **Persist**: No persistence (uses in-memory storage)
- **Middleware**: Redux Toolkit default middleware
- **DevTools**: Enabled in development

## 🌍 Multilingual Support

### Implementation
- **Context**: `LocaleContext` provides language state and translation function
- **Integration**: Google Translate API integration
- **Languages**: 30+ languages including English, Spanish, French, German, Japanese, Chinese, Arabic, and more
- **UI**: Language selector button in navbar with searchable modal
- **Persistence**: Selected language stored in localStorage

### Usage
```tsx
import { useLocale } from '../contexts/LocaleContext';

function MyComponent() {
  const { locale, t } = useLocale();
  
  return <h1>{t('Welcome to TourTicket')}</h1>;
}
```

## 🎯 Key Features Deep Dive

### Tour Packages
Tour packages are a special type of activity with the `isTourPackage` flag:
- **Date Handling**: Bypasses date selection (dates in description)
- **Filtering**: Dedicated "Tour Packages" section on homepage
- **Booking**: Special handling in booking widget

### Dual-Status Booking System
Bookings can have two states:
- **Pending Payment**: Incomplete bookings that require payment completion
- **Completed**: Fully paid and confirmed bookings

Users can:
- View both types in separate tabs in dashboard
- Complete pending bookings via "Complete Payment" button
- Track completion status

### Reviews & Ratings System
- **Rating Distribution**: Visual bar chart of 1-5 star ratings
- **User Reviews**: Display with avatar, name, date, and verification badge
- **Write Review**: Form for authenticated users to submit reviews
- **Filtering**: Sort by most recent, highest rated, lowest rated

### Responsive Design
- **Mobile**: Optimized touch targets, mobile navigation drawer
- **Tablet**: Adjusted grid layouts and spacing
- **Desktop**: Full mega menu, multi-column layouts
- **Breakpoints**: Uses Tailwind's responsive utilities (sm, md, lg, xl)

## 🎨 Custom Components

### ActivityCard
Displays activity summary with image, title, rating, price, and quick actions.

### ActivityCarousel
Horizontal scrolling carousel with navigation arrows and autoplay.

### CartDrawer
Side drawer showing cart items with checkout functionality.

### HeroBanner
Full-width hero section with search bar and call-to-action.

### MegaMenu
Multi-column dropdown navigation with categories and destinations.

### ReviewsSection
Comprehensive reviews display with rating statistics and review form.

### TopAttractionsSection
Tabbed section showing top attractions, destinations, and categories.

## 📱 Pages Overview

### HomePage
- Hero banner with search
- Category carousel
- Featured activities
- Tour packages
- Popular destinations
- Trust indicators
- FAQ section

### SearchPage
- Advanced filters sidebar
- Sort options
- Activity grid
- Pagination
- Mobile filter sheet

### ActivityDetailPage
- Image gallery with lightbox
- Booking widget (sticky on scroll)
- Activity information tabs
- Reviews and ratings
- Related activities

### CheckoutPage
- Multi-step checkout
- Traveler details form
- Payment options
- Order summary
- Authentication required

### UserDashboardPage
- Bookings management (pending & completed)
- Wishlist with quick actions
- Profile settings
- Account information

## 🔐 Authentication System

### Features
- Login and registration forms
- Demo account support
- Protected routes (checkout)
- Redirect after login
- User profile in navbar
- Logout functionality

### Demo Account
Email: `demo@getyourguide.com`
Password: Any (bypassed in demo mode)

## 🎨 Design Tokens

### Spacing (8px Grid)
- `--spacing-1x`: 8px
- `--spacing-2x`: 16px
- `--spacing-3x`: 24px
- `--spacing-4x`: 32px
- `--spacing-5x`: 40px
- `--spacing-6x`: 48px
- `--spacing-8x`: 64px
- `--spacing-10x`: 80px
- `--spacing-12x`: 96px

### Colors
- `--interactive-primary`: #0071eb
- `--interactive-secondary`: #1a2b49
- `--brand-accent`: #FF4905
- `--surface-primary`: #FFFFFF
- `--surface-secondary`: #F7F7F7
- `--label-primary`: #1F1F1F
- `--label-secondary`: #757575
- `--label-tertiary`: #A0A0A0

## 🧪 Future Enhancements

- Backend integration with real API
- Payment gateway integration
- Email notifications
- Real-time availability checking
- Social sharing features
- Advanced user profiles
- Booking modifications and cancellations
- Loyalty program
- Gift cards
- Mobile app

## 📄 License

This project includes components from:
- [shadcn/ui](https://ui.shadcn.com/) - [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- [Unsplash](https://unsplash.com) - [Unsplash License](https://unsplash.com/license)

## 🤝 Contributing

This is a demonstration project showcasing modern React development practices. Feel free to use it as a reference or starting point for your own projects.

## 📞 Support

For questions or issues, please refer to the Contact page within the application.

---

**Built with ❤️ using React, Redux Toolkit, Tailwind CSS, and shadcn/ui**
