import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { PartnerPage } from './pages/PartnerPage';
import { LocaleProvider } from './contexts/LocaleContext';
import { Toaster } from 'sonner';
import '../styles/index.css';

export default function App() {
  return (
    <Provider store={store}>
      <LocaleProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster position="top-center" richColors />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/activity/:slug" element={<ActivityDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account/bookings" element={<UserDashboardPage />} />
                <Route path="/account/wishlist" element={<UserDashboardPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailsPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                <Route path="/partner" element={<PartnerPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LocaleProvider>
    </Provider>
  );
}
