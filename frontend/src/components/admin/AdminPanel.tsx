import { ShieldCheck } from "lucide-react";
import type { SeccionAdmin } from "../Sidebar";
import UsuariosAdmin from "./UsuariosAdmin";
import ProductosAdmin from "./ProductosAdmin";
import EstadisticasAdmin from "./EstadisticasAdmin";

function AdminPanel({ seccion }: { seccion: SeccionAdmin }) {
    return (
        <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                <ShieldCheck className="h-4 w-4" />
                Panel de administrador
            </div>

            {seccion === "admin-usuarios" && <UsuariosAdmin />}
            {seccion === "admin-productos" && <ProductosAdmin />}
            {seccion === "admin-estadisticas" && <EstadisticasAdmin />}
        </div>
    );
}

export default AdminPanel;