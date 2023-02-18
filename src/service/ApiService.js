import { AuthService } from './AuthService'

const ApiService = {
    post: async (url, body, authenticated = false) => {

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
            if (response.status === 401) {
                AuthService.logout();
                alert('Your session has expired.');
                window.location = '/';
                return;
            } else {
                throw new Error('Error fetching data fron API.');
            }

        }

        const json = await response.json();

        return json;
    }
}

export { ApiService }