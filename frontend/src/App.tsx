import { useEffect, useState } from "react";
import { getProductos } from "./services/ProductService";
import { isLoggedIn, logout } from "./services/AuthService";
import type { Producto } from "./types/Producto";
import Login from "./components/Login";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import type { Seccion } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { BlurFade } from "@/components/ui/blur-fade";

function App() {
    const [logged, setLogged] = useState(isLoggedIn());
    const [productos, setProductos] = useState<Producto[]>([]);
    const [seccion, setSeccion] = useState<Seccion>("productos");
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todos");

    const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

    useEffect(() => {
        if (!logged) return;
        getProductos().then(setProductos).catch(console.error);
    }, [logged]);

    function handleLogout() {
        logout();
        setProductos([]);
        setLogged(false);
    }

    if (!logged) {
        return <Login onLogin={() => setLogged(true)} />;
    }

    const filtrados = productos.filter((p) => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoria === "Todos" || p.categoria === categoria;
        return coincideNombre && coincideCategoria;
    });

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar activa={seccion} onChange={setSeccion} onLogout={handleLogout} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar busqueda={busqueda} onBusqueda={setBusqueda} />

                <main className="flex-1 overflow-y-auto p-6">
                    {seccion === "productos" ? (
                        <>
                            <h1 className="text-3xl font-bold">Productos</h1>
                            <p className="mb-6 text-slate-500">
                                Descubre nuestros productos y encuentra lo que necesitas.
                            </p>

                            <div className="mb-6 flex flex-wrap gap-2">
                                {categorias.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setCategoria(c)}
                                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                            categoria === c
                                                ? "bg-slate-900 text-white"
                                                : "bg-white text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>

                            {filtrados.length === 0 ? (
                                <p className="text-slate-500">No hay productos.</p>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                    {filtrados.map((p, i) => (
                                        <BlurFade key={p.id} delay={0.1 + i * 0.05}>
                                            <ProductCard producto={p} />
                                        </BlurFade>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <h1 className="text-3xl font-bold capitalize">{seccion}</h1>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;