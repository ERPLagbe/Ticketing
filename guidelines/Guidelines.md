# TourTicket Development Guidelines

## 🎯 General Principles

### Code Quality
- **Keep components focused**: Each component should have a single responsibility
- **Prefer composition**: Build complex UIs by composing smaller components
- **Use TypeScript types**: Leverage TypeScript for type safety (JSX with proper typing)
- **Clean code**: Remove unused imports, variables, and dead code
- **Consistent naming**: Use PascalCase for components, camelCase for functions/variables

### Layout & Responsive Design
- **Mobile-first approach**: Design for mobile, then enhance for larger screens
- **Use Tailwind utilities**: Prefer Tailwind classes over custom CSS when possible
- **8px grid system**: All spacing should follow 8px increments using CSS variables
- **Avoid absolute positioning**: Use flexbox and grid for layouts unless absolutely necessary
- **Responsive breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

### Performance
- **Optimize images**: Use appropriate image sizes and formats
- **Lazy loading**: Implement lazy loading for images and heavy components
- **Minimize re-renders**: Use useMemo and useCallback where appropriate
- **Code splitting**: Leverage React.lazy() for route-based code splitting (future enhancement)

## 🎨 Design System Guidelines

### Colors
Always use CSS variables defined in `/src/styles/theme.css`:

**Primary Colors:**
- `--interactive-primary`: #0071eb (Blue) - Primary CTAs, links, active states
- `--interactive-secondary`: #1a2b49 (Midnight Blue) - Secondary buttons, headers
- `--brand-accent`: #FF4905 (Orange-Red) - Special highlights, badges, urgent CTAs

**Surface Colors:**
- `--surface-primary`: #FFFFFF - Main backgrounds
- `--surface-secondary`: #F7F7F7 - Section backgrounds, cards
- `--surface-tertiary`: #EFEFEF - Disabled states, subtle backgrounds

**Text/Label Colors:**
- `--label-primary`: #1F1F1F - Main text
- `--label-secondary`: #757575 - Supporting text
- `--label-tertiary`: #A0A0A0 - Placeholder text, disabled text
- `--label-inverted`: #FFFFFF - Text on dark backgrounds

**Border Colors:**
- `--border-primary`: #E0E0E0 - Default borders
- `--border-secondary`: #F0F0F0 - Subtle dividers

**Status Colors:**
- `--status-success`: #28A745 - Success messages
- `--status-error`: #DC3545 - Error messages, warnings
- `--status-warning`: #FFC107 - Warning states

### Typography

**Font Family:**
```css
font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```

**Font Sizes:**
- Headers (h1): Responsive, use default styles from theme.css
- Headers (h2): Responsive, use default styles from theme.css
- Headers (h3): Responsive, use default styles from theme.css
- Body text: 14px base, 16px for important content
- Small text: 13px for captions, 12px for tiny labels

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Line Heights:**
Use CSS variables: `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

### Spacing

**Use the 8px grid system:**
```css
/* Spacing variables */
--spacing-1x: 8px;
--spacing-2x: 16px;
--spacing-3x: 24px;
--spacing-4x: 32px;
--spacing-5x: 40px;
--spacing-6x: 48px;
--spacing-8x: 64px;
--spacing-10x: 80px;
--spacing-12x: 96px;
```

**Guidelines:**
- Component padding: Use multiples of 8px (16px, 24px, 32px)
- Section spacing: Large sections use `--spacing-6x` or `--spacing-8x`
- Element gaps: Use `gap-2`, `gap-4`, `gap-6` (8px, 16px, 24px)

### Buttons

**Primary Button:**
- **Purpose**: Main action in a section
- **Style**: Solid background with `--interactive-primary`
- **Usage**: One primary button per section (e.g., "Book Now", "Add to Cart")
- **Example**: Booking buttons, checkout CTAs

**Secondary Button:**
- **Purpose**: Supporting actions
- **Style**: Outlined with `--interactive-primary` border
- **Usage**: Alternative actions alongside primary button
- **Example**: "View Details", "Add to Wishlist"

**Ghost Button:**
- **Purpose**: Tertiary actions
- **Style**: Text only, no background or border
- **Usage**: Less important actions like "Cancel", "Skip"
- **Example**: Navigation actions, modal close buttons

**States:**
- Hover: Slight brightness/opacity change
- Active: Scale down slightly (0.95)
- Disabled: Reduced opacity, no hover effects

### Cards

**Activity Card:**
- Rounded corners: `rounded-xl`
- Shadow: Subtle on default, elevated on hover
- Padding: Consistent with spacing system
- Hover effect: Scale up (1.02) + shadow increase
- Image: Fixed aspect ratio (4:3 or 16:9)

**Generic Card:**
- Use `Card` and `CardContent` from shadcn/ui
- Background: `--surface-primary`
- Border: `--border-primary`
- Padding: `--spacing-3x` or `--spacing-4x`

### Forms

**Input Fields:**
- Height: 40px minimum (touch-friendly)
- Border: `--border-primary`
- Focus: Blue outline with `--interactive-primary`
- Error state: Red border with `--status-error`
- Placeholder: `--label-tertiary`

**Labels:**
- Font size: 14px
- Font weight: 600 (semibold)
- Color: `--label-primary`
- Margin bottom: 8px (--spacing-1x)

**Validation:**
- Show errors below input with red text
- Use icons for success/error states
- Real-time validation for better UX

### Icons

**Source:** Lucide React

**Sizing:**
- Small: `w-4 h-4` (16px) - Inline with text
- Medium: `w-5 h-5` (20px) - Buttons, labels
- Large: `w-6 h-6` (24px) - Section headers
- Extra large: `w-8 h-8` (32px) - Hero sections, feature highlights

**Colors:**
- Match parent text color
- Use `--interactive-primary` for interactive icons
- Use `--label-secondary` for decorative icons

### Animations

**Hover Effects:**
```css
transition: all 0.3s ease;
```

**Scale Transforms:**
- Cards: `hover:scale-105` or `hover:scale-102`
- Buttons: `active:scale-95`

**Fade In:**
```css
.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

**Glossy Effect:**
Available via CSS class `.glossy-hover` (implemented in pages)

**General Guidelines:**
- Keep animations subtle and purposeful
- Duration: 200ms-300ms for most interactions
- Easing: `ease`, `ease-out`, `ease-in-out`
- Avoid animations that distract from content

## 🧩 Component Guidelines

### Activity Components

**ActivityCard.tsx:**
- Must include: image, title, location, rating, price
- Optional: duration, category badge
- Click handler navigates to detail page
- Wishlist heart icon in top-right corner

**ActivityCarousel.tsx:**
- Title prop for section heading
- Activities array prop
- Auto-scroll with pause on hover
- Navigation arrows on desktop
- Swipe support on mobile

### Navigation Components

**Navbar.tsx:**
- Sticky on scroll
- Transparent on homepage hero (when not scrolled)
- Mega menu for categories
- Cart icon with item count badge
- User profile dropdown when authenticated
- Language selector
- "Track a booking" link

**MegaMenu.tsx:**
- Multi-column layout
- Category-based organization
- Dynamic content from Redux store
- Image thumbnails for visual appeal
- Hover effects on menu items

**Footer.tsx:**
- Multi-column layout with links
- Newsletter signup form
- Social media icons
- Copyright notice
- Responsive: stack columns on mobile

### Booking Components

**CartDrawer.tsx:**
- Slide-in from right
- Item list with remove actions
- Total price calculation
- Checkout button
- Empty state message

**ReviewsSection.tsx:**
- Rating distribution bar chart
- Review list with pagination
- Write review form (authenticated users only)
- User avatars and verification badges
- Sort options (most recent, highest rated, etc.)

## 📱 Responsive Guidelines

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1023px (sm to md)
- **Desktop**: ≥ 1024px (lg+)

### Mobile Considerations
- Touch targets: Minimum 44x44px
- Font sizes: Slightly smaller but still readable
- Navigation: Hamburger menu or bottom tabs
- Forms: Full-width inputs with large touch areas
- Images: Optimized for mobile bandwidth

### Tablet Considerations
- 2-column layouts where desktop has 3-4
- Adjusted spacing (slightly tighter)
- Touch-friendly but more content than mobile

### Desktop Considerations
- Multi-column layouts (3-4 columns)
- Hover effects and tooltips
- Mega menus
- Side-by-side forms and content

## 🔄 State Management Guidelines

### When to Use Redux
- **Global state**: User auth, cart, wishlist
- **Shared across routes**: Filters, activities
- **Persistent data**: Data that should survive navigation

### When to Use Local State
- **Component-specific**: Form inputs, toggles, modals
- **Temporary data**: UI state, loading indicators
- **Non-shared**: Data only one component needs

### Redux Best Practices
- **Use Redux Toolkit**: Leverage createSlice and configureStore
- **Immutable updates**: Never mutate state directly (RTK handles this)
- **Async with createAsyncThunk**: For API calls (future enhancement)
- **Selectors**: Use selectors to derive state
- **TypeScript**: Type your state and actions

### Context API Usage
- **Locale/Language**: Theme, language preferences
- **Non-frequent updates**: Data that rarely changes
- **Alternative to Redux**: When Redux is overkill

## 🛣️ Routing Guidelines

### Route Structure
```
/ - HomePage
/search - SearchPage
/activity/:slug - ActivityDetailPage
/checkout - CheckoutPage (protected)
/login - LoginPage
/register - RegisterPage
/dashboard - UserDashboardPage (protected)
/blog - BlogPage
/blog/:slug - BlogDetailsPage
/about - AboutUsPage
/contact - ContactPage
/partner - PartnerPage
/privacy-policy - PrivacyPolicyPage
/terms-conditions - TermsConditionsPage
```

### Protected Routes
- Check authentication in useEffect
- Redirect to login with return URL
- Show loading state during auth check

### Navigation
- Use `<Link>` from react-router-dom for internal links
- Use `useNavigate()` for programmatic navigation
- Always include fallback route (404 page - future enhancement)

## 🎨 Image Guidelines

### Sources
- **Unsplash**: Use unsplash_tool for placeholder images
- **Figma Assets**: Use `figma:asset` scheme for imported images

### Optimization
- Use appropriate dimensions (don't load 4K images for thumbnails)
- Use WebP format when possible
- Lazy load images below the fold
- Use `ImageWithFallback` component for better UX

### Alt Text
- Always include descriptive alt text
- Format: "Activity name in location" or descriptive content
- Helps with accessibility and SEO

## ✅ Testing & Quality

### Before Committing
- [ ] Remove console.log statements (except console.error/warn for debugging)
- [ ] Remove unused imports
- [ ] Remove unused variables and functions
- [ ] Check for TypeScript errors
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all interactive elements (buttons, links, forms)
- [ ] Verify navigation works correctly
- [ ] Check for accessibility (keyboard navigation, screen reader support)

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Uses CSS variables for colors and spacing
- [ ] Responsive design implemented
- [ ] No hardcoded values (use theme variables)
- [ ] Proper error handling
- [ ] Loading states for async operations
- [ ] Clean, readable code with comments where needed

## 🚀 Deployment Guidelines

### Build Optimization
- Run `npm run build` before deployment
- Check bundle size and optimize if needed
- Test production build locally
- Verify all assets load correctly

### Environment Variables
- Use `.env` files for configuration (future enhancement)
- Never commit sensitive keys
- Use different configs for dev/staging/prod

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

**These guidelines ensure consistency and maintainability across the TourTicket codebase.**
