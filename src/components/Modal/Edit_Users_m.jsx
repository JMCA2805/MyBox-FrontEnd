import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { useItemsContext } from "../../contexts/UpProvider";
import { useEffect, useState } from "react";

function Edit_User() {
   const {
      openEdit_user,   
      handleOpenEdit_user,
      userIdToEdit
   } = useItemsContext();
   console.log(userIdToEdit);
   const { setMessage, setStatus, handleOpenMessage } = useItemsContext();
  
   // Estableciendo las variables
   const [name, setName] = useState("");
   const [lastname, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [prefijo, setPrefijo] = useState("");
   const [phone, setPhone] = useState("");
   const [username, setUserName] = useState("");
   const [gender, setGender] = useState("");
   const [style, setStyle] = useState("");

   const set_values = async () =>{
      setName(userIdToEdit.name);
      setLastName(userIdToEdit.lastname);
      setEmail(userIdToEdit.email);
      setPhone(userIdToEdit.phone);
      setUserName(userIdToEdit.username);
      setGender(userIdToEdit.gender);
      setPrefijo(userIdToEdit.prefijo);
   }
   useEffect(() => {
      set_values();
    },[]);
   console.log(name)
   // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
  
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
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("gender", gender);
      console.log(userIdToEdit._id);
      /*const url = `http://localhost:4000/User/${userIdToEdit._id}`;
      fetch(url, {
         method: "PUT",
         body: formData,
       })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
           setMessage(data.message);
           setStatus(data.status);
           handleOpenMessage();
         })
         .catch((error) => console.error("Error:", error));
      */
    };
  
   return (
      <>
      <>
        {/* Modal */}
        <Modal open={openEdit_user} handleOpen={handleOpenEdit_user}>
          {/* Cabecera del modal */}
          <ModalHeader>Editar un Artículo</ModalHeader>
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
                <div className="relative group:">
               
                  <input
                    type="text"
                    placeholder="Ingrese su teléfono"
                    className="peer/phone p-1 pl-20 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange invalid:border-red-600 invalid:dark:border-red-600"
                    id="phone"
                    value={phone}
                    maxLength={7}
                    minLength={7}
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
                  <input
                    id="Masculino"
                    className="peer/Masculino mx-2"
                    type="radio"
                    name="gender"
                    value="Masculino"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setStyle("");
                    }}
                  />
                  <label className="peer-checked/Masculino:text-pizazz">
                    Masculino
                  </label>
                  <input
                    id="Femenino"
                    className="peer/Femenino mx-2"
                    type="radio"
                    name="gender"
                    value="Femenino"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setStyle("");
                    }}
                  />
                  <label className="peer-checked/Femenino:text-pizazz">
                    Femenino
                  </label>
                  <input
                    id="Otro"
                    className="peer/Otro mx-2"
                    type="radio"
                    name="gender"
                    value="Otro"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setStyle("");
                    }}
                  />
                  <label className="peer-checked/Otro:text-pizazz">Otro</label>
                </div>
                {/* //Corregir para que se vea los invalid */}
                <p
                  className={
                    "hidden invalid:flex text-red-600 text-sm w-full text-center" +
                    style
                  }
                >
                  Porfavor seleccione un genero.
                </p>
              </div>
              
              
            </form>
          </ModalBody>
          {/* Footer del Nodal */}
          <ModalFooter>
            <Button open={openEdit_user}  handleOpen={handleOpenEdit_user}>Cancelar</Button>
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
