// frontend/src/components/SupplierList.jsx
import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw } from 'lucide-react';
import { supplierService } from '../services/supplierService';

const SupplierList = ({ selectedId, onSelect, refreshTrigger }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSuppliers = async () => {
        try {
            const response = await supplierService.getAllSuppliers(searchTerm);
            if (response.status === 'success') {
                setSuppliers(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
        }
    };

    // Re-fetch when search changes or when an external refresh is triggered (like a save/update)
    useEffect(() => {
        fetchSuppliers();
    }, [searchTerm, refreshTrigger]);

    const handleRefresh = () => {
        setSearchTerm('');
        fetchSuppliers();
    };

    return (
        <>
            <div className="panel-header">
                <Users size={16} /> Supplier List
            </div>
            
            <div style={{ padding: '8px', display: 'flex', gap: '5px' }}>
                <input 
                    type="text" 
                    placeholder="Search by Code, Name, Phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button className="btn-nav" onClick={fetchSuppliers} style={{ padding: '4px 8px' }}>
                    <Search size={16} />
                </button>
                <button className="btn-nav" onClick={handleRefresh} style={{ padding: '4px 8px' }}>
                    <RefreshCw size={16} />
                </button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
                <table className="data-table">
                    <thead>
                        {/* --- UPDATED: Fixed Column Proportions to match original image --- */}
                        <tr>
                            <th style={{ width: '22%' }}>Code</th>
                            <th style={{ width: '42%' }}>Supplier Name</th>
                            <th style={{ width: '22%' }}>Phone</th>
                            <th style={{ width: '14%', textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => (
                            <tr 
                                key={supplier.id} 
                                className={selectedId === supplier.id ? 'selected' : ''}
                                onClick={() => onSelect(supplier.id)}
                            >
                                <td>{supplier.supplier_code}</td>
                                <td>{supplier.supplier_name}</td>
                                <td>{supplier.phone_1}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <span className={`status-badge ${supplier.is_active ? 'status-active' : 'status-inactive'}`}>
                                        {supplier.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {suppliers.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>No suppliers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SupplierList;