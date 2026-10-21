import type { Producto } from "../types/Producto";

const API_URL = "http://localhost:8080/api/productos";

export async function getProductos(): Promise<Producto[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}