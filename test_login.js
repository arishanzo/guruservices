// Test script untuk login endpoint
const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Testing login endpoint...');
        
        // 1. Test CSRF cookie endpoint
        console.log('1. Getting CSRF cookie...');
        const csrfResponse = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        console.log('CSRF Status:', csrfResponse.status);
        
        // 2. Test login endpoint
        console.log('2. Testing login...');
        const loginResponse = await axios.post('http://localhost:8000/api/login', {
            email_user: 'test@example.com',
            password_user: 'password123'
        }, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        console.log('Login Status:', loginResponse.status);
        console.log('Login Response:', loginResponse.data);
        
    } catch (error) {
        console.error('Error details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Headers:', error.response?.headers);
    }
};

testLogin();