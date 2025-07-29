import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo1.png" alt="IIT Indore Athletics Logo" style={{ height: '40px', marginRight: '10px' }} />
        <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          IIT Indore <span style={{ color: '#ffd700' }}>Athletics</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '24px',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '1rem'
      }}>
        <li><a href="#home">Home</a></li>
        <li><a href="#achievements">Achievements</a></li>
        <li><a href="#competitions">Competitions</a></li>
        <li><a href="#athletes">Athletes</a></li>
        <li><a href="#more">More</a></li>
      </ul>
    </nav>
  );
}
