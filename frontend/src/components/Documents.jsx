// frontend/src/components/Documents.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye } from 'lucide-react';

const API_BASE = 'http://localhost/tyre-shop-management/backend/api/documents/index.php';

const Documents = ({ supplierId }) => {
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({ document_name: '', document_type: 'Contract' });

    useEffect(() => { fetchDocuments(); }, [supplierId]);

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${API_BASE}?supplier_id=${supplierId}`);
            const result = await response.json();
            if (result.status === 'success') setDocuments(result.data);
        } catch (error) { console.error(error); }
    };

    const handleUpload = async () => {
        if (!file || !formData.document_name) return alert('Document Name and File are required.');
        
        const uploadData = new FormData();
        uploadData.append('supplier_id', supplierId);
        uploadData.append('document_name', formData.document_name);
        uploadData.append('document_type', formData.document_type);
        uploadData.append('document_file', file);

        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                body: uploadData
            });
            const result = await response.json();
            if (result.status === 'success') {
                fetchDocuments();
                setFile(null);
                setFormData({ document_name: '', document_type: 'Contract' });
            } else {
                alert(result.message);
            }
        } catch (error) { console.error(error); }
    };

    const handleDelete = async () => {
        if (!selectedDoc) return alert('Select a document to delete');
        if (!window.confirm('Delete this document?')) return;
        try {
            const response = await fetch(`${API_BASE}?id=${selectedDoc.id}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.status === 'success') {
                fetchDocuments();
                setSelectedDoc(null);
            }
        } catch (error) { console.error(error); }
    };

    const handleView = () => {
        if (!selectedDoc) return;
        window.open(`http://localhost/tyre-shop-backend/${selectedDoc.file_path}`, '_blank');
    };

    return (
        <div style={{ display: 'flex', gap: '15px', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <input type="text" placeholder="Document Name *" value={formData.document_name} onChange={(e) => setFormData({...formData, document_name: e.target.value})} style={{ flex: 1 }} />
                    <select value={formData.document_type} onChange={(e) => setFormData({...formData, document_type: e.target.value})} style={{ width: '150px' }}>
                        <option value="Contract">Contract</option>
                        <option value="BR Copy">BR Copy</option>
                        <option value="Tax Certificate">Tax Certificate</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ flex: 1 }} />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border-color)' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Document Name</th>
                                <th>Type</th>
                                <th>Upload Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={doc.id} onClick={() => setSelectedDoc(doc)} className={selectedDoc?.id === doc.id ? 'selected' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{doc.document_name}</td>
                                    <td>{doc.document_type}</td>
                                    <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {documents.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>No documents uploaded.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="action-btn btn-new" onClick={handleUpload} style={{ width: '100%', justifyContent: 'center' }}><Upload size={14} /> Upload</button>
                <button className="action-btn btn-nav" onClick={handleView} disabled={!selectedDoc} style={{ width: '100%', justifyContent: 'center', backgroundColor: '#17a2b8', color: '#fff', opacity: !selectedDoc ? 0.5 : 1 }}><Eye size={14} /> View</button>
                <button className="action-btn btn-delete" onClick={handleDelete} disabled={!selectedDoc} style={{ width: '100%', justifyContent: 'center', opacity: !selectedDoc ? 0.5 : 1 }}><Trash2 size={14} /> Delete</button>
            </div>
        </div>
    );
};

export default Documents;