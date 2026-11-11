// frontend/src/components/ContactDetails.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const API_BASE = 'http://localhost/tyre-shop-management/backend/api/contacts/index.php';

const ContactDetails = ({ supplierId }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        contact_person: '', designation: '', phone: '', email: '', is_default: 0
    });

    useEffect(() => {
        fetchContacts();
    }, [supplierId]);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_BASE}?supplier_id=${supplierId}`);
            const result = await response.json();
            if (result.status === 'success') {
                setContacts(result.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleSelect = (contact) => {
        setSelectedId(contact.id);
        setFormData({
            contact_person: contact.contact_person,
            designation: contact.designation,
            phone: contact.phone,
            email: contact.email,
            is_default: contact.is_default
        });
        setIsAdding(false);
        setIsEditing(false); // Can click Edit to show form
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSave = async () => {
        if (!formData.contact_person) return alert('Contact Person is required');

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
                fetchContacts();
                setIsEditing(false);
                setIsAdding(false);
                setFormData({ contact_person: '', designation: '', phone: '', email: '', is_default: 0 });
                setSelectedId(null);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return alert('Select a contact to delete');
        if (!window.confirm('Delete this contact?')) return;

        try {
            const response = await fetch(`${API_BASE}?id=${selectedId}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.status === 'success') {
                fetchContacts();
                setSelectedId(null);
                setFormData({ contact_person: '', designation: '', phone: '', email: '', is_default: 0 });
                setIsEditing(false);
                setIsAdding(false);
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        /* --- UPDATED: Reduced gap to 10px --- */
        <div style={{ display: 'flex', gap: '10px', height: '100%' }}>
            {/* Left: Table area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Inline form - hidden unless Adding or Editing */}
                {(isAdding || isEditing) && (
                    <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '3px', border: '1px solid var(--border-color)' }}>
                        <input type="text" name="contact_person" placeholder="Contact Person *" value={formData.contact_person} onChange={handleChange} style={{ flex: 1 }} />
                        <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} style={{ flex: 1 }} />
                        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={{ width: '110px' }} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ flex: 1 }} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', minWidth: '60px' }}>
                            <input type="checkbox" name="is_default" checked={formData.is_default === 1} onChange={handleChange} /> Default
                        </label>
                    </div>
                )}

                <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
                    <table className="data-table">
                        <thead>
                            {/* --- UPDATED: Fixed column widths using percentages --- */}
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '25%' }}>Contact Person</th>
                                <th style={{ width: '20%' }}>Designation</th>
                                <th style={{ width: '20%' }}>Phone</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th style={{ width: '5%', textAlign: 'center' }}>Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr 
                                    key={contact.id} 
                                    onClick={() => handleSelect(contact)}
                                    className={selectedId === contact.id ? 'selected' : ''}
                                >
                                    <td>{index + 1}</td>
                                    <td>{contact.contact_person}</td>
                                    <td>{contact.designation}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input type="checkbox" readOnly checked={contact.is_default === 1} />
                                    </td>
                                </tr>
                            ))}
                            {contacts.length === 0 && (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>No contacts found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- UPDATED: Fixed width to 90px to match image exactly, replaced action-btn with tab-action-btn --- */}
            <div style={{ width: '90px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button 
                    className="tab-action-btn tab-btn-add" 
                    onClick={() => {
                        if (isAdding || isEditing) {
                            handleSave();
                            setIsAdding(false);
                        } else {
                            setIsAdding(true);
                            setFormData({ contact_person: '', designation: '', phone: '', email: '', is_default: 0 });
                            setSelectedId(null);
                            setIsEditing(false);
                        }
                    }}
                >
                    <Plus size={14} /> {(isAdding || isEditing) ? 'Save' : 'Add'}
                </button>

                <button 
                    className="tab-action-btn tab-btn-edit" 
                    onClick={() => {
                        if (selectedId) setIsEditing(true);
                    }}
                    disabled={!selectedId}
                >
                    <Edit2 size={14} /> Edit
                </button>

                <button 
                    className="tab-action-btn tab-btn-delete" 
                    onClick={handleDelete}
                    disabled={!selectedId}
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>
        </div>
    );
};

export default ContactDetails;