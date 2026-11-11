// frontend/src/components/Remarks.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const API_BASE = 'http://localhost/tyre-shop-management/backend/api/remarks/index.php';

const Remarks = ({ supplierId }) => {
    const [remarks, setRemarks] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [remarkText, setRemarkText] = useState('');

    useEffect(() => { fetchRemarks(); }, [supplierId]);

    const fetchRemarks = async () => {
        try {
            const response = await fetch(`${API_BASE}?supplier_id=${supplierId}`);
            const result = await response.json();
            if (result.status === 'success') setRemarks(result.data);
        } catch (error) { console.error(error); }
    };

    const handleSave = async () => {
        if (!remarkText) return alert('Remark cannot be empty.');
        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ supplier_id: supplierId, remark: remarkText })
            });
            const result = await response.json();
            if (result.status === 'success') {
                fetchRemarks();
                setRemarkText('');
            }
        } catch (error) { console.error(error); }
    };

    const handleDelete = async () => {
        if (!selectedId) return alert('Select a remark to delete');
        if (!window.confirm('Delete this remark?')) return;
        try {
            const response = await fetch(`${API_BASE}?id=${selectedId}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.status === 'success') {
                fetchRemarks();
                setSelectedId(null);
            }
        } catch (error) { console.error(error); }
    };

    return (
        <div style={{ display: 'flex', gap: '15px', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <input type="text" placeholder="Enter Remark..." value={remarkText} onChange={(e) => setRemarkText(e.target.value)} style={{ flex: 1 }} />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Remark</th>
                                <th>Date / Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {remarks.map((rmk, index) => (
                                <tr key={rmk.id} onClick={() => setSelectedId(rmk.id)} className={selectedId === rmk.id ? 'selected' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{rmk.remark}</td>
                                    <td>{new Date(rmk.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                            {remarks.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>No remarks found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="action-btn btn-new" onClick={handleSave} style={{ width: '100%', justifyContent: 'center' }}><Plus size={14} /> Add</button>
                <button className="action-btn btn-delete" onClick={handleDelete} disabled={!selectedId} style={{ width: '100%', justifyContent: 'center', opacity: !selectedId ? 0.5 : 1 }}><Trash2 size={14} /> Delete</button>
            </div>
        </div>
    );
};

export default Remarks;