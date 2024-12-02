export function apiFetch(url, options = {}) {
    const token = localStorage.getItem('authToken');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
}

export async function getCurrentUser() {
    const token = getToken();
    if (!token) return null;

    const apiUrl = `https://sid-api-yrbb.onrender.com/users/me`;
    const sentData = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = await fetch(apiUrl, sentData);

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return null;
}

export function isUserLoggedIn() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

export function getToken() {
    return localStorage.getItem('authToken');
}

export function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
}
