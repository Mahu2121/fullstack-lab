import type { Producto } from "../types/Producto";
import { getToken } from "./AuthService";

const API_URL = "http://localhost:8080/api/productos";

function authHeaders(): HeadersInit {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export async function getProductos(): Promise<Producto[]> {
    const token = getToken();
    const res = await fetch(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export async function crearProducto(
    producto: Omit<Producto, "id">
): Promise<Producto> {
    const token = getToken();

    const res = await fetch(API_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(producto),
    });

    if (!res.ok) {
        throw new Error("Error al crear el producto");
    }

    return res.json();
}

export async function actualizarProducto(
    id: number,
    producto: Omit<Producto, "id">
): Promise<Producto> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(producto),
    });

    if (!res.ok) throw new Error("Error al actualizar el producto");
    return res.json();
}

export async function eliminarProducto(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    if (!res.ok) throw new Error("Error al eliminar el producto");
}
