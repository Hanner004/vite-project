const API = import.meta.env.VITE_API_BACKEND;

console.log('API', API);

export const editorialAPI = `${API}/editorials`;
export const authorAPI = `${API}/authors`;
export const booksAPI = `${API}/books`;
export const clientAPI = `${API}/clients`;
export const reservationAPI = `${API}/reservations`;
export const authAPI = `${API}/auth`;
