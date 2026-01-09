import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Check, Calendar, Users, MapPin, Clock, ChevronRight, CreditCard, Shield, Info } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';

// Country codes for phone number
const countryCodes = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+33', country: 'FR' },
  { code: '+49', country: 'DE' },
  { code: '+39', country: 'IT' },
  { code: '+34', country: 'ES' },
  { code: '+31', country: 'NL' },
  { code: '+41', country: 'CH' },
  { code: '+61', country: 'AU' },
  { code: '+64', country: 'NZ' },
  { code: '+81', country: 'JP' },
  { code: '+86', country: 'CN' },
  { code: '+91', country: 'IN' },
  { code: '+971', country: 'AE' },
  { code: '+65', country: 'SG' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const activities = useSelector((state: RootState) => state.activities.items);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  // Step 1: Traveler Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');

  // Step 2: Payment
  const [paymentType, setPaymentType] = useState<'full' | 'later'>('full');

  // Check if this is a booking payment completion
  const bookingId = searchParams.get('bookingId');

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to continue', {
        description: 'You need to be logged in to access checkout',
      });
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);

  // Auto-skip to payment step for booking completion
  useEffect(() => {
    if (bookingId && user) {
      // Pre-fill user details for returning booking
      setFirstName(user.name.split(' ')[0] || '');
      setLastName(user.name.split(' ')[1] || '');
      setEmail(user.email);
      setPhone('');
      // Skip to payment step
      setCurrentStep(2);
    }
  }, [bookingId, user]);

  // Calculate payment due date based on booking date
  const getPaymentDueDate = () => {
    if (!items.length) return addDays(new Date(), 7); // Default to 7 days

    let maxDeadlineDays = 0;
    
    items.forEach(item => {
      const activity = activities.find(a => a.id === item.activityId);
      if (activity?.paymentDeadlineDays) {
        maxDeadlineDays = Math.max(maxDeadlineDays, activity.paymentDeadlineDays);
      }
    });

    // If no payment deadline info available, use default 7 days
    if (maxDeadlineDays === 0) {
      maxDeadlineDays = 7;
    }

    return addDays(new Date(), maxDeadlineDays);
  };

  const paymentDueDate = getPaymentDueDate();

  const validateStep1 = () => {
    if (!firstName.trim()) {
      toast.error('Please enter your first name');
      return false;
    }
    if (!lastName.trim()) {
      toast.error('Please enter your last name');
      return false;
    }
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!phone.trim()) {
      toast.error('Please enter your mobile number');
      return false;
    }
    if (phone.trim().length < 6) {
      toast.error('Please enter a valid mobile number');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBackStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteBooking = () => {
    setCompleted(true);
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/account/bookings');
    }, 3000);
  };

  if (items.length === 0 && !completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: 'var(--fill-primary)' }}
      >
        <div className="text-center">
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--label-primary)',
              marginBottom: '16px',
            }}
          >
            Your cart is empty
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)', marginBottom: 'var(--spacing-4x)' }}>
            Start exploring amazing activities and experiences
          </p>
          <Button
            onClick={() => navigate('/')}
            className="glossy-hover"
            style={{
              backgroundColor: 'var(--interactive-primary)',
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              padding: '12px 32px',
              borderRadius: '8px',
            }}
          >
            Browse Activities
          </Button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: 'var(--fill-primary)' }}
      >
        <div className="text-center max-w-md">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'var(--green-500)' }}
          >
            <Check className="w-10 h-10" style={{ color: 'var(--other-white)' }} />
          </div>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--label-primary)',
              marginBottom: '16px',
            }}
          >
            Booking Confirmed!
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)', marginBottom: '24px' }}>
            Your booking has been reserved successfully. 
            {paymentType === 'later' && ` The full payment of $${total.toFixed(2)} is due by ${format(paymentDueDate, 'MMMM dd, yyyy')}.`}
            {paymentType === 'full' && ' Your payment has been confirmed.'}
          </p>
          <p style={{ fontSize: '14px', color: 'var(--label-tertiary)' }}>
            Redirecting to your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--fill-primary)', paddingTop: 'var(--spacing-8x)', paddingBottom: 'var(--spacing-4x)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--label-primary)',
              marginBottom: '8px',
            }}
          >
            Checkout
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)' }}>
            Complete your booking in {2 - currentStep + 1} simple {2 - currentStep + 1 === 1 ? 'step' : 'steps'}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: currentStep >= 1 ? 'var(--interactive-primary)' : 'var(--fill-secondary)',
                    color: currentStep >= 1 ? 'white' : 'var(--label-tertiary)',
                    border: currentStep === 1 ? '2px solid var(--interactive-primary)' : 'none',
                    boxShadow: currentStep === 1 ? '0 0 0 4px rgba(0, 102, 204, 0.1)' : 'none',
                  }}
                >
                  {currentStep > 1 ? <Check className="w-5 h-5" /> : <span style={{ fontWeight: 600 }}>1</span>}
                </div>
                <div className="mt-2 text-center">
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: currentStep === 1 ? 600 : 500,
                      color: currentStep >= 1 ? 'var(--label-primary)' : 'var(--label-tertiary)',
                    }}
                  >
                    Traveler Details
                  </div>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div
              className="h-0.5 flex-1 mx-4 transition-all duration-300"
              style={{
                backgroundColor: currentStep >= 2 ? 'var(--interactive-primary)' : 'var(--border-primary)',
                maxWidth: '120px',
              }}
            />

            {/* Step 2 */}
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: currentStep >= 2 ? 'var(--interactive-primary)' : 'var(--fill-primary)',
                    color: currentStep >= 2 ? 'white' : 'var(--label-tertiary)',
                    border: currentStep === 2 ? '2px solid var(--interactive-primary)' : currentStep < 2 ? '2px solid var(--border-primary)' : 'none',
                    boxShadow: currentStep === 2 ? '0 0 0 4px rgba(0, 102, 204, 0.1)' : 'none',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>2</span>
                </div>
                <div className="mt-2 text-center">
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: currentStep === 2 ? 600 : 500,
                      color: currentStep >= 2 ? 'var(--label-primary)' : 'var(--label-tertiary)',
                    }}
                  >
                    Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Traveler Details */}
            {currentStep === 1 && (
              <Card style={{ border: '1px solid var(--border-primary)', borderRadius: '12px' }}>
                <CardContent className="p-6">
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                      marginBottom: '24px',
                    }}
                  >
                    Traveler Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <Label
                        htmlFor="firstName"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px', display: 'block' }}
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        style={{
                          height: '48px',
                          fontSize: '15px',
                          border: '1px solid var(--border-primary)',
                        }}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <Label
                        htmlFor="lastName"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px', display: 'block' }}
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        style={{
                          height: '48px',
                          fontSize: '15px',
                          border: '1px solid var(--border-primary)',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label
                        htmlFor="email"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px', display: 'block' }}
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        style={{
                          height: '48px',
                          fontSize: '15px',
                          border: '1px solid var(--border-primary)',
                        }}
                      />
                      <p style={{ fontSize: '13px', color: 'var(--label-tertiary)', marginTop: '6px' }}>
                        Booking confirmation will be sent to this email
                      </p>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <Label
                        htmlFor="phone"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px', display: 'block' }}
                      >
                        Mobile Number *
                      </Label>
                      <div 
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{
                          border: '1px solid var(--border-primary)',
                          height: '48px',
                        }}
                      >
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger
                            className="w-auto border-0 shadow-none focus:ring-0 focus:ring-offset-0 pl-3 pr-2"
                            style={{
                              height: '100%',
                              fontSize: '15px',
                              borderRight: '1px solid var(--border-primary)',
                              borderRadius: '0',
                            }}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.code} ({item.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="123456789"
                          className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{
                            height: '100%',
                            fontSize: '15px',
                            borderRadius: '0',
                          }}
                        />
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--label-tertiary)', marginTop: '6px' }}>
                        We'll send booking updates via SMS
                      </p>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                    <Button
                      onClick={handleNextStep}
                      className="glossy-hover"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '15px',
                        padding: '12px 32px',
                        borderRadius: '8px',
                      }}
                    >
                      Continue to Payment
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <Card style={{ border: '1px solid var(--border-primary)', borderRadius: '12px' }}>
                <CardContent className="p-6">
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                      marginBottom: '24px',
                    }}
                  >
                    Payment Options
                  </h2>

                  <RadioGroup value={paymentType} onValueChange={(value) => setPaymentType(value as 'full' | 'later')}>
                    <div className="space-y-4">
                      {/* Pay Now */}
                      <div
                        className="relative rounded-lg transition-all duration-200 cursor-pointer"
                        style={{
                          border: paymentType === 'full' ? '2px solid var(--interactive-primary)' : '2px solid var(--border-primary)',
                          backgroundColor: paymentType === 'full' ? 'rgba(0, 102, 204, 0.02)' : 'white',
                          padding: '20px',
                        }}
                        onClick={() => setPaymentType('full')}
                      >
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value="full" id="full" className="mt-1" />
                          <div className="flex-1">
                            <Label
                              htmlFor="full"
                              className="cursor-pointer"
                              style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '4px' }}
                            >
                              Pay Now
                            </Label>
                            <p style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                              Pay the complete amount now and secure your booking
                            </p>
                            <div
                              className="mt-3 inline-flex items-center px-3 py-1.5 rounded"
                              style={{ backgroundColor: 'var(--fill-accent)' }}
                            >
                              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--label-primary)' }}>
                                ${total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          {paymentType === 'full' && (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'var(--interactive-primary)' }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pay Later */}
                      <div
                        className="relative rounded-lg transition-all duration-200 cursor-pointer"
                        style={{
                          border: paymentType === 'later' ? '2px solid var(--interactive-primary)' : '2px solid var(--border-primary)',
                          backgroundColor: paymentType === 'later' ? 'rgba(0, 102, 204, 0.02)' : 'white',
                          padding: '20px',
                        }}
                        onClick={() => setPaymentType('later')}
                      >
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value="later" id="later" className="mt-1" />
                          <div className="flex-1">
                            <Label
                              htmlFor="later"
                              className="cursor-pointer"
                              style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '4px' }}
                            >
                              Pay Later
                            </Label>
                            <p style={{ fontSize: '14px', color: 'var(--label-secondary)', marginBottom: '12px' }}>
                              Reserve your spot now and pay the full amount later
                            </p>

                            <div
                              className="flex items-start gap-2 p-3 rounded"
                              style={{ backgroundColor: 'var(--yellow-100)', border: '1px solid var(--yellow-200)' }}
                            >
                              <Calendar className="w-4 h-4 mt-0.5" style={{ color: 'var(--orange-400)' }} />
                              <p style={{ fontSize: '13px', color: 'var(--label-warning)' }}>
                                Payment due by <strong>{format(paymentDueDate, 'MMMM dd, yyyy')}</strong>
                              </p>
                            </div>
                          </div>
                          {paymentType === 'later' && (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'var(--interactive-primary)' }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Security Info */}
                  <div
                    className="mt-6 p-4 rounded-lg flex items-start gap-3"
                    style={{ backgroundColor: 'var(--fill-accent)' }}
                  >
                    <Shield className="w-5 h-5 mt-0.5" style={{ color: 'var(--interactive-primary)' }} />
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '4px' }}>
                        Secure Payment
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                    <Button
                      onClick={handleBackStep}
                      variant="outline"
                      style={{
                        fontWeight: 600,
                        fontSize: '15px',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleCompleteBooking}
                      className="glossy-hover"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '15px',
                        padding: '12px 32px',
                        borderRadius: '8px',
                      }}
                    >
                      <CreditCard className="mr-2 w-4 h-4" />
                      {paymentType === 'full' ? 'Pay Now' : 'Reserve Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card style={{ border: '1px solid var(--border-primary)', borderRadius: '12px', position: 'sticky', top: '100px' }}>
              <CardContent className="p-6">
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                    marginBottom: '20px',
                  }}
                >
                  Order Summary
                </h3>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.activityId}-${index}`}>
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.activityTitle}
                          className="w-20 h-20 rounded-lg object-cover"
                          style={{ border: '1px solid var(--border-primary)' }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            style={{
                              fontSize: '14px',
                              fontWeight: 600,
                              color: 'var(--label-primary)',
                              marginBottom: '4px',
                            }}
                            className="line-clamp-2"
                          >
                            {item.activityTitle}
                          </h4>
                          {!item.isTourPackage && item.startDate && (
                            <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--label-secondary)' }}>
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(item.startDate), 'MMM dd, yyyy')}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--label-secondary)' }}>
                            <Users className="w-3 h-3" />
                            <span>
                              {item.adults > 0 && `${item.adults} Adult${item.adults > 1 ? 's' : ''}`}
                              {item.children > 0 && `, ${item.children} Child${item.children > 1 ? 'ren' : ''}`}
                              {item.infants > 0 && `, ${item.infants} Infant${item.infants > 1 ? 's' : ''}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>Price</span>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)' }}>
                          ${(item.price * (item.adults + item.children + item.infants)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>Subtotal</span>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--label-primary)' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {currentStep === 2 && paymentType === 'later' && (
                    <>
                      <Separator />
                      <div
                        className="p-3 rounded"
                        style={{ backgroundColor: 'var(--yellow-100)', border: '1px solid var(--yellow-200)' }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Calendar className="w-4 h-4 mt-0.5" style={{ color: 'var(--orange-400)' }} />
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--label-warning)' }}>
                            Payment Due
                          </p>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--label-warning)' }}>
                          {format(paymentDueDate, 'MMMM dd, yyyy')}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>Total Amount</span>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--interactive-primary)' }}>
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}

                  {(currentStep === 1 || (currentStep === 2 && paymentType === 'full')) && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>Total</span>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--interactive-primary)' }}>
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}