import { useEffect, useState } from "react";
import { getUsuarios } from "../../services/UsuarioService";
import { getProductos } from "../../services/ProductService";
import { Tarjeta } from "./UsuariosAdmin";

function EstadisticasAdmin() {
    const [datos, setDatos] = useState({ usuarios: 0, productos: 0, categorias: 0 });

    useEffect(() => {
        Promise.all([getUsuarios(), getProductos()])
            .then(([u, p]) =>
                setDatos({
                    usuarios: u.length,
                    productos: p.length,
                    categorias: new Set(p.map((x) => x.categoria)).size,
                })
            )
            .catch(console.error);
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">Estadísticas</h1>
            <p className="mb-6 text-slate-500">Resumen general de la plataforma.</p>

            <div className="grid gap-4 sm:grid-cols-3">
                <Tarjeta titulo="Usuarios registrados" valor={datos.usuarios} />
                <Tarjeta titulo="Productos" valor={datos.productos} />
                <Tarjeta titulo="Categorías" valor={datos.categorias} />
            </div>
        </>
    );
}

export default EstadisticasAdmin;