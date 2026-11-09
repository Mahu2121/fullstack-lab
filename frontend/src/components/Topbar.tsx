import { Bell, Search } from "lucide-react";

interface TopbarProps {
    busqueda: string;
    onBusqueda: (v: string) => void;
}

function Topbar({ busqueda, onBusqueda }: TopbarProps) {
    return (
        <header className="flex items-center justify-between gap-4 bg-white px-6 py-4 shadow-sm">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    value={busqueda}
                    onChange={(e) => onBusqueda(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-100 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative text-slate-600 hover:text-slate-900">
                    <Bell className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        3
                    </span>
                </button>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                    U
                </div>
            </div>
        </header>
    );
}

export default Topbar;