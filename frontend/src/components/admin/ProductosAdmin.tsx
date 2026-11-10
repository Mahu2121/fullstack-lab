import { useEffect, useState } from "react";
import { getProductos } from "../../services/ProductService";
import type { Producto } from "../../types/Producto";

function ProductosAdmin() {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        getProductos().then(setProductos).catch(console.error);
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">Gestión de productos</h1>
            <p className="mb-6 text-slate-500">Catálogo completo de la tienda.</p>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                    <tr>
                        <th className="p-3 font-medium">ID</th>
                        <th className="p-3 font-medium">Nombre</th>
                        <th className="p-3 font-medium">Categoría</th>
                        <th className="p-3 font-medium">Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.map((p) => (
                        <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="p-3 text-slate-500">#{p.id}</td>
                            <td className="p-3 font-medium">{p.nombre}</td>
                            <td className="p-3">{p.categoria}</td>
                            <td className="p-3">{p.precio} €</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ProductosAdmin;