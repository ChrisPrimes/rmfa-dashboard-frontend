import React from 'react';

import { AuthService } from './service/AuthService';

const RemoteDisplayFrame = () => {
    const token = AuthService.getToken();
    const url = "https://remotedisplay.chrisprimes.com/embedded/?token=" + token;

    return (
        <iframe className="frame" src={url} sandbox="allow-modals allow-scripts allow-popups allow-forms allow-same-origin" title="Remote Display"></iframe>
    );
}

export { RemoteDisplayFrame };