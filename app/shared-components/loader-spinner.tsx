import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useState } from 'react';

interface LoadingSpinnerProps {
    visible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ visible }) => {
    const [visibleDialog, setVisibleDialog] = useState(false);
    return (
        <Dialog style={{ boxShadow: "none" }} contentStyle={{ background: "transparent" }} visible={visible} onHide={() => setVisibleDialog(false)} showHeader={false} closable={false}>
            <div className={`loading-spinner-overlay ${visible ? 'visible' : 'hidden'} p-3`} >
                <ProgressSpinner />
            </div>
        </Dialog>
    );
};

export default LoadingSpinner;