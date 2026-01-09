import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromCart, closeCartDrawer } from '../store/slices/cartSlice';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Separator } from './ui/separator';
import { Trash2, Calendar, Users, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

export function CartDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, isDrawerOpen } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleRemoveItem = (activityId: string) => {
    dispatch(removeFromCart(activityId));
  };

  const handleClose = () => {
    dispatch(closeCartDrawer());
  };

  const handleCheckout = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      dispatch(closeCartDrawer());
      toast.error('Please sign in to continue', {
        description: 'You need to be logged in to proceed to checkout',
      });
      // Navigate to login page with return URL
      navigate('/login?redirect=/checkout');
      return;
    }

    dispatch(closeCartDrawer());
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    dispatch(closeCartDrawer());
    navigate('/search');
  };

  const serviceFee = total * 0.05; // 5% service fee
  const grandTotal = total + serviceFee;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg p-0 flex flex-col"
        style={{ backgroundColor: 'var(--background-primary)' }}
      >
        <SheetHeader 
          className="px-6 py-4 border-b"
          style={{ borderColor: 'var(--separator-primary)' }}
        >
          <SheetTitle 
            style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: 'var(--label-primary)' 
            }}
          >
            Shopping Cart
            {items.length > 0 && (
              <span 
                className="ml-2 text-sm font-normal"
                style={{ color: 'var(--label-secondary)' }}
              >
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            View and manage your cart items, review totals, and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 px-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--surface-secondary)' }}
            >
              <ShoppingBag 
                className="w-10 h-10" 
                style={{ color: 'var(--label-tertiary)' }} 
              />
            </div>
            <h3 
              className="mb-2 text-center"
              style={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                color: 'var(--label-primary)' 
              }}
            >
              Your cart is empty
            </h3>
            <p 
              className="mb-6 text-center"
              style={{ 
                fontSize: '14px', 
                color: 'var(--label-secondary)' 
              }}
            >
              Explore our amazing activities and start planning your adventure!
            </p>
            <Button 
              onClick={handleContinueShopping}
              className="inline-flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--decorative-guiding-red)',
                color: 'white',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Browse Activities
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item, index) => {
                  const totalTravelers = item.adults + item.children + item.infants;
                  const itemTotal = item.price * totalTravelers;
                  
                  return (
                    <div 
                      key={`${item.activityId}-${index}`}
                      className="pb-4 border-b"
                      style={{ borderColor: 'var(--separator-primary)' }}
                    >
                      <div className="flex gap-3">
                        {/* Activity Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.activityTitle}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Activity Details */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="mb-2 line-clamp-2"
                            style={{ 
                              fontSize: '14px', 
                              fontWeight: 600, 
                              color: 'var(--label-primary)' 
                            }}
                          >
                            {item.activityTitle}
                          </h4>

                          {/* Booking Details */}
                          <div className="space-y-1">
                            {!item.isTourPackage && (
                              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--label-secondary)' }}>
                                <Calendar className="w-3 h-3" />
                                <span>{format(new Date(item.startDate), 'MMM d, yyyy')}</span>
                              </div>
                            )}
                            {item.packageOption && (
                              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--label-secondary)' }}>
                                <Clock className="w-3 h-3" />
                                <span>{item.isTourPackage ? 'Flexible' : item.packageOption.timeSlot} • {item.packageOption.title}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--label-secondary)' }}>
                              <Users className="w-3 h-3" />
                              <span>
                                {item.adults > 0 && `${item.adults} Adult${item.adults > 1 ? 's' : ''}`}
                                {item.children > 0 && `, ${item.children} Child${item.children > 1 ? 'ren' : ''}`}
                                {item.infants > 0 && `, ${item.infants} Infant${item.infants > 1 ? 's' : ''}`}
                              </span>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <p 
                                style={{ 
                                  fontSize: '16px', 
                                  fontWeight: 600, 
                                  color: 'var(--label-primary)' 
                                }}
                              >
                                ${itemTotal.toFixed(2)}
                              </p>
                              <p style={{ fontSize: '11px', color: 'var(--label-secondary)' }}>
                                {totalTravelers} × ${item.price}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                              onClick={() => handleRemoveItem(item.activityId)}
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
                              <span className="text-xs">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Order Summary - Fixed at bottom */}
            <div 
              className="border-t px-6 py-4"
              style={{ borderColor: 'var(--separator-primary)' }}
            >
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    Subtotal
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--label-primary)' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    Service Fee (5%)
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--label-primary)' }}>
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span 
                    style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: 'var(--label-primary)' 
                    }}
                  >
                    Total
                  </span>
                  <span 
                    style={{ 
                      fontSize: '20px', 
                      fontWeight: 600, 
                      color: 'var(--decorative-guiding-red)' 
                    }}
                  >
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2 mb-2"
                style={{ 
                  backgroundColor: 'var(--decorative-guiding-red)',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={handleContinueShopping}
                className="w-full"
                style={{ 
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Continue Shopping
              </Button>

              {/* Trust Badge */}
              <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: 'var(--border-primary)' }}>
                <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}