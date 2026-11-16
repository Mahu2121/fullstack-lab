import {useEffect, useState} from "react";
import {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "../../services/ProductService";
import type {Producto} from "../../types/Producto";


function ProductosAdmin() {
    const [productos, setProductos] = useState<Producto[]>([]);

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenUrl, setImagenUrl] = useState("");
    const [activo, setActivo] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);

    useEffect(() => {
        getProductos().then(setProductos).catch(console.error);
    }, []);

    function limpiarFormulario() {
        setNombre("");
        setCategoria("");
        setPrecio("");
        setDescripcion("");
        setImagenUrl("");
        setActivo(false);
        setEditandoId(null);
    }

    async function handleGuardarProducto(e: React.FormEvent) {
        e.preventDefault();

        const datosProducto = {
            nombre,
            categoria,
            precio: Number(precio),
            descripcion,
            imagenUrl,
            activo,
        };

        try {
            if (editandoId !== null) {
                await actualizarProducto(editandoId, datosProducto);
                alert("Producto actualizado correctamente");
            } else {
                await crearProducto(datosProducto);
                alert("Producto creado correctamente");
            }

            limpiarFormulario();
            setProductos(await getProductos());
        } catch (error) {
            console.error(error);
            alert("Error al guardar el producto");
        }
    }

    function handleEditar(p: Producto) {
        setEditandoId(p.id);
        setNombre(p.nombre);
        setCategoria(p.categoria);
        setPrecio(String(p.precio));
        setDescripcion(p.descripcion ?? "");
        setImagenUrl(p.imagenUrl ?? "");
        setActivo(p.activo);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

        try {
            await eliminarProducto(id);
            setProductos((prev) => prev.filter((p) => p.id !== id));
            if (editandoId === id) limpiarFormulario();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el producto");
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Gestión de productos</h1>
            <p className="mb-6 text-slate-500">Catálogo completo de la tienda.</p>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm my-5">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                    <tr>
                        <th className="p-3 font-medium">ID</th>
                        <th className="p-3 font-medium">Nombre</th>
                        <th className="p-3 font-medium">Categoría</th>
                        <th className="p-3 font-medium">Precio</th>
                        <th className="p-3 font-medium">ImagenUrl</th>
                        <th className="p-3 font-medium">Activo</th>
                        <th className="p-3 font-medium">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.map((p) => (
                        <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="p-3 text-slate-500">{p.id}</td>
                            <td className="p-3 font-medium">{p.nombre}</td>
                            <td className="p-3">{p.categoria}</td>
                            <td className="p-3">{p.precio} €</td>
                            <td className="p-3">{p.imagenUrl} </td>
                            <td className="p-3">
                                {p.activo ? (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                                        Activo
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                                        Inactivo
                                    </span>
                                )}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditar(p)}
                                        className="rounded-lg bg-indigo-100 px-3 py-1 text-indigo-700 hover:bg-indigo-200"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(p.id)}
                                        className="rounded-lg bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* FORMULARIO PARA CREAR / EDITAR PRODUCTOS */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    {editandoId !== null ? "Editar producto" : "Añadir nuevo producto"}
                </h2>

                <form onSubmit={handleGuardarProducto} className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre del producto"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Categoría
                        </label>
                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Categoría"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            step="0.01"
                            placeholder="Precio del producto"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Descripción
                        </label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Descripción del producto"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nombre imagen
                        </label>
                        <input
                            type="text"
                            value={imagenUrl}
                            onChange={(e) => setImagenUrl(e.target.value)}
                            placeholder="Nombre del archivo de la imagen"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Activo
                        </label>
                        <input
                            type="checkbox"
                            checked={activo}
                            onChange={(e) => setActivo(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex gap-3 sm:col-span-2">
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
                        >
                            {editandoId !== null ? "Guardar cambios" : "Crear producto"}
                        </button>

                        {editandoId !== null && (
                            <button
                                type="button"
                                onClick={limpiarFormulario}
                                className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProductosAdmin;