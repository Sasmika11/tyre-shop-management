// frontend/src/components/Header.jsx
import React from 'react';
import { Users, Minus, Square, X } from 'lucide-react';
import tyreLogo from '../assets/tyre-logo.png';

const Header = () => {
    return (
        <header className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
            
            {/* Left Side: Tyre Shop Management System */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                    src={tyreLogo} 
                    alt="Tyre Logo" 
                    style={{ 
                        height: '38px',       /* ලෝගුවේ උස පාලනය කර ඇත */
                        width: 'auto',        
                        objectFit: 'contain',
                        display: 'block'      
                    }} 
                />
                {/* මෙහි fontSize එක ඔබට අවශ්‍ය පරිදි (උදා: 18px, 20px, 22px) වැඩි කරගත හැක */}
                <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
                    Tyre Shop Management System
                </span>
            </div>
            
            {/* Right Side: Supplier Management */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '1px', height: '22px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '0 10px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={22} />
                    {/* මෙහි fontSize එකද අවශ්‍ය පරිදි වැඩි කරගත හැක */}
                    <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
                        Supplier Management
                    </span>
                </div>
            </div>

            {/* Window Controls */}
            <div className="header-controls" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                <button><Minus size={16} /></button>
                <button><Square size={14} /></button>
                <button><X size={18} /></button>
            </div>
        </header>
    );
};

export default Header;