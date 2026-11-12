import React from 'react';
import { 
    SkipBack, Play, SkipForward, 
    FilePlus, Save, Edit, Trash2, Eraser, Printer, X 
} from 'lucide-react';

const ActionButtons = ({ onNew, onSave, onUpdate, onDelete, onClear, hasSelected }) => {
    return (
        <div className="app-footer" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            
            {/* Left Navigation Buttons - Stacked layout (Icon on top, Text on bottom) */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-nav-stacked">
                    <SkipBack size={16} fill="currentColor" /> 
                    <span>First</span>
                </button>
                <button className="btn-nav-stacked">
                    <Play size={16} fill="currentColor" style={{ transform: 'rotate(180deg)' }} /> 
                    <span>Previous</span>
                </button>
                <button className="btn-nav-stacked">
                    <Play size={16} fill="currentColor" />
                    <span>Next</span>
                </button>
                <button className="btn-nav-stacked">
                    <SkipForward size={16} fill="currentColor" /> 
                    <span>Last</span>
                </button>
            </div>

            {/* Spacer to push next items to the right side */}
            <div style={{ flex: 1 }}></div>

            {/* Center/Right Action Buttons (CRUD) */}
            <div style={{ display: 'flex', gap: '8px', marginRight: '20px' }}>
                <button className="action-btn btn-new" onClick={onNew}>
                    <FilePlus size={15} /> New
                </button>
                
                <button className="action-btn btn-save" onClick={onSave} disabled={hasSelected}>
                    <Save size={15} /> Save
                </button>
                
                <button className="action-btn btn-update" onClick={onUpdate} disabled={!hasSelected}>
                    <Edit size={15} /> Update
                </button>

                <button className="action-btn btn-delete" onClick={onDelete} disabled={!hasSelected}>
                    <Trash2 size={15} /> Delete
                </button>
                
                <button className="action-btn btn-clear" onClick={onClear}>
                    <Eraser size={15} /> Clear
                </button>
                
                <button className="action-btn btn-print" onClick={() => window.print()} disabled={!hasSelected}>
                    <Printer size={15} /> Print
                </button>
            </div>

            {/* Far Right: Close Button at the corner */}
            <div>
                <button className="action-btn btn-nav" onClick={() => window.close()} style={{ minWidth: '90px' }}>
                    <X size={15} /> Close
                </button>
            </div>

        </div>
    );
};

export default ActionButtons;