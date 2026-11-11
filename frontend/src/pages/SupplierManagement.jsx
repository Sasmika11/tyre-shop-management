// frontend/src/pages/SupplierManagement.jsx
import React, { useState, useRef } from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';
import ActionButtons from '../components/ActionButtons';
import SupplierTabs from '../components/SupplierTabs'; // Imported here now

const SupplierManagement = () => {
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [refreshListTrigger, setRefreshListTrigger] = useState(0);
    
    const formRef = useRef(null);

    const handleSupplierSelect = (id) => {
        setSelectedSupplierId(id);
    };

    const triggerListRefresh = () => {
        setRefreshListTrigger(prev => prev + 1);
    };

    const handleClear = () => {
        setSelectedSupplierId(null);
        if (formRef.current) {
            formRef.current.clearForm();
        }
    };

    return (
        <>
            <div className="main-content">
                {/* TOP SECTION: Left List & Right Form */}
                <div className="top-section">
                    <div className="left-panel">
                        <SupplierList 
                            selectedId={selectedSupplierId} 
                            onSelect={handleSupplierSelect}
                            refreshTrigger={refreshListTrigger}
                        />
                    </div>

                    <div className="right-panel">
                        <SupplierForm 
                            ref={formRef}
                            selectedId={selectedSupplierId}
                            onSuccess={triggerListRefresh}
                        />
                    </div>
                </div>

                {/* BOTTOM SECTION: Full Width Tabs */}
                <div className="bottom-section">
                    {selectedSupplierId ? (
                        <SupplierTabs supplierId={selectedSupplierId} />
                    ) : (
                        <div style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                            Select a supplier from the list above to view and manage Contacts, Banks, Categories, Remarks, and Documents.
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER: Action Buttons */}
            <div className="app-footer">
                <ActionButtons 
                    onNew={handleClear}
                    onSave={() => formRef.current?.handleSave()}
                    onUpdate={() => formRef.current?.handleUpdate()}
                    onDelete={() => formRef.current?.handleDelete()}
                    onClear={handleClear}
                    hasSelected={!!selectedSupplierId}
                />
            </div>
        </>
    );
};

export default SupplierManagement;