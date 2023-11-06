import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DeleteModal from "../components/Modal/Delete_users";
import React, { useEffect, useState } from "react";
import { useItemsContext } from "../contexts/UpProvider";
import Message from "../components/Modal/Message";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const { setUserIdToDelete, handleOpenDelUser } = useItemsContext();

  const Usuarios = async () => {
    const res = await fetch("http://localhost:4000/User");
    const data = await res.json();
    await setUsuarios(data);
  };

  useEffect(() => {
    Usuarios();
  }, []);

  const table_head = [
    "Nombre",
    "Apellido",
    "Email",
    "Teléfono",
    "Género",
    "Usuario",
    "Role",
    "Accion",
  ];

  const borrar = async (user) => {
    console.log(user)
    await setUserIdToDelete(user);
    handleOpenDelUser();
  };
  return (
    <>
      <DeleteModal />
      <Message />
      <NavBar />
      <div className="mt-6 ml-2 mr-4 mb-8">
        {usuarios.length != 0 ? (
          <div className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {table_head.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <span className="font-normal leading-none opacity-70">
                        {head}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id}>
                    <td className="">
                      <span className="font-normal">{user.name}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.lastname}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.email}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.phone}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.gender}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.username}</span>
                    </td>
                    <td className="">
                      <span className="font-normal">{user.rol}</span>
                    </td>
                    <td className="gap-4">
                      <button className="font-medium">Editar</button>

                      <button
                        onClick={() => {
                          borrar(user._id);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>No hay usuarios</h1>
        )}
      </div>
      <Footer />
    </>
  );
}
