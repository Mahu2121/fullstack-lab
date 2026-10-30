import type { Producto } from "../types/Producto";
import { getToken } from "./AuthService";

const API_URL = "http://localhost:8080/api/productos";

export async function getProductos(): Promise<Producto[]> {
    const token = getToken();
    const res = await fetch(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}