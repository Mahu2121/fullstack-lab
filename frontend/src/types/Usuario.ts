export interface Usuario {
    id: number;
    username: string;
    email: string;
    rol: string;
}

export interface UsuarioForm {
    username: string;
    email: string;
    password?: string;
    rol: string;
}