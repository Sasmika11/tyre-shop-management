// frontend/src/components/Header.jsx
import React from 'react';
import { Settings, Users, Minus, Square, X } from 'lucide-react';

const Header = () => {
    return (
        <header className="app-header">
            {/* Main Header Container aligned with the panels below */}
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                
                {/* Left Side: Tyre Shop Management System */}
                <div style={{ width: '450px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={18} />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>Tyre Shop Management System</span>
                </div>
                
                {/* Right Side: Supplier Management - Moved further right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '240px' }}>
                    <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255,255,255,0.4)', marginRight: '15px' }}></div>
                    <Users size={18} />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>Supplier Management</span>
                </div>
            </div>

            {/* Window Controls */}
            <div className="header-controls">
                <button><Minus size={16} /></button>
                <button><Square size={14} /></button>
                <button><X size={18} /></button>
            </div>
        </header>
    );
};

export default Header;