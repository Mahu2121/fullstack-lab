import { useEffect, useState } from "react";
import { getProductos } from "./services/ProductService";
import { isLoggedIn, logout } from "./services/AuthService";
import type { Producto } from "./types/Producto";
import Login from "./components/Login";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import ProductCard from "./components/ProductCard";

function App() {
    const [logged, setLogged] = useState(isLoggedIn());
    const [productos, setProductos] = useState<Producto[]>([]);

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

    return (
        <div className="min-h-screen bg-neutral-50 px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <BlurFade delay={0.1}>
                    <header className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Productos Velumi
                        </h1>
                        <ShimmerButton onClick={handleLogout} className="px-4 py-2 text-sm">
                            Cerrar sesión
                        </ShimmerButton>
                    </header>
                </BlurFade>

                {productos.length === 0 ? (
                    <p className="text-neutral-500">No hay productos todavía.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {productos.map((p, i) => (
                            <BlurFade key={p.id} delay={0.15 + i * 0.05}>
                                <ProductCard producto={p} />
                            </BlurFade>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;