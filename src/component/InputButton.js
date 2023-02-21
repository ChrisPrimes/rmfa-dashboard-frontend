import React from 'react';
import { Spinner } from './Spinner';

const InputButton = ({ children, loading, ...restProps }) => {
    return (
        loading ? <Spinner /> :
            <button {...restProps} >
                {children}
            </button>
    );
}

export { InputButton };