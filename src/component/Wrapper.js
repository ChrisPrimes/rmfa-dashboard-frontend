import React from 'react';

const Wrapper = ({ children }) => {
    return (
        <div className="container-fluid">
            {children}
        </div>
    );
}

export { Wrapper };