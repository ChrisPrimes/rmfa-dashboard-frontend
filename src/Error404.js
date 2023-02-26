import React from 'react';

import { Wrapper } from './component/Wrapper'

const Error404 = () => {
    return (
        <Wrapper>
            <div className="mt-3">
                <h2>Not Found</h2>
                <p>We cannot find a resource with the link provided.</p>
            </div>
        </Wrapper>
    );
}

export { Error404 };