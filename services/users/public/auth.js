const API_URL = process.env.API_URL || 'http://localhost:3001';

async function register() {
    const username= document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    document.getElementById('auth-status').textContent = data.message;
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('auth-status').textContent = 'Login successful';
        window.location.href = 'index.html';
    } else {
        document.getElementById('auth-status').textContent = data.message;
    }
}