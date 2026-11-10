import {
    Home, Tag, User, Package, Settings, ShoppingBag, LogOut,
    ShieldCheck, Users, Boxes, BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SeccionUsuario = "inicio" | "productos" | "perfil" | "pedidos";
export type SeccionAdmin = "admin-usuarios" | "admin-productos" | "admin-estadisticas";
export type Seccion = SeccionUsuario | SeccionAdmin;

interface Item<T> {
    id: T;
    label: string;
    icon: LucideIcon;
}

const itemsUsuario: Item<SeccionUsuario>[] = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "productos", label: "Productos", icon: Tag },
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "pedidos", label: "Pedidos", icon: Package },
];

const itemsAdmin: Item<SeccionAdmin>[] = [
    { id: "admin-usuarios", label: "Usuarios", icon: Users },
    { id: "admin-productos", label: "Gestión productos", icon: Boxes },
    { id: "admin-estadisticas", label: "Estadísticas", icon: BarChart3 },
];

interface SidebarProps {
    activa: Seccion;
    onChange: (s: Seccion) => void;
    onLogout: () => void;
    esAdmin: boolean;
}

function NavButton({label, icon: Icon, activo, onClick,}: {
    label: string;
    icon: LucideIcon;
    activo: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                activo ? "bg-indigo-600 text-white" : "hover:bg-slate-800 hover:text-white"
            }`}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    );
}

function Sidebar({ activa, onChange, onLogout, esAdmin }: SidebarProps) {
    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col bg-slate-900 p-4 text-slate-300">
            <div className="mb-8 flex items-center gap-2 px-2 text-white">
                <ShoppingBag className="h-7 w-7 text-indigo-400" />
                <span className="text-xl font-bold">Velumi</span>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {itemsUsuario.map(({ id, label, icon }) => (
                    <NavButton
                        key={id}
                        label={label}
                        icon={icon}
                        activo={activa === id}
                        onClick={() => onChange(id)}
                    />
                ))}

                {esAdmin && (
                    <>
                        <div className="mb-1 mt-6 flex items-center gap-2 border-t border-slate-700 px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-amber-400">
                            <ShieldCheck className="h-4 w-4" />
                            Administración
                        </div>
                        {itemsAdmin.map(({ id, label, icon }) => (
                            <NavButton
                                key={id}
                                label={label}
                                icon={icon}
                                activo={activa === id}
                                onClick={() => onChange(id)}
                            />
                        ))}
                    </>
                )}
            </nav>

            <button
                onClick={onLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-800 hover:text-white"
            >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
            </button>
        </aside>
    );
}

export default Sidebar;