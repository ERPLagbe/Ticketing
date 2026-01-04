import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    dispatch(register({ name, email, password }));
    toast.success('Account created successfully!');
    navigate('/account/bookings');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--fill-primary)', paddingTop: '40px', paddingBottom: '80px' }}
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
            Create an account
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--label-secondary)' }}>
            Sign up to start booking amazing experiences
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
                  <User className="w-4 h-4 inline mr-2" />
                  Full name
                </label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="Enter your password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
                  Confirm password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{
                    border: '1px solid var(--border-primary)',
                    fontSize: '15px',
                    height: '44px',
                  }}
                />
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  required
                  className="w-4 h-4 mt-1 rounded"
                  style={{ accentColor: 'var(--interactive-primary)' }}
                />
                <label style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: 'var(--interactive-primary)', fontWeight: 500 }}>
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" style={{ color: 'var(--interactive-primary)', fontWeight: 500 }}>
                    Privacy Policy
                  </Link>
                </label>
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
                <UserPlus className="w-5 h-5 mr-2" />
                Create account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                Already have an account?{' '}
              </span>
              <Link 
                to="/login"
                style={{ 
                  fontSize: '14px',
                  color: 'var(--interactive-primary)',
                  fontWeight: 600,
                }}
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div 
          className="mt-6 p-4 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-accent)' }}
        >
          <p style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
            By creating an account, you'll get access to exclusive deals and personalized recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
