import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-border mx-auto text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export { Spinner };