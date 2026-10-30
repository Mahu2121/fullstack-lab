import { useEffect, useState } from "react";
import { getProductos } from "./services/ProductService";
import { isLoggedIn, logout } from "./services/AuthService";
import type { Producto } from "./types/Producto";
import Login from "./components/Login";

function App() {
    const [logged, setLogged] = useState(isLoggedIn());
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        if (!logged) return;
        getProductos()
            .then(setProductos)
            .catch(console.error);
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
        <div>
            <h1>Productos Velumi</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <ul>
                {productos.map((p) => (
                    <li key={p.id}>
                        {p.nombre} - {p.precio} €
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;