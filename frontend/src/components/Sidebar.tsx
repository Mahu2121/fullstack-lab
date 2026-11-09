import { Home, Tag, User, Users, Package, Settings, ShoppingBag, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Seccion  = "inicio" | "productos" | "perfil" | "usuarios" | "pedidos" | "configuracion";

interface Item {
    id: Seccion;
    label: string;
    icon: LucideIcon;
}

const items: Item[] = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "productos", label: "Productos", icon: Tag },
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "pedidos", label: "Pedidos", icon: Package },
    { id: "configuracion", label: "Configuración", icon: Settings },
];

interface SidebarProps {
    activa: Seccion;
    onChange: (s: Seccion) => void;
    onLogout: () => void;
}

function Sidebar({ activa, onChange, onLogout }: SidebarProps) {
    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col bg-slate-900 p-4 text-slate-300">
            <div className="mb-8 flex items-center gap-2 px-2 text-white">
                <ShoppingBag className="h-7 w-7 text-indigo-400" />
                <span className="text-xl font-bold">Velumi</span>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {items.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                            activa === id
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                        {label}
                    </button>
                ))}
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