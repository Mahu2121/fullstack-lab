const API_URL = "http://localhost:8080/api/auth";
const TOKEN_KEY = "token";

export async function login(username: string, password: string): Promise<void> {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
    const data: { token: string } = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
}

export function logout(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
    return getToken() !== null;
}