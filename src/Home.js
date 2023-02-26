import React from 'react';

import { Wrapper } from './component/Wrapper'

const Home = () => {
    return (
        <Wrapper>
            <div className="mt-3">
                <h2>Welcome</h2>
                <p>Please choose an option in the menu.</p>
            </div>
        </Wrapper>
    );
}

export { Home };