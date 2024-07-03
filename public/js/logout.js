function logout() {
    localStorage.removeItem('user');
    console.log('Usuario ha cerrado sesión');
}