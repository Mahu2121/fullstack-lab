import { useState } from "react";
import type { Producto } from "../types/Producto";

const API_URL = "http://localhost:8080";

const formatoPrecio = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
});

interface ProductCardProps {
    producto: Producto;
    onAddToCart?: (producto: Producto) => void;
}

function ProductCard({ producto, onAddToCart }: ProductCardProps) {
    const [imagenError, setImagenError] = useState(false);

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Imagen */}
            <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100">
                {imagenError ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-12 w-12 text-slate-300"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                    </svg>
                ) : (
                    <img
                        src={`${API_URL}/api/productos/${producto.id}/imagen`}
                        alt={producto.nombre}
                        loading="lazy"
                        onError={() => setImagenError(true)}
                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                    />
                )}

                {producto.categoria && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                        {producto.categoria}
                    </span>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-tight text-slate-900">
                    {producto.nombre}
                </h3>

                {producto.descripcion && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {producto.descripcion}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-2xl font-bold text-slate-900">
                        {formatoPrecio.format(producto.precio)}
                    </p>

                    <button
                        onClick={() => onAddToCart?.(producto)}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                        </svg>
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;