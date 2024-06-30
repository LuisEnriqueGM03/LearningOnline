function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function checkAuth() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        console.log('No hay un usuario activo');
    } else {
        console.log('Usuario actual:', currentUser);
    }
}
document.addEventListener('DOMContentLoaded', checkAuth);
