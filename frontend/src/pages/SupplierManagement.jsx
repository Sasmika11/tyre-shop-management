import React, { useState, useRef } from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';
import SupplierTabs from '../components/SupplierTabs';
import ActionButtons from '../components/ActionButtons';

const SupplierManagement = () => {
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [refreshListTrigger, setRefreshListTrigger] = useState(0);
    const formRef = useRef(null);

    const handleSupplierSelect = (id) => setSelectedSupplierId(id);
    const triggerListRefresh = () => setRefreshListTrigger(prev => prev + 1);
    
    const handleClear = () => {
        setSelectedSupplierId(null);
        if (formRef.current) formRef.current.clearForm();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            
            {/* Main Content (Top and Bottom Rows) */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '8px', gap: '8px', overflow: 'hidden' }}>
                
                {/* TOP ROW: Supplier List (Left) & Form (Right) */}
                {/* වෙනස්කම: මෙහි flex: 1 යොදා ඉහළ කොටසට වැඩිම ඉඩක් (උසක්) ලබා දී ඇත */}
                <div style={{ display: 'flex', gap: '8px', flex: 1, minHeight: '0' }}>
                    <div className="left-panel" style={{ height: '100%' }}>
                        <SupplierList 
                            selectedId={selectedSupplierId} 
                            onSelect={handleSupplierSelect}
                            refreshTrigger={refreshListTrigger}
                        />
                    </div>
                    <div className="right-panel" style={{ height: '100%' }}>
                        <SupplierForm 
                            ref={formRef}
                            selectedId={selectedSupplierId}
                            onSuccess={triggerListRefresh}
                        />
                    </div>
                </div>

         {/* BOTTOM ROW: Full Width Tabs */}
             
                <div style={{ height: '210px', display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '4px', minHeight: '0' }}>
                    {selectedSupplierId ? (
                        <SupplierTabs supplierId={selectedSupplierId} />
                    ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            Save the supplier first to add Contacts, Banks, Categories, Remarks, and Documents.
                        </div>
                    )}
                </div>

            </div>

            {/* Footer Buttons */}
            <ActionButtons 
                onNew={handleClear}
                onSave={() => formRef.current?.handleSave()}
                onUpdate={() => formRef.current?.handleUpdate()}
                onDelete={() => formRef.current?.handleDelete()}
                onClear={handleClear}
                hasSelected={!!selectedSupplierId}
            />
        </div>
    );
};

export default SupplierManagement;