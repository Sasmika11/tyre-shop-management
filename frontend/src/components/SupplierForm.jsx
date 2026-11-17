import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { User, Search, Upload, Trash2 } from 'lucide-react';
import { supplierService } from '../services/supplierService';

const initialFormData = {
    supplier_code: '', supplier_name: '', short_name: '', category: 'Tyre & Accessories',
    contact_person: '', designation: '', phone_1: '', phone_2: '', email: '', website: '',
    address: '', city: '', district: 'Colombo', postal_code: '', country: 'Sri Lanka',
    tax_no: '', credit_limit: '0.00', payment_term: '30', is_active: 1, logo_path: ''
};

const SupplierForm = forwardRef(({ selectedId, onSuccess }, ref) => {
    const [formData, setFormData] = useState(initialFormData);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    useImperativeHandle(ref, () => ({
        clearForm, handleSave, handleUpdate, handleDelete
    }));

    const clearForm = async () => {
        setFormData(initialFormData);
        setLogoFile(null);
        setLogoPreview(null);
        try {
            const res = await supplierService.generateCode();
            if (res.status === 'success') setFormData(prev => ({ ...prev, supplier_code: res.data }));
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (selectedId) loadSupplierData(selectedId);
        else clearForm();
    }, [selectedId]);

    const loadSupplierData = async (id) => {
        try {
            const res = await supplierService.getSupplierById(id);
            if (res.status === 'success') {
                setFormData(res.data);
                setLogoPreview(res.data.logo_path ? `http://localhost/tyre-shop-management/backend/${res.data.logo_path}` : null);
            }
        } catch (err) { console.error(err); }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) { setLogoFile(file); setLogoPreview(URL.createObjectURL(file)); }
    };

    const removeLogo = () => {
        setLogoFile(null); setLogoPreview(null); setFormData(prev => ({ ...prev, logo_path: '' }));
    };

    const handleSave = async () => {
        if (!formData.supplier_name) return alert("Supplier Name is required.");
        try {
            const res = await supplierService.createSupplier(formData);
            if (res.status === 'success') {
                if (logoFile) await supplierService.uploadLogo(res.id, logoFile);
                alert(res.message); onSuccess();
            } else { alert(res.message); }
        } catch (err) { console.error(err); }
    };

    const handleUpdate = async () => {
        if (!selectedId) return alert("Please select a supplier to update.");
        try {
            const res = await supplierService.updateSupplier(selectedId, formData);
            if (res.status === 'success') {
                if (logoFile) await supplierService.uploadLogo(selectedId, logoFile);
                alert(res.message); onSuccess();
            } else { alert(res.message); }
        } catch (err) { console.error(err); }
    };

    const handleDelete = async () => {
        if (!selectedId) return alert("Please select a supplier to delete.");
        if (window.confirm("Are you sure you want to delete this supplier?")) {
            try {
                const res = await supplierService.deleteSupplier(selectedId);
                if (res.status === 'success') { alert(res.message); clearForm(); onSuccess(); }
                else { alert(res.message); }
            } catch (err) { console.error(err); }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="panel-header">
                <User size={16} /> Supplier Details
            </div>
            
            <div className="form-grid" style={{ overflowY: 'auto', paddingBottom: '15px' }}>
                {/* Left Column */}
                <div>
                    <div className="form-group">
                        <label className="form-label">Supplier Code <span className="required-label">*</span></label>
                        <div className="form-control-wrapper">
                            <input type="text" name="supplier_code" value={formData.supplier_code} readOnly style={{ backgroundColor: '#eee' }} />
                            <button className="btn-nav" style={{ padding: '0 8px' }}><Search size={14} /></button>
                        </div>
                    </div>
                    <div className="form-group"><label className="form-label">Supplier Name <span className="required-label">*</span></label><input type="text" name="supplier_name" value={formData.supplier_name} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Short Name</label><input type="text" name="short_name" value={formData.short_name} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Category</label><select name="category" value={formData.category} onChange={handleChange}><option value="Tyre & Accessories">Tyre & Accessories</option><option value="Spare Parts">Spare Parts</option><option value="Lubricants">Lubricants</option></select></div>
                    <div className="form-group" style={{ marginTop: '15px' }}><label className="form-label">Contact Person</label><input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Designation</label><input type="text" name="designation" value={formData.designation} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Phone 1</label><input type="text" name="phone_1" value={formData.phone_1} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Phone 2</label><input type="text" name="phone_2" value={formData.phone_2} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Website</label><input type="text" name="website" value={formData.website} onChange={handleChange} /></div>
                </div>

                {/* Right Column */}
                <div>
                    {/* Logo Upload Section - Moved to the right with square design */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', marginLeft: '60px' }}>
                        
                        {/* 1. Logo Box */}
                        <div style={{ 
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '6px', 
                            border: '1px dashed #ccc', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor: '#f8f9fa',
                            overflow: 'hidden'
                        }}>
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '12px', color: '#aaa' }}>No Logo</span>
                            )}
                        </div>

                        {/* 2. Add/Remove Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                             <label className="action-btn btn-nav" style={{ 
                              cursor: 'pointer', padding: '6px 15px', fontSize: '12px', fontWeight: 'bold', minWidth: '100px', justifyContent: 'center' 
                        }}>
                            <Upload size={14} style={{ marginRight: '6px' }} /> Add Logo
                            <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleLogoChange} />
                           </label>
    
                         <button type="button" className="action-btn btn-nav" onClick={removeLogo} style={{ 
                            padding: '6px 15px', fontSize: '12px', fontWeight: 'bold', minWidth: '100px', justifyContent: 'center' 
                     }}>
                               <Trash2 size={14} style={{ marginRight: '6px' }} /> Remove
                      </button>
                   </div>
                        
                    </div>

                    <div className="form-group"><label className="form-label">Address</label><textarea name="address" value={formData.address} onChange={handleChange} rows="3" style={{ flex: 1, resize: 'none' }} /></div>
                    <div className="form-group"><label className="form-label">City</label><input type="text" name="city" value={formData.city} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">District</label><select name="district" value={formData.district} onChange={handleChange}><option value="Colombo">Colombo</option><option value="Gampaha">Gampaha</option></select></div>
                    <div className="form-group"><label className="form-label">Postal Code</label><input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Country</label><input type="text" name="country" value={formData.country} onChange={handleChange} /></div>
                    
                    <div className="form-group" style={{ marginTop: '15px' }}><label className="form-label">Tax No / VAT No</label><input type="text" name="tax_no" value={formData.tax_no} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Credit Limit (Rs.)</label><input type="number" step="0.01" name="credit_limit" value={formData.credit_limit} onChange={handleChange} /></div>
                    <div className="form-group"><label className="form-label">Payment Term (Days)</label><input type="number" name="payment_term" value={formData.payment_term} onChange={handleChange} /></div>
                    <div className="form-group" style={{ justifyContent: 'flex-end', marginTop: '5px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" name="is_active" checked={formData.is_active === 1} onChange={handleChange} /> Active</label>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SupplierForm;