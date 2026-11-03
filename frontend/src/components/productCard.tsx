import type { Producto } from "../types/Producto";

const API_URL = "http://localhost:8080";

interface ProductCardProps {
    producto: Producto;
}

function ProductCard({ producto }: ProductCardProps) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
            <img
                src={`${API_URL}/api/productos/${producto.id}/imagen`}
                alt={producto.nombre}
                className="h-48 w-full object-contain"
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />

            <h3 className="mt-3 text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-xl font-bold">{producto.precio} €</p>

            <button className="mt-3 w-full rounded-lg bg-black py-2 text-white">
                Añadir al carrito
            </button>
        </div>
    );
}

export default ProductCard;