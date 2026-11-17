import type { Usuario, UsuarioForm } from "../types/Usuario";
import { getToken } from "./AuthService";

const API_URL = "http://localhost:8080/api/usuarios";

function authHeaders(): HeadersInit {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export async function getUsuarios(): Promise<Usuario[]> {
    const res = await fetch(API_URL, { headers: authHeaders() });
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
}

export async function crearUsuario(usuario: UsuarioForm): Promise<Usuario> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al crear el usuario");
    return res.json();
}

export async function actualizarUsuario(
    id: number,
    usuario: UsuarioForm
): Promise<Usuario> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al actualizar el usuario");
    return res.json();
}

export async function eliminarUsuario(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Error al eliminar el usuario");
}