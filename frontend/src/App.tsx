import { useEffect, useState } from "react";
import { getProductos } from "./services/productoService";
import type { Producto } from "./types/Producto";

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getProductos().then(setProductos).catch(console.error);
  }, []);

  return (
      <ul>
        {productos.map((p) => (
            <li key={p.id}>{p.nombre} - {p.precio}€</li>
        ))}
      </ul>
  );
}