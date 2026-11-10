
import { useEffect, useState } from "react";
import { getUsuarios } from "../../services/UsuarioService";
import type { Usuario } from "../../types/Usuario";

function UsuariosAdmin() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        getUsuarios()
            .then(setUsuarios)
            .catch((e: Error) => setError(e.message))
            .finally(() => setCargando(false));
    }, []);

    // Contar administradores
    const admins = usuarios.filter(
        (u) => u.rol === "ROLE_ADMIN"
    ).length;

    // Filtrar usuarios por nombre
    const filtrados = usuarios.filter((u) =>
        (u.username || "")
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <>
            <h1 className="text-3xl font-bold">Usuarios</h1>
            <p className="mb-6 text-slate-500">
                Gestiona los usuarios de la plataforma.
            </p>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Tarjeta titulo="Total usuarios" valor={usuarios.length} />
                <Tarjeta titulo="Administradores" valor={admins} />
                <Tarjeta
                    titulo="Usuarios normales"
                    valor={usuarios.length - admins}
                />
            </div>

            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Filtrar por nombre de usuario..."
                className="mb-4 w-full max-w-sm rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />

            {cargando && (
                <p className="text-slate-500">Cargando...</p>
            )}

            {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </p>
            )}

            {!cargando && !error && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-3 font-medium">ID</th>
                            <th className="p-3 font-medium">Usuario</th>
                            <th className="p-3 font-medium">Rol</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filtrados.map((u) => (
                            <tr
                                key={u.id}
                                className="border-t border-slate-100 hover:bg-slate-50"
                            >
                                <td className="p-3 text-slate-500">
                                    #{u.id}
                                </td>

                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold uppercase text-white">
                                            {(u.username || "?")[0]}
                                        </div>

                                        <span className="font-medium">
                                                {u.username}
                                            </span>
                                    </div>
                                </td>

                                <td className="p-3">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                u.rol === "ROLE_ADMIN"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {u.rol === "ROLE_ADMIN"
                                                ? "Admin"
                                                : "Usuario"}
                                        </span>
                                </td>
                            </tr>
                        ))}

                        {filtrados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-6 text-center text-slate-500"
                                >
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export function Tarjeta({
                            titulo,
                            valor
                        }: {
    titulo: string;
    valor: number | string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{titulo}</p>
            <p className="mt-1 text-3xl font-bold">{valor}</p>
        </div>
    );
}

export default UsuariosAdmin;
