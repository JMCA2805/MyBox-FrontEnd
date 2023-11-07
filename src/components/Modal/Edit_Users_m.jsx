import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { useItemsContext } from "../../contexts/UpProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

function Edit_User() {
  const { openEdit_user, handleOpenEdit_user, userIdToEdit, Usuarios } =
    useItemsContext();

  const { setMessage, setStatus, handleOpenMessage } = useItemsContext();

  // Estableciendo las variables
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [gender, setGender] = useState("");

  const set_values = async () => {
    setName(userIdToEdit.name);
    setLastName(userIdToEdit.lastname);
    setEmail(userIdToEdit.email);
    setPhone(userIdToEdit.phone);
    setUserName(userIdToEdit.username);
    setGender(userIdToEdit.gender);
  };
  useEffect(() => {
    set_values();
  }, [userIdToEdit]);

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    if (name === null || name === "") {
      document.getElementById("name").focus();
      return true;
    }

    if (lastname === null || lastname === "") {
      document.getElementById("lastname").focus();
      return true;
    }

    if (email === null || email === "") {
      document.getElementById("email").focus();
      return true;
    }

    if (phone === null || phone === "") {
      document.getElementById("phone").focus();
      return true;
    }

    if (username === null || username === "") {
      document.getElementById("username").focus();
      return true;
    }

    if (gender === null || gender === "") {
      document.getElementById("gender").focus();
      return true;
    }
    return false;
  };
  const Editar = async (e) => {
    e.preventDefault();
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("username", username);
    formData.append("gender", gender);

    const response = await fetch(
      `http://localhost:4000/User/${userIdToEdit._id}/edit`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await response.json();
    await setMessage(data.msg);
    await setStatus(data.status);
    handleOpenMessage();
    await Usuarios();
  };

  return (
    <>
      <>
        {/* Modal */}
        <Modal open={openEdit_user} handleOpen={handleOpenEdit_user}>
          {/* Cabecera del modal */}
          <ModalHeader>Editar un Usuario</ModalHeader>
          {/* Cuerpo del Modal */}
          <ModalBody>
            <form
              className="flex-col flex px-4 justify-center items-center"
              onSubmit={async (e) => {
                Editar(e);
              }}
              id="form_edit"
              encType="multipart/form-data"
            >
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Nombres
                </span>
                <input
                  type="text"
                  placeholder="Ingrese sus nombres"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Apellidos
                </span>
                <input
                  type="text"
                  placeholder="Ingrese sus apellidos"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Teléfono
                </span>
                <div className="">
                  <input
                    type="text"
                    placeholder="Ingrese su teléfono"
                    className="peer/phone p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine"
                    id="phone"
                    value={phone}
                    maxLength={11}
                    minLength={11}
                    pattern="^[0-9]*$"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />

                  <p className="hidden peer-invalid/phone:flex text-red-600 text-sm w-full text-center">
                    Porfavor ingrese solo numeros min-max: 7.
                  </p>
                </div>
              </div>

              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Correo
                </span>

                <input
                  type="email"
                  placeholder="Ingrese sus correo electrónico"
                  className="peer/email p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange invalid:border-red-600 invalid:dark:border-red-600"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <p className="hidden peer-invalid/email:flex text-red-600 text-sm w-full text-center">
                  Porfavor ingrese una direccion de correo valida.
                </p>
              </div>
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Usuario
                </span>

                <input
                  type="text"
                  placeholder="Ingrese su usuario"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Genero
                </span>

                <div>
                  <div className="flex txt-base w-full">
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange dark:bg-black"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          {/* Footer del Modal */}
          <ModalFooter>
            <Button open={openEdit_user} handleOpen={handleOpenEdit_user}>
              Cancelar
            </Button>
            <button
              className="flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-4 mx-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-20 ssm:h-8 ssm:px-0 ssm:my-1 text-white font-bold"
              onClick={(e) => {
                Editar(e);
              }}
            >
              Guardar
            </button>
          </ModalFooter>
        </Modal>
      </>
    </>
  );
}
export default Edit_User;
