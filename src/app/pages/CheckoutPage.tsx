import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { CreditCard, Lock, Check, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [completed, setCompleted] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCompleteBooking = () => {
    if (!firstName || !lastName || !email || !phone || !cardNumber || !expiry || !cvv) {
      alert('Please fill in all fields');
      return;
    }
    
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
            style={{ backgroundColor: '#10b981' }}
          >
            <Check className="w-10 h-10 text-white" />
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
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)', marginBottom: '8px' }}>
            Your confirmation has been sent to <strong>{email}</strong>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--label-tertiary)', marginBottom: '32px' }}>
            Redirecting to your bookings...
          </p>
        </div>
      </div>
    );
  }

  const serviceFee = total * 0.12;
  const grandTotal = total + serviceFee;

  return (
    <div style={{ backgroundColor: 'var(--fill-primary)', minHeight: '100vh', paddingTop: '24px', paddingBottom: '80px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 
          style={{ 
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--label-primary)',
            marginBottom: '32px',
          }}
        >
          Complete your booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Traveler Details */}
            <Card 
              className="rounded-xl"
              style={{ 
                border: '1px solid var(--border-primary)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--interactive-primary)', color: 'white' }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>1</span>
                  </div>
                  <h2 
                    style={{ 
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                    }}
                  >
                    Traveler details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        First name *
                      </label>
                      <Input 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
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
                        Last name *
                      </label>
                      <Input 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
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
                      Email address *
                    </label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      style={{
                        border: '1px solid var(--border-primary)',
                        fontSize: '15px',
                      }}
                    />
                    <p style={{ fontSize: '13px', color: 'var(--label-tertiary)', marginTop: '4px' }}>
                      Your confirmation will be sent here
                    </p>
                  </div>

                  <div>
                    <label 
                      className="block mb-2"
                      style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                    >
                      Phone number *
                    </label>
                    <Input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        border: '1px solid var(--border-primary)',
                        fontSize: '15px',
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Payment */}
            <Card 
              className="rounded-xl"
              style={{ 
                border: '1px solid var(--border-primary)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--interactive-primary)', color: 'white' }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>2</span>
                  </div>
                  <h2 
                    style={{ 
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                    }}
                  >
                    Payment information
                  </h2>
                </div>

                <div 
                  className="flex items-center gap-2 mb-6 p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--fill-accent)' }}
                >
                  <Lock className="w-4 h-4" style={{ color: 'var(--interactive-primary)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                    Your payment information is encrypted and secure
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label 
                      className="block mb-2"
                      style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                    >
                      Card number *
                    </label>
                    <Input 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{
                        border: '1px solid var(--border-primary)',
                        fontSize: '15px',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        Expiry date *
                      </label>
                      <Input 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
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
                        CVV *
                      </label>
                      <Input 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={3}
                        type="password"
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

            <Button 
              onClick={handleCompleteBooking}
              className="w-full glossy-hover"
              size="lg"
              style={{
                backgroundColor: 'var(--interactive-primary)',
                color: 'white',
                fontWeight: 600,
                fontSize: '16px',
                height: '56px',
                borderRadius: '8px',
              }}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Complete Booking - ${grandTotal.toFixed(2)}
            </Button>
          </div>

          {/* Right Column - Booking Summary */}
          <div>
            <Card 
              className="sticky rounded-xl"
              style={{ 
                top: '100px',
                border: '1px solid var(--border-primary)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <CardContent className="p-6">
                <h2 
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                    marginBottom: '24px',
                  }}
                >
                  Booking summary
                </h2>

                {items.map((item) => {
                  const totalTravelers = item.adults + item.children + item.infants;
                  const itemTotal = item.price * totalTravelers;
                  
                  return (
                    <div key={item.activityId} className="mb-6">
                      <div className="flex gap-3 mb-4">
                        <img
                          src={item.image}
                          alt={item.activityTitle}
                          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 
                            style={{ 
                              fontSize: '15px',
                              fontWeight: 600,
                              color: 'var(--label-primary)',
                              marginBottom: '8px',
                              lineHeight: '1.4',
                            }}
                          >
                            {item.activityTitle}
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Calendar className="w-4 h-4" />
                          <span>{item.startDate === item.endDate ? item.startDate : `${item.startDate} - ${item.endDate}`}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Clock className="w-4 h-4" />
                          <span>{item.pickupTime}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Users className="w-4 h-4" />
                          <span>
                            {item.adults > 0 && `${item.adults} Adult${item.adults > 1 ? 's' : ''}`}
                            {item.children > 0 && `, ${item.children} Child${item.children > 1 ? 'ren' : ''}`}
                            {item.infants > 0 && `, ${item.infants} Infant${item.infants > 1 ? 's' : ''}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--label-primary)' }}>
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Separator style={{ margin: '24px 0' }} />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ fontSize: '15px', color: 'var(--label-secondary)' }}>Subtotal</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--label-primary)' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '15px', color: 'var(--label-secondary)' }}>Service fee (12%)</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--label-primary)' }}>
                      ${serviceFee.toFixed(2)}
                    </span>
                  </div>
                  
                  <Separator style={{ margin: '16px 0' }} />
                  
                  <div className="flex justify-between">
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      Total
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div 
                  className="mt-6 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--fill-accent)' }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Check className="w-4 h-4 mt-0.5" style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                      Free cancellation up to 24 hours before
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5" style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                      Instant confirmation
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}