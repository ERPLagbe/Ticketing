import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    toast.success('Welcome back!');
    navigate('/account/bookings');
  };

  const handleDemoLogin = () => {
    setEmail('demo@getyourguide.com');
    setPassword('password');
    dispatch(login({ email: 'demo@getyourguide.com', password: 'password' }));
    toast.success('Logged in with demo account!');
    navigate('/account/bookings');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--fill-primary)', paddingTop: 'var(--spacing-12-5x)', paddingBottom: 'var(--spacing-5x)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            style={{ 
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--label-primary)',
              marginBottom: '8px',
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)' }}>
            Sign in to your account to continue
          </p>
        </div>

        <Card 
          className="rounded-xl"
          style={{ 
            border: '1px solid var(--border-primary)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    border: '1px solid var(--border-primary)',
                    fontSize: '15px',
                    height: '44px',
                  }}
                />
              </div>
              <div>
                <label 
                  className="block mb-2"
                  style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    border: '1px solid var(--border-primary)',
                    fontSize: '15px',
                    height: '44px',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--interactive-primary)' }}
                  />
                  Remember me
                </label>
                <Link 
                  to="/forgot-password" 
                  style={{ color: 'var(--interactive-primary)', fontWeight: 500 }}
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full glossy-hover"
                style={{
                  backgroundColor: 'var(--interactive-primary)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '16px',
                  height: '48px',
                }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in
              </Button>
            </form>

            <div className="relative my-6">
              <div 
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full" style={{ borderTop: '1px solid var(--border-primary)' }}></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span 
                  className="px-2"
                  style={{ backgroundColor: 'white', color: 'var(--label-tertiary)' }}
                >
                  Or
                </span>
              </div>
            </div>

            <Button 
              type="button"
              onClick={handleDemoLogin}
              variant="outline"
              className="w-full glossy-hover"
              style={{
                border: '2px solid var(--interactive-primary)',
                color: 'var(--interactive-primary)',
                fontWeight: 600,
                fontSize: '15px',
                height: '48px',
              }}
            >
              Try Demo Account
            </Button>

            <div className="mt-6 text-center">
              <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                Don't have an account?{' '}
              </span>
              <Link 
                to="/register"
                style={{ 
                  fontSize: '14px',
                  color: 'var(--interactive-primary)',
                  fontWeight: 600,
                }}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div 
          className="mt-6 p-4 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-accent)' }}
        >
          <p style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
            <strong>Demo Credentials:</strong> Any email/password works, or click "Try Demo Account"
          </p>
        </div>
      </div>
    </div>
  );
}