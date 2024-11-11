export function apiFetch(url, options = {}) {
    const token = localStorage.getItem('authToken');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
}

function isUserLoggedIn() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
}
