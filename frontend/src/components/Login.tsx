import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../services/AuthService";

type Props = {
    onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            onLogin();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "40px auto", display: "grid", gap: 12 }}>
            <h2>Iniciar sesión</h2>
            <input
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    );
}