function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        window.location.href = 'user.html';
        return false; 
    } else {
        alert('Invalid username or password');
        return false; 
    }
}
