import React from 'react';

const RemoteDisplayFrame = () => {
    return (
        <iframe className="frame" src="https://remotedisplay.chrisprimes.com/manager.php" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="Remote Display"></iframe>
    );
}

export { RemoteDisplayFrame };