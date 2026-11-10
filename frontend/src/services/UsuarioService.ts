import { getToken } from "./AuthService";
import type { Usuario } from "../types/Usuario";

export async function getUsuarios(): Promise<Usuario[]> {
    const res = await fetch("http://localhost:8080/api/admin/usuarios", {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (res.status === 401) throw new Error("Tu sesión ha caducado");
    if (res.status === 403) throw new Error("No tienes permisos de administrador");
    if (!res.ok) throw new Error("Error al cargar usuarios");
    return res.json();
}