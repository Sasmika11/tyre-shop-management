// frontend/src/services/supplierService.js

const API_BASE_URL = 'http://localhost/tyre-shop-management/backend/api';

export const supplierService = {
    // Suppliers
    getAllSuppliers: async (search = '') => {
        const response = await fetch(`${API_BASE_URL}/suppliers/index.php?search=${encodeURIComponent(search)}`);
        return response.json();
    },
    getSupplierById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/suppliers/index.php?id=${id}`);
        return response.json();
    },
    generateCode: async () => {
        const response = await fetch(`${API_BASE_URL}/suppliers/generate_code.php`);
        return response.json();
    },
    createSupplier: async (data) => {
        const response = await fetch(`${API_BASE_URL}/suppliers/index.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    updateSupplier: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/suppliers/index.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    deleteSupplier: async (id) => {
        const response = await fetch(`${API_BASE_URL}/suppliers/index.php?id=${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },
    uploadLogo: async (supplierId, file) => {
        const formData = new FormData();
        formData.append('supplier_id', supplierId);
        formData.append('logo', file);

        const response = await fetch(`${API_BASE_URL}/suppliers/upload_logo.php`, {
            method: 'POST',
            body: formData // No Content-Type header; browser sets it automatically with boundary for FormData
        });
        return response.json();
    }
};