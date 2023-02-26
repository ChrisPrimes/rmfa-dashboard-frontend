import React from 'react';

const Wrapper = ({ children }) => {
    return (
        <div className="container-fluid h-100">
            {children}
        </div>
    );
}

export { Wrapper };