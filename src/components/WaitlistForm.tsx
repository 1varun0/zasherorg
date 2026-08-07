import React, { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simulate submission
    console.log('Submitted email to waitlist:', email);
    setStatus('success');
    setError('');
  };

  if (status === 'success') {
    return (
      <div style={{ marginTop: '24px', padding: '24px', border: '1px solid var(--slate)', borderRadius: '4px', background: 'var(--slate-dim)', color: 'var(--slate)' }}>
        <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', marginBottom: '8px' }}>You're on the list.</h4>
        <p style={{ fontSize: '15px' }}>We'll notify you when Wallet Tracker is ready for beta testing.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <label htmlFor="email" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate)' }}>
        Join the Waitlist
      </label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="email" 
          id="email"
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            flex: 1,
            background: 'var(--ink-2)', 
            border: '1px solid var(--line)', 
            borderRadius: '4px', 
            padding: '12px 16px',
            color: 'var(--parchment)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--slate)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
        />
        <button 
          type="submit"
          style={{
            background: 'var(--slate)',
            color: 'var(--ink)',
            border: 'none',
            borderRadius: '4px',
            padding: '0 24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Join
        </button>
      </div>
      {error && <p style={{ color: '#E87A7A', fontSize: '13px' }}>{error}</p>}
    </form>
  );
}
