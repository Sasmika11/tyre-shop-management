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
        { id: 'contacts', label: 'Contact Details', icon: <UserCircle size={15} /> },
        { id: 'banks', label: 'Bank Details', icon: <Landmark size={15} /> },
        { id: 'categories', label: 'Product Categories', icon: <Package size={15} /> },
        { id: 'remarks', label: 'Remarks', icon: <FileText size={15} /> },
        { id: 'documents', label: 'Documents', icon: <Paperclip size={15} /> }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* Tab Headers Area */}
            <div style={{ 
                display: 'flex', 
                backgroundColor: '#f8f9fa', 
                padding: '5px 5px 0 5px', 
                borderBottom: '1px solid var(--border-color)',
                borderTopLeftRadius: '4px', 
                borderTopRightRadius: '4px',
                gap: '6px' 
            }}>
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 25px', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            /* Active tab is white, inactive tabs are set to a darker grey (#d0d4dc) for clear visibility */
                            backgroundColor: activeTab === tab.id ? '#fff' : '#d0d4dc',
                            borderTop: activeTab === tab.id ? '3px solid var(--primary-maroon)' : '1px solid var(--border-color)',
                            borderLeft: '1px solid var(--border-color)',
                            borderRight: '1px solid var(--border-color)',
                            borderBottom: activeTab === tab.id ? '1px solid #fff' : '1px solid var(--border-color)',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                            color: activeTab === tab.id ? 'var(--primary-maroon)' : '#222',
                            fontWeight: 'bold', /* Made all tab labels bold */
                            fontSize: '12px', 
                            marginBottom: '-1px',
                            minWidth: '165px', 
                            justifyContent: 'center'
                        }}
                    >
                        {tab.icon} {tab.label}
                    </div>
                ))}
            </div>

            {/* Tab Content Area */}
            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#fff', minHeight: '0' }}>
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