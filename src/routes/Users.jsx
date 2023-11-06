import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DeleteModal from "../components/Modal/Delete_users";
import Edit_User from "../components/Modal/Edit_Users_m";
import React, { useEffect, useState } from "react";
import { useItemsContext } from "../contexts/UpProvider";
import Message from "../components/Modal/Message";
import { Button } from "../components/Modal/Modal";

export default function Users() {
  const {
    setUserIdToDelete,
    handleOpenDelUser,
    Usuarios,
    usuarios,
    setUserIdToEdit,
    handleOpenEdit_user,
  } = useItemsContext();

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
    await setUserIdToDelete(user);
    handleOpenDelUser();
  };
  const Edit = async (user) => {
    await setUserIdToEdit(user);
    handleOpenEdit_user();
  };
  return (
    <>
      <DeleteModal />
      <Edit_User />
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
                    <td className="flex gap-4">
                      <button
                        onClick={() => {
                          Edit(user);
                        }}
                      >
                        Editar
                      </button>

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
