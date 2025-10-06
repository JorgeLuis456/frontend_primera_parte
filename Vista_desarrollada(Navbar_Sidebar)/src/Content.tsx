import { useState } from "react";
import { Usuario } from "./types";

type ContentProps = {
  seccion: string;
};

export default function Content({ seccion }: ContentProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    id: 0,
    nombre: "",
    email: "",
    rol: "Usuario", //rol
  });
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const guardarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (usuarioEditar) {
      // Editar usuario existente
      setUsuarios(
        usuarios.map((u) =>
          u.id === usuarioEditar.id ? { ...usuarioEditar, ...nuevoUsuario } : u
        )
      );
      setUsuarioEditar(null);
    } else {
      // Crear nuevo usuario
      const nuevo = {
        ...nuevoUsuario,
        id: usuarios.length + 1,
      };
      setUsuarios([...usuarios, nuevo]);
    }

    setNuevoUsuario({ id: 0, nombre: "", email: "", rol: "Usuario" }); //reinicia el formulario
    setMostrarModal(false);
  };

  const abrirModalEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setNuevoUsuario(usuario);
    setMostrarModal(true);
  };

  const renderContenido = () => {
    switch (seccion) {
      case "Inicio":
        return (
          <div>
            <h1>Bienvenido a "LAS GUINDAS"</h1>
            <p>
              Panel de administración para gestionar usuarios (Usuarios y
              Adimistradores).
            </p>
          </div>
        );
      case "Usuarios":
        return (
          <div>
            <h1>Gestión de Usuarios</h1>
            <button
              onClick={() => {
                setUsuarioEditar(null);
                setNuevoUsuario({
                  id: 0,
                  nombre: "",
                  email: "",
                  rol: "Usuario",
                });
                setMostrarModal(true);
              }}
              style={{
                backgroundColor: "yellow",
                color: "black",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              + Adicionar Usuario
            </button>

            {usuarios.length === 0 ? (
              <p>No hay usuarios registrados.</p>
            ) : (
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid yellow", padding: "8px" }}>
                      ID
                    </th>
                    <th style={{ border: "1px solid yellow", padding: "8px" }}>
                      Nombre
                    </th>
                    <th style={{ border: "1px solid yellow", padding: "8px" }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid yellow", padding: "8px" }}>
                      Rol
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => abrirModalEditar(u)}
                      style={{ cursor: "pointer" }}
                    >
                      <td
                        style={{ border: "1px solid yellow", padding: "8px" }}
                      >
                        {u.id}
                      </td>
                      <td
                        style={{ border: "1px solid yellow", padding: "8px" }}
                      >
                        {u.nombre}
                      </td>
                      <td
                        style={{ border: "1px solid yellow", padding: "8px" }}
                      >
                        {u.email}
                      </td>
                      <td
                        style={{ border: "1px solid yellow", padding: "8px" }}
                      >
                        {u.rol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {mostrarModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "gray",
                    padding: "24px",
                    borderRadius: "8px",
                    border: "3px solid yellow",
                    width: "300px",
                  }}
                >
                  <h2>
                    {usuarioEditar ? "Editar Usuario" : "Adicionar Usuario"}
                  </h2>

                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={nuevoUsuario.nombre}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        nombre: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "12px",
                      padding: "6px",
                    }}
                  />

                  <label>Email:</label>
                  <input
                    type="email"
                    value={nuevoUsuario.email}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        email: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "12px",
                      padding: "6px",
                    }}
                  />

                  <label>Rol:</label>
                  <select
                    value={nuevoUsuario.rol}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        rol: e.target.value as "Administrador" | "Usuario",
                      })
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "12px",
                      padding: "6px",
                    }}
                  >
                    <option>Adimistrador</option>
                    <option>Usuario</option>
                  </select>

                  <button
                    onClick={guardarUsuario}
                    style={{
                      backgroundColor: "yellow",
                      color: "black",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    {usuarioEditar ? "Guardar Cambios" : "Adicionar Usuario"}
                  </button>
                  <button
                    onClick={() => {
                      setMostrarModal(false);
                      setUsuarioEditar(null);
                      setNuevoUsuario({
                        id: 0,
                        nombre: "",
                        email: "",
                        rol: "Usuario",
                      });
                    }}
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "Contacto":
        return (
          <div>
            <h1>Contáctanos</h1>
            <p>
              📧 contacto@lasguindas.com <br /> ☎️ +591 76577966
            </p>
          </div>
        );
      default:
        return <h1>Sección no encontrada</h1>;
    }
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "24px",
        borderLeft: "4px solid yellow",
        overflowY: "auto",
      }}
    >
      {renderContenido()}
    </div>
  );
}
