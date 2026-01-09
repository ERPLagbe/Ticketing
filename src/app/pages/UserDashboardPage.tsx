import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { 
  Calendar, 
  MapPin, 
  Users, 
  LogOut, 
  Heart, 
  Star,
  Download,
  Mail,
  Phone,
  User,
  Lock,
  Clock,
  Check,
  X,
  MessageSquare,
  CreditCard,
  Ticket,
  Headphones
} from 'lucide-react';
import { toast } from 'sonner';
import { addToCart } from '../store/slices/cartSlice';

export function UserDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('demo@getyourguide.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Mock data for bookings
  const mockBookings = [
    {
      id: '1',
      activityTitle: 'Vatican Museums & Sistine Chapel Skip-the-Line Tour',
      location: 'Vatican City, Rome',
      date: '2024-12-28',
      time: '09:00 AM',
      travelers: 2,
      price: 142.88,
      status: 'upcoming',
      bookingStatus: 'booking_successful',
      paymentStatus: 'pending',
      confirmationCode: 'GYG-VM-123456',
      image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      activityTitle: 'Colosseum Underground & Ancient Rome Tour',
      location: 'Colosseum, Rome',
      date: '2024-12-30',
      time: '02:00 PM',
      travelers: 4,
      price: 319.96,
      status: 'upcoming',
      bookingStatus: 'ticket_delivered',
      paymentStatus: 'paid',
      confirmationCode: 'GYG-COL-789012',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      activityTitle: 'Eiffel Tower Summit Access with Guide',
      location: 'Paris, France',
      date: '2024-11-15',
      time: '10:30 AM',
      travelers: 2,
      price: 158.00,
      status: 'completed',
      bookingStatus: 'booking_confirmed',
      paymentStatus: 'paid',
      confirmationCode: 'GYG-EF-345678',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
      review: {
        rating: 5,
        comment: 'Amazing experience! Our guide was knowledgeable and the views were breathtaking.',
        date: '2024-11-16',
      }
    },
    {
      id: '4',
      activityTitle: 'Louvre Museum Masterpieces Tour',
      location: 'Paris, France',
      date: '2024-11-10',
      time: '09:00 AM',
      travelers: 3,
      price: 225.00,
      status: 'completed',
      bookingStatus: 'booking_confirmed',
      paymentStatus: 'paid',
      confirmationCode: 'GYG-LV-901234',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    },
  ];

  // Mock payment methods
  const mockPaymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiry: '08/26',
      isDefault: false,
    },
  ];

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      toast.success('Booking cancelled successfully');
    }
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    dispatch(removeFromWishlist(itemId));
    toast.success('Removed from wishlist');
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleRemovePaymentMethod = (methodId: string) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      toast.success('Payment method removed');
    }
  };

  const handleDownloadInvoice = (bookingId: string) => {
    toast.success('Invoice downloaded');
  };

  const handleCompletePayment = (bookingId: string) => {
    // Find the booking
    const booking = mockBookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Add booking to cart for payment
    dispatch(addToCart({
      activityId: bookingId,
      activityTitle: booking.activityTitle,
      startDate: booking.date,
      endDate: booking.date,
      adults: booking.travelers,
      children: 0,
      infants: 0,
      price: booking.price,
      image: booking.image,
      packageOption: {
        id: `option-${bookingId}`,
        title: 'Standard Package',
        timeSlot: booking.time || '09:00 AM',
      },
    }));

    // Navigate to checkout with booking ID to skip step 1
    toast.info('Redirecting to payment...');
    navigate(`/checkout?bookingId=${bookingId}`);
  };

  const handleDownloadTicket = (bookingId: string) => {
    toast.success('Ticket downloaded');
  };

  const handleViewAudioGuide = (bookingId: string) => {
    toast.info('Opening audio guide...');
  };

  const getBookingStatusBadge = (bookingStatus: string) => {
    const statusConfig = {
      booking_successful: { bg: '#fef3c7', color: '#92400e', text: 'Booking Successful' },
      booking_confirmed: { bg: '#10b981', color: 'white', text: 'Booking Confirmed' },
      cancelled: { bg: '#fee2e2', color: '#991b1b', text: 'Cancelled' },
      ticket_pending: { bg: '#dbeafe', color: '#1e40af', text: 'Ticket Pending' },
      ticket_delivered: { bg: '#a7f3d0', color: '#047857', text: 'Ticket Delivered' },
    };

    const config = statusConfig[bookingStatus as keyof typeof statusConfig] || statusConfig.booking_successful;

    return (
      <Badge 
        className="flex-shrink-0"
        style={{ 
          backgroundColor: config.bg,
          color: config.color,
          fontWeight: 600,
        }}
      >
        {config.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    if (paymentStatus === 'paid') {
      return (
        <Badge 
          className="flex-shrink-0"
          style={{ 
            backgroundColor: '#10b981',
            color: 'white',
            fontWeight: 600,
          }}
        >
          <Check className="w-3 h-3 mr-1" />
          Paid
        </Badge>
      );
    } else {
      return (
        <Badge 
          className="flex-shrink-0"
          style={{ 
            backgroundColor: '#fef3c7',
            color: '#92400e',
            fontWeight: 600,
          }}
        >
          Payment Pending
        </Badge>
      );
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--fill-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 
              style={{ 
                fontSize: '36px',
                fontWeight: 700,
                color: 'var(--label-primary)',
                marginBottom: '8px',
              }}
            >
              My Account
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--label-secondary)' }}>
              {email}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="glossy-hover"
            style={{
              border: '1px solid var(--border-primary)',
              color: 'var(--label-primary)',
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        {/* Horizontal Tab Navigation */}
        <div className="mb-8">
          <div 
            className="flex gap-2 p-1 rounded-xl w-full md:inline-flex"
            style={{ 
              backgroundColor: 'var(--fill-secondary)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <button
              onClick={() => setActiveTab('bookings')}
              className="flex items-center justify-center gap-2 px-3 md:px-6 py-3 rounded-lg transition-all flex-1 md:flex-initial"
              style={{
                backgroundColor: activeTab === 'bookings' ? 'var(--background-primary)' : 'transparent',
                color: activeTab === 'bookings' ? 'var(--interactive-primary)' : 'var(--label-primary)',
                fontWeight: activeTab === 'bookings' ? 600 : 500,
                fontSize: '14px',
                boxShadow: activeTab === 'bookings' ? '0 2px 4px rgba(0, 0, 0, 0.08)' : 'none',
              }}
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:inline">Bookings</span>
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className="flex items-center justify-center gap-2 px-3 md:px-6 py-3 rounded-lg transition-all flex-1 md:flex-initial"
              style={{
                backgroundColor: activeTab === 'wishlist' ? 'var(--background-primary)' : 'transparent',
                color: activeTab === 'wishlist' ? 'var(--interactive-primary)' : 'var(--label-primary)',
                fontWeight: activeTab === 'wishlist' ? 600 : 500,
                fontSize: '14px',
                boxShadow: activeTab === 'wishlist' ? '0 2px 4px rgba(0, 0, 0, 0.08)' : 'none',
              }}
            >
              <Heart className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:inline">Wishlist</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center justify-center gap-2 px-3 md:px-6 py-3 rounded-lg transition-all flex-1 md:flex-initial"
              style={{
                backgroundColor: activeTab === 'profile' ? 'var(--background-primary)' : 'transparent',
                color: activeTab === 'profile' ? 'var(--interactive-primary)' : 'var(--label-primary)',
                fontWeight: activeTab === 'profile' ? 600 : 500,
                fontSize: '14px',
                boxShadow: activeTab === 'profile' ? '0 2px 4px rgba(0, 0, 0, 0.08)' : 'none',
              }}
            >
              <User className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:inline">Profile</span>
            </button>
          </div>
        </div>

        <div>
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <Tabs defaultValue="upcoming">
                <TabsList style={{ marginBottom: '24px' }}>
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingBookings.length})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Past bookings ({pastBookings.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingBookings.length === 0 ? (
                    <Card 
                      className="rounded-xl"
                      style={{ 
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--label-tertiary)' }} />
                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px' }}>
                          No upcoming bookings
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--label-secondary)', marginBottom: '24px' }}>
                          Start planning your next adventure
                        </p>
                        <Button
                          onClick={() => navigate('/')}
                          className="glossy-hover"
                          style={{
                            backgroundColor: 'var(--interactive-primary)',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        >
                          Browse Activities
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    upcomingBookings.map((booking) => (
                      <Card 
                        key={booking.id}
                        className="rounded-xl overflow-hidden"
                        style={{ 
                          border: '1px solid var(--border-primary)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:gap-6 md:p-6">
                            <img
                              src={booking.image}
                              alt={booking.activityTitle}
                              className="w-full md:w-40 h-48 md:h-40 md:rounded-lg object-cover md:flex-shrink-0"
                            />
                            <div className="flex-1 p-4 md:p-0">
                              <div className="flex items-start justify-between mb-3 gap-2">
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--label-primary)', flex: 1 }}>
                                  {booking.activityTitle}
                                </h3>
                                <div className="flex flex-wrap gap-2 items-center">
                                  {getBookingStatusBadge(booking.bookingStatus)}
                                  {getPaymentStatusBadge(booking.paymentStatus)}
                                </div>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{booking.location}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <Clock className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <Users className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</span>
                                </div>
                              </div>

                              <div 
                                className="p-3 rounded-lg mb-4"
                                style={{ backgroundColor: 'var(--fill-accent)' }}
                              >
                                <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                                  Confirmation code: <strong style={{ color: 'var(--label-primary)' }}>{booking.confirmationCode}</strong>
                                </span>
                              </div>

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
                                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
                                  ${booking.price.toFixed(2)}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {/* Conditional Buttons Based on Booking Status */}
                                  {booking.bookingStatus === 'booking_successful' && (
                                    <Button 
                                      size="sm"
                                      onClick={() => handleCompletePayment(booking.id)}
                                      className="glossy-hover flex-1 sm:flex-initial"
                                      style={{ 
                                        backgroundColor: 'var(--interactive-primary)',
                                        color: 'white',
                                        fontWeight: 600,
                                      }}
                                    >
                                      <CreditCard className="w-4 h-4 mr-2" />
                                      Complete Payment
                                    </Button>
                                  )}

                                  {booking.bookingStatus === 'ticket_delivered' && (
                                    <>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleDownloadTicket(booking.id)}
                                        className="glossy-hover flex-1 sm:flex-initial"
                                        style={{ 
                                          backgroundColor: 'var(--interactive-primary)',
                                          color: 'white',
                                          fontWeight: 600,
                                        }}
                                      >
                                        <Ticket className="w-4 h-4 mr-2" />
                                        Download Ticket
                                      </Button>
                                      <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewAudioGuide(booking.id)}
                                        className="glossy-hover flex-1 sm:flex-initial"
                                        style={{ 
                                          border: '1px solid var(--border-primary)',
                                        }}
                                      >
                                        <Headphones className="w-4 h-4 mr-2" />
                                        View Audio Guide
                                      </Button>
                                    </>
                                  )}

                                  {/* Always Show Invoice and Cancel Buttons */}
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDownloadInvoice(booking.id)}
                                    className="glossy-hover flex-1 sm:flex-initial"
                                    style={{ 
                                      border: '1px solid var(--border-primary)',
                                    }}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Invoice
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="glossy-hover flex-1 sm:flex-initial"
                                    style={{ 
                                      border: '1px solid var(--border-primary)',
                                      color: '#dc2626',
                                    }}
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {pastBookings.length === 0 ? (
                    <Card 
                      className="rounded-xl"
                      style={{ 
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--label-tertiary)' }} />
                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--label-primary)' }}>
                          No past bookings
                        </h3>
                      </CardContent>
                    </Card>
                  ) : (
                    pastBookings.map((booking) => (
                      <Card 
                        key={booking.id}
                        className="rounded-xl overflow-hidden"
                        style={{ 
                          border: '1px solid var(--border-primary)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:gap-6 md:p-6">
                            <img
                              src={booking.image}
                              alt={booking.activityTitle}
                              className="w-full md:w-40 h-48 md:h-40 md:rounded-lg object-cover md:flex-shrink-0"
                            />
                            <div className="flex-1 p-4 md:p-0">
                              <div className="flex items-start justify-between mb-3 gap-2">
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--label-primary)', flex: 1 }}>
                                  {booking.activityTitle}
                                </h3>
                                <Badge 
                                  className="flex-shrink-0"
                                  variant="secondary"
                                  style={{ 
                                    backgroundColor: 'var(--fill-accent)',
                                    color: 'var(--label-secondary)',
                                    fontWeight: 600,
                                  }}
                                >
                                  Completed
                                </Badge>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{booking.location}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span style={{ fontSize: '14px' }}>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                              </div>

                              {booking.review ? (
                                <div 
                                  className="p-4 rounded-lg mb-4"
                                  style={{ backgroundColor: 'var(--fill-accent)' }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className="w-4 h-4"
                                          fill={i < booking.review!.rating ? '#fbbf24' : 'none'}
                                          style={{ color: '#fbbf24' }}
                                        />
                                      ))}
                                    </div>
                                    <span style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                                      Reviewed on {new Date(booking.review.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                                    "{booking.review.comment}"
                                  </p>
                                </div>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="glossy-hover mb-4 w-full sm:w-auto"
                                  style={{
                                    border: '1px solid var(--border-primary)',
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Write a review
                                </Button>
                              )}

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
                                <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--label-primary)' }}>
                                  ${booking.price.toFixed(2)}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate('/')}
                                  className="glossy-hover w-full sm:w-auto"
                                  style={{
                                    border: '1px solid var(--border-primary)',
                                  }}
                                >
                                  Book again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  marginBottom: '24px',
                }}
              >
                My Wishlist
              </h2>
              
              {wishlistItems.length === 0 ? (
                <Card 
                  className="rounded-xl"
                  style={{ 
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <CardContent className="p-12 text-center">
                    <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--label-tertiary)' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px' }}>
                      Your wishlist is empty
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--label-secondary)', marginBottom: '24px' }}>
                      Save activities you're interested in
                    </p>
                    <Button
                      onClick={() => navigate('/')}
                      className="glossy-hover"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      Browse Activities
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <Card 
                      key={item.id}
                      className="rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                      style={{ 
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                          style={{
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                          }}
                        >
                          <Heart className="w-5 h-5" fill="#dc2626" style={{ color: '#dc2626' }} />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <h3 
                          style={{ 
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--label-primary)',
                            marginBottom: '8px',
                            lineHeight: '1.4',
                          }}
                        >
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--label-secondary)' }}>
                          <MapPin className="w-4 h-4" />
                          <span style={{ fontSize: '14px' }}>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" fill="#fbbf24" style={{ color: '#fbbf24' }} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                              {item.rating}
                            </span>
                          </div>
                          <span style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                            ({item.reviewCount?.toLocaleString() || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-primary)' }}>
                          <div>
                            <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>From </span>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--label-primary)' }}>
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="glossy-hover"
                            style={{
                              backgroundColor: 'var(--interactive-primary)',
                              color: 'white',
                              fontWeight: 600,
                            }}
                          >
                            Book now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 
                  style={{ 
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                  }}
                >
                  Profile Information
                </h2>
                {!isEditingProfile ? (
                  <Button
                    onClick={() => setIsEditingProfile(true)}
                    variant="outline"
                    className="glossy-hover"
                    style={{
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditingProfile(false)}
                      variant="outline"
                      style={{
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="glossy-hover"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <Card 
                className="rounded-xl"
                style={{ 
                  border: '1px solid var(--border-primary)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
              >
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label 
                          className="block mb-2"
                          style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                        >
                          First Name
                        </label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={!isEditingProfile}
                          style={{
                            border: '1px solid var(--border-primary)',
                            fontSize: '15px',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block mb-2"
                          style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                        >
                          Last Name
                        </label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={!isEditingProfile}
                          style={{
                            border: '1px solid var(--border-primary)',
                            fontSize: '15px',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditingProfile}
                        style={{
                          border: '1px solid var(--border-primary)',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditingProfile}
                        style={{
                          border: '1px solid var(--border-primary)',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <Separator />

                    <div>
                      <h3 
                        style={{ 
                          fontSize: '16px',
                          fontWeight: 600,
                          color: 'var(--label-primary)',
                          marginBottom: '16px',
                        }}
                      >
                        <Lock className="w-4 h-4 inline mr-2" />
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <Input
                          type="password"
                          placeholder="Current password"
                          disabled={!isEditingProfile}
                          style={{
                            border: '1px solid var(--border-primary)',
                            fontSize: '15px',
                          }}
                        />
                        <Input
                          type="password"
                          placeholder="New password"
                          disabled={!isEditingProfile}
                          style={{
                            border: '1px solid var(--border-primary)',
                            fontSize: '15px',
                          }}
                        />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          disabled={!isEditingProfile}
                          style={{
                            border: '1px solid var(--border-primary)',
                            fontSize: '15px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}