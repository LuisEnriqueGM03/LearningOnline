function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}


function logoutAndRedirect() {
    logout();
    window.location.href = '../../index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById('username-display').textContent = currentUser.username;
    }
});