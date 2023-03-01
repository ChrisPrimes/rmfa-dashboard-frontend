import React from 'react';

const RemoteDisplayFrame = () => {
    return (
        <iframe className="frame" src="https://remotedisplay.chrisprimes.com/manager.php" sandbox="allow-modals allow-scripts" title="Remote Display"></iframe>
    );
}

export { RemoteDisplayFrame };