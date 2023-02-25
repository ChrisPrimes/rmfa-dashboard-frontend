import { AuthService } from './AuthService'

const serverRoot = "https://rmfa-dashboard.prod.chrisprimes.com"

const handleTimeout = async (tryToRefresh) => {
    let successfulRefresh = false;

    if (tryToRefresh) {
        try {
            await AuthService.refresh();
            successfulRefresh = true;
        } catch (e) {
            // Leave successfulRefresh as false
        }
    }

    if (!successfulRefresh) {
        AuthService.logout();
        document.body.innerHTML = "";
        alert('Your session has expired.');
        window.location = '/';
    }

};

const implPost = async (url, body, authenticated, tryToRefresh) => {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authenticated ? `Bearer ${AuthService.getToken()}` : null
    };

    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: headers
    });

    if (!response.ok) {
        if (authenticated && response.status === 401) {
            await handleTimeout(authenticated && tryToRefresh);
            // If we return from handleTimeout, then we refreshed our token
            return implPost(url, body, authenticated, false);
        } else {
            throw new Error('Error fetching data fron API.');
        }
    }

    const json = await response.json();

    return json;
};

const implGet = async (url, authenticated, tryToRefresh) => {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authenticated ? `Bearer ${AuthService.getToken()}` : null
    };

    const response = await fetch(url, {
        method: 'get',
        headers: headers
    });

    if (!response.ok) {
        if (authenticated && response.status === 401) {
            await handleTimeout(authenticated && tryToRefresh);
            // If we return from handleTimeout, then we refreshed our token
            return implGet(url, authenticated, false);
        } else {
            throw new Error('Error fetching data fron API.');
        }
    }

    const json = await response.json();

    return json;
};

const ApiService = {
    post: async (url, body, authenticated = false) => {
        return implPost(url, body, authenticated, true);
    },

    get: async (url, authenticated = false) => {
        return implGet(url, authenticated, true);
    },

    serverRoot: () => {
        return serverRoot;
    }
}

export { ApiService }