// frontend/src/components/SupplierTabs.jsx
import React, { useState } from 'react';
import { UserCircle, Landmark, Package, FileText, Paperclip } from 'lucide-react';
import ContactDetails from './ContactDetails';
import BankDetails from './BankDetails';
import ProductCategories from './ProductCategories';
import Remarks from './Remarks';
import Documents from './Documents';

const SupplierTabs = ({ supplierId }) => {
    const [activeTab, setActiveTab] = useState('contacts');

    const tabs = [
        { id: 'contacts', label: 'Contact Details', icon: <UserCircle size={14} /> },
        { id: 'banks', label: 'Bank Details', icon: <Landmark size={14} /> },
        { id: 'categories', label: 'Product Categories', icon: <Package size={14} /> },
        { id: 'remarks', label: 'Remarks', icon: <FileText size={14} /> },
        { id: 'documents', label: 'Documents', icon: <Paperclip size={14} /> }
    ];

    return (
        /* --- UPDATED: Removed border-top and margin-top, set height to 100% --- */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* Tab Headers */}
            <div className="tabs-header-container">
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-item ${activeTab === tab.id ? 'tab-item-active' : 'tab-item-inactive'}`}
                    >
                        {tab.icon} {tab.label}
                    </div>
                ))}
            </div>

            {/* Tab Content Area */}
            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#fff' }}>
                {activeTab === 'contacts' && <ContactDetails supplierId={supplierId} />}
                {activeTab === 'banks' && <BankDetails supplierId={supplierId} />}
                {activeTab === 'categories' && <ProductCategories supplierId={supplierId} />}
                {activeTab === 'remarks' && <Remarks supplierId={supplierId} />}
                {activeTab === 'documents' && <Documents supplierId={supplierId} />}
            </div>
        </div>
    );
};

export default SupplierTabs;