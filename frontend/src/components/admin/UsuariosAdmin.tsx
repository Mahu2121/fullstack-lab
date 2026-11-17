import { useEffect, useState } from "react";
import {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../../services/UsuarioService";
import type { Usuario } from "../../types/Usuario";

function UsuariosAdmin() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");

    // Formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("ROLE_USER");
    const [email, setEmail] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);

    useEffect(() => {
        getUsuarios()
            .then(setUsuarios)
            .catch((e: Error) => setError(e.message))
            .finally(() => setCargando(false));
    }, []);

    function limpiarFormulario() {
        setUsername("");
        setPassword("");
        setRol("ROLE_USER");
        setEmail("");
        setEditandoId(null);
    }

    async function handleGuardar(e: React.FormEvent) {
        e.preventDefault();

        if (editandoId === null && !password) {
            alert("La contraseña es obligatoria al crear un usuario");
            return;
        }

        const datos = {
            username,
            email,
            rol,
            ...(password && { password }),
        };

        try {
            if (editandoId !== null) {
                await actualizarUsuario(editandoId, datos);
                alert("Usuario actualizado correctamente");
            } else {
                await crearUsuario(datos);
                alert("Usuario creado correctamente");
            }

            limpiarFormulario();
            setUsuarios(await getUsuarios());
        } catch (err) {
            console.error(err);
            alert("Error al guardar el usuario");
        }
    }

    function handleEditar(u: Usuario) {
        setEditandoId(u.id);
        setUsername(u.username);
        setPassword("");
        setRol(u.rol);
        setEmail(u.email ?? "");
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

        try {
            await eliminarUsuario(id);
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
            if (editandoId === id) limpiarFormulario();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar el usuario");
        }
    }

    const admins = usuarios.filter((u) => u.rol === "ROLE_ADMIN").length;

    const filtrados = usuarios.filter((u) => {
        const texto = busqueda.toLowerCase();
        return (
            (u.username || "").toLowerCase().includes(texto) ||
            (u.email || "").toLowerCase().includes(texto)
        );
    });

    return (
        <>
            <h1 className="text-3xl font-bold">Usuarios</h1>
            <p className="mb-6 text-slate-500">
                Gestiona los usuarios de la plataforma.
            </p>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Tarjeta titulo="Total usuarios" valor={usuarios.length} />
                <Tarjeta titulo="Administradores" valor={admins} />
                <Tarjeta titulo="Usuarios normales" valor={usuarios.length - admins} />
            </div>

            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Filtrar por usuario o email..."
                className="mb-4 w-full max-w-sm rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />

            {cargando && <p className="text-slate-500">Cargando...</p>}

            {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}

            {!cargando && !error && (
                <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-3 font-medium">ID</th>
                            <th className="p-3 font-medium">Usuario</th>
                            <th className="p-3 font-medium">Email</th>
                            <th className="p-3 font-medium">Rol</th>
                            <th className="p-3 font-medium">Acciones</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filtrados.map((u) => (
                            <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="p-3 text-slate-500">#{u.id}</td>

                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold uppercase text-white">
                                            {(u.username || "?")[0]}
                                        </div>
                                        <span className="font-medium">{u.username}</span>
                                    </div>
                                </td>

                                <td className="p-3 text-slate-600">{u.email}</td>

                                <td className="p-3">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            u.rol === "ROLE_ADMIN"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {u.rol === "ROLE_ADMIN" ? "Admin" : "Usuario"}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditar(u)}
                                            className="rounded-lg bg-indigo-100 px-3 py-1 text-indigo-700 hover:bg-indigo-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(u.id)}
                                            className="rounded-lg bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filtrados.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-slate-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* FORMULARIO CREAR / EDITAR */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    {editandoId !== null ? "Editar usuario" : "Añadir nuevo usuario"}
                </h2>

                <form onSubmit={handleGuardar} className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nombre de usuario"
                            required
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            required
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={
                                editandoId !== null
                                    ? "Dejar vacío para no cambiarla"
                                    : "Contraseña"
                            }
                            autoComplete="new-password"
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Rol</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            className="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"
                        >
                            <option value="ROLE_USER">Usuario</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </div>

                    <div className="flex gap-3 sm:col-span-2">
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
                        >
                            {editandoId !== null ? "Guardar cambios" : "Crear usuario"}
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

export function Tarjeta({
                            titulo,
                            valor,
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