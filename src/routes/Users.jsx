import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DeleteModal from "../components/Modal/Delete_users";
import Edit_User from "../components/Modal/Edit_Users_m";
import React, { useEffect, useState } from "react";
import { useItemsContext } from "../contexts/UpProvider";
import Message from "../components/Modal/Message";

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
          <div className="px-12 ssm:px-4">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className=" inline-block min-w-full shadow rounded-xl overflow-hidden">
                <table className="min-w-full leading-normal border border-pizazz/40">
                  <thead>
                    <tr>
                      {table_head.map((head) => (
                        <th
                          key={head}
                          className="px-5 py-3 border-b-2 border-pizazz text-left text-xs font-bold text-black dark:bg-black bg-white dark:text-pizazz uppercase tracking-wider"
                        >
                          <span className="">{head}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((user) => (
                      <tr key={user._id}>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.name}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.lastname}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.email}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.phone}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.gender}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.username}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm">
                          <span className="text-black dark:text-white whitespace-no-wrap">
                            {user.rol}
                          </span>
                        </td>
                        <td className="gap-4 flex px-5 py-5 border-b border-pizazz/40 bg-white dark:bg-black text-sm text-white">
                          <button
                            className="rounded-full w-10 h-10 bg-pizazz hover:bg-blaze-orange focus:bg-dark-tangerine  dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent"
                            onClick={() => {
                              Edit(user);
                            }}
                          >
                            <img
                              id="icon_edit"
                              alt="Editar"
                              className="w-full p-2"
                            />
                          </button>

                          <button
                            className="rounded-full w-10 h-10 bg-pizazz hover:bg-blaze-orange focus:bg-dark-tangerine  dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent"
                            onClick={() => {
                              borrar(user._id);
                            }}
                          >
                            <img
                              id="icon_del"
                              alt="Eliminar"
                              className="w-full p-2"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-96 flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-black dark:text-pizazz ssm:text-xl px-12">
              No hay usuarios
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
