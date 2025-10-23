// User authentication state
let isAuthenticated = false;

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return false;
    }
    
    // Here you would typically make an API call to your backend
    // For now, we'll use localStorage for demonstration
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
        // Check if we're in the pages directory or root
        const path = window.location.pathname;
        if (path.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        showError('Invalid email or password');
    }
    
    return false;
}

// Show signup form
function showSignup() {
    const loginBox = document.querySelector('.login-box');
    loginBox.innerHTML = `
        <img src="../images/logo.png" alt="Mosaic Maps Logo" class="login-logo">
        <h2>Create Account</h2>
        <form id="signupForm" onsubmit="return handleSignup(event)">
            <div class="form-group">
                <label for="signupEmail">Email</label>
                <input type="email" id="signupEmail" required>
            </div>
            <div class="form-group">
                <label for="signupPassword">Password</label>
                <input type="password" id="signupPassword" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" required>
            </div>
            <button type="submit" class="login-btn">Sign Up</button>
            <div class="auth-links">
                <a href="#" onclick="showLogin()">Already have an account? Login</a>
            </div>
        </form>
    `;
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    
    // Store user in localStorage (in a real app, this would be handled by a backend)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        showError('Email already exists');
        return false;
    }
    
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success and redirect to login
    alert('Account created successfully! Please login.');
    showLogin();
    return false;
}

// Show login form
function showLogin() {
    window.location.reload();
}

// Show forgot password form
function showForgotPassword() {
    const loginBox = document.querySelector('.login-box');
    loginBox.innerHTML = `
        <img src="../images/logo.png" alt="Mosaic Maps Logo" class="login-logo">
        <h2>Reset Password</h2>
        <form id="resetForm" onsubmit="return handleResetPassword(event)">
            <div class="form-group">
                <label for="resetEmail">Email</label>
                <input type="email" id="resetEmail" required>
            </div>
            <button type="submit" class="login-btn">Send Reset Link</button>
            <div class="auth-links">
                <a href="#" onclick="showLogin()">Back to Login</a>
            </div>
        </form>
    `;
}

// Handle password reset
function handleResetPassword(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    // In a real application, this would send a reset link to the user's email
    alert('If an account exists with this email, you will receive a password reset link.');
    showLogin();
    return false;
}

// Show error message
function showError(message) {
    alert(message); // In a real app, replace with a better UI notification
}

// Check authentication status - DISABLED FOR DEVELOPMENT
function checkAuth() {
    // Authentication check disabled
    return true;
}

// Logout function
function logout() {
    // Check if we're in the pages directory or root
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Authentication check disabled for development
// if (!window.location.href.includes('login.html')) {
//     checkAuth();
// }