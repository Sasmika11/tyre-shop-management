// frontend/src/components/BankDetails.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const API_BASE = 'http://localhost/tyre-shop-management/backend/api/banks/index.php';

const BankDetails = ({ supplierId }) => {
    const [banks, setBanks] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bank_name: '', branch_name: '', account_holder: '', account_number: '', is_default: 0
    });

    useEffect(() => {
        fetchBanks();
    }, [supplierId]);

    const fetchBanks = async () => {
        try {
            const response = await fetch(`${API_BASE}?supplier_id=${supplierId}`);
            const result = await response.json();
            if (result.status === 'success') {
                setBanks(result.data);
            }
        } catch (error) {
            console.error('Error fetching bank details:', error);
        }
    };

    const handleSelect = (bank) => {
        setSelectedId(bank.id);
        setFormData({
            bank_name: bank.bank_name,
            branch_name: bank.branch_name,
            account_holder: bank.account_holder,
            account_number: bank.account_number,
            is_default: bank.is_default
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSave = async () => {
        if (!formData.bank_name || !formData.account_number) return alert('Bank Name and Account Number are required.');
        
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${API_BASE}?id=${selectedId}` : API_BASE;
            
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, supplier_id: supplierId })
            });
            const result = await response.json();
            
            if (result.status === 'success') {
                fetchBanks();
                setIsEditing(false);
                setFormData({ bank_name: '', branch_name: '', account_holder: '', account_number: '', is_default: 0 });
                setSelectedId(null);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error saving bank details:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return alert('Select a bank to delete');
        if (!window.confirm('Delete this bank detail?')) return;

        try {
            const response = await fetch(`${API_BASE}?id=${selectedId}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.status === 'success') {
                fetchBanks();
                setSelectedId(null);
                setFormData({ bank_name: '', branch_name: '', account_holder: '', account_number: '', is_default: 0 });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error deleting bank:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '15px', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <input type="text" name="bank_name" placeholder="Bank Name *" value={formData.bank_name} onChange={handleChange} style={{ flex: 1 }} />
                    <input type="text" name="branch_name" placeholder="Branch Name" value={formData.branch_name} onChange={handleChange} style={{ flex: 1 }} />
                    <input type="text" name="account_holder" placeholder="Account Holder" value={formData.account_holder} onChange={handleChange} style={{ flex: 1 }} />
                    <input type="text" name="account_number" placeholder="Account Number *" value={formData.account_number} onChange={handleChange} style={{ flex: 1 }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
                        <input type="checkbox" name="is_default" checked={formData.is_default === 1} onChange={handleChange} /> Default
                    </label>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Bank Name</th>
                                <th>Branch Name</th>
                                <th>Account Holder</th>
                                <th>Account No</th>
                                <th style={{ textAlign: 'center' }}>Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map((bank, index) => (
                                <tr 
                                    key={bank.id} 
                                    onClick={() => handleSelect(bank)}
                                    className={selectedId === bank.id ? 'selected' : ''}
                                >
                                    <td>{index + 1}</td>
                                    <td>{bank.bank_name}</td>
                                    <td>{bank.branch_name}</td>
                                    <td>{bank.account_holder}</td>
                                    <td>{bank.account_number}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input type="checkbox" readOnly checked={bank.is_default === 1} />
                                    </td>
                                </tr>
                            ))}
                            {banks.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>No bank details found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="action-btn btn-new" onClick={() => { isEditing ? setIsEditing(false) : handleSave(); }} style={{ width: '100%', justifyContent: 'center' }}>
                    <Plus size={14} /> {isEditing ? 'Cancel' : 'Add'}
                </button>
                <button className="action-btn btn-update" onClick={() => { if (selectedId) setIsEditing(true); handleSave(); }} disabled={!selectedId && !isEditing} style={{ width: '100%', justifyContent: 'center', opacity: (!selectedId && !isEditing) ? 0.5 : 1 }}>
                    <Edit2 size={14} /> {isEditing ? 'Save Edit' : 'Edit'}
                </button>
                <button className="action-btn btn-delete" onClick={handleDelete} disabled={!selectedId} style={{ width: '100%', justifyContent: 'center', opacity: !selectedId ? 0.5 : 1 }}>
                    <Trash2 size={14} /> Delete
                </button>
            </div>
        </div>
    );
};

export default BankDetails;