// frontend/src/components/ProductCategories.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const API_BASE = 'http://localhost/tyre-shop-management/backend/api/categories/index.php';

const ProductCategories = ({ supplierId }) => {
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ category_name: '', description: '' });

    useEffect(() => { fetchCategories(); }, [supplierId]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE}?supplier_id=${supplierId}`);
            const result = await response.json();
            if (result.status === 'success') setCategories(result.data);
        } catch (error) { console.error(error); }
    };

    const handleSelect = (cat) => {
        setSelectedId(cat.id);
        setFormData({ category_name: cat.category_name, description: cat.description });
    };

    const handleSave = async () => {
        if (!formData.category_name) return alert('Category Name is required.');
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
                fetchCategories();
                setIsEditing(false);
                setFormData({ category_name: '', description: '' });
                setSelectedId(null);
            }
        } catch (error) { console.error(error); }
    };

    const handleDelete = async () => {
        if (!selectedId) return alert('Select a category to delete');
        if (!window.confirm('Delete this category?')) return;
        try {
            const response = await fetch(`${API_BASE}?id=${selectedId}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.status === 'success') {
                fetchCategories();
                setSelectedId(null);
                setFormData({ category_name: '', description: '' });
                setIsEditing(false);
            }
        } catch (error) { console.error(error); }
    };

    return (
        <div style={{ display: 'flex', gap: '15px', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <input type="text" placeholder="Category Name *" value={formData.category_name} onChange={(e) => setFormData({...formData, category_name: e.target.value})} style={{ flex: 1 }} />
                    <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ flex: 2 }} />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
                                <tr key={cat.id} onClick={() => handleSelect(cat)} className={selectedId === cat.id ? 'selected' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{cat.category_name}</td>
                                    <td>{cat.description}</td>
                                </tr>
                            ))}
                            {categories.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>No categories found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="action-btn btn-new" onClick={() => { isEditing ? setIsEditing(false) : handleSave(); }} style={{ width: '100%', justifyContent: 'center' }}><Plus size={14} /> {isEditing ? 'Cancel' : 'Add'}</button>
                <button className="action-btn btn-update" onClick={() => { if (selectedId) setIsEditing(true); handleSave(); }} disabled={!selectedId && !isEditing} style={{ width: '100%', justifyContent: 'center', opacity: (!selectedId && !isEditing) ? 0.5 : 1 }}><Edit2 size={14} /> {isEditing ? 'Save Edit' : 'Edit'}</button>
                <button className="action-btn btn-delete" onClick={handleDelete} disabled={!selectedId} style={{ width: '100%', justifyContent: 'center', opacity: !selectedId ? 0.5 : 1 }}><Trash2 size={14} /> Delete</button>
            </div>
        </div>
    );
};

export default ProductCategories;