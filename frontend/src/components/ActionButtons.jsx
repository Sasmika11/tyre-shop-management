// frontend/src/components/ActionButtons.jsx
import React from 'react';
import { 
    SkipBack, ChevronLeft, ChevronRight, SkipForward, 
    FilePlus, Save, Edit, Trash2, XSquare, Printer, X 
} from 'lucide-react';

const ActionButtons = ({ onNew, onSave, onUpdate, onDelete, onClear, hasSelected }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {/* Left Navigation Buttons */}
            <div style={{ display: 'flex', gap: '5px' }}>
                <button className="action-btn btn-nav"><SkipBack size={16} /> First</button>
                <button className="action-btn btn-nav"><ChevronLeft size={16} /> Previous</button>
                <button className="action-btn btn-nav">Next <ChevronRight size={16} /></button>
                <button className="action-btn btn-nav">Last <SkipForward size={16} /></button>
            </div>

            {/* Right Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button className="action-btn btn-new" onClick={onNew}>
                    <FilePlus size={16} /> New
                </button>
                
                {!hasSelected ? (
                    <button className="action-btn btn-save" onClick={onSave}>
                        <Save size={16} /> Save
                    </button>
                ) : (
                    <button className="action-btn btn-update" onClick={onUpdate}>
                        <Edit size={16} /> Update
                    </button>
                )}

                <button className="action-btn btn-delete" onClick={onDelete} disabled={!hasSelected} style={{ opacity: hasSelected ? 1 : 0.5 }}>
                    <Trash2 size={16} /> Delete
                </button>
                
                <button className="action-btn btn-clear" onClick={onClear}>
                    <XSquare size={16} /> Clear
                </button>
                
                <button className="action-btn btn-print" onClick={() => window.print()} disabled={!hasSelected} style={{ opacity: hasSelected ? 1 : 0.5 }}>
                    <Printer size={16} /> Print
                </button>
                
                <button className="action-btn btn-nav" onClick={() => window.close()}>
                    <X size={16} /> Close
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;