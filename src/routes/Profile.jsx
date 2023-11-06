import React, { useState, useEffect } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthProvider";
import Message from "../components/Modal/Message";
import { useItemsContext } from "../contexts/UpProvider";

const Profile = () => {
  const { setMessage, setStatus, handleOpenMessage } = useItemsContext();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  // Faltantes
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/User/${user.userId}/get`
      );

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setPhone(data.phone);
        setUsername(data.username);
        setGender(data.gender);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || lastname === "" || email === "" || phone === "" || username === "" || gender === "") {
       setMessage("Todos los campos son obligatorios");
       handleOpenMessage();
       return;
    }
   
    try {
       const response = await fetch(
         `http://localhost:4000/User/${user.userId}/edit`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             name,
             lastname,
             email,
             phone,
             username,
             gender,
           }),
         }
       );
   
       const data = await response.json();
       await setMessage(data.msg);
       await setStatus(data.status);
       handleOpenMessage();
       toggleEditing();
   
    } catch (error) {
       console.error(error);
    }
   };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
   
      if (password === "" || newPassword === "" || confirmPassword === "") {
        setMessage("Todos los campos son obligatorios");
        handleOpenMessage();
        return;
      }
    
      if (newPassword !== confirmPassword) {
        setMessage("Las contraseñas no coinciden");
        handleOpenMessage();
        return;
      }
   
    try {
       const response = await fetch(
         `http://localhost:4000/User/${user.userId}/Password`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             oldPassword: password,
             newPassword: newPassword,
           }),
         }
       );
   
       if (response.ok) {
         setMessage("Contraseña actualizado correctamente");
       } else {
         setMessage("Algo ha ocurrido mal...");
       }
     
       const data = await response.json();
       await setMessage(data.msg);
       await setStatus(data.status);
       handleOpenMessage();
       togglePasswordEditing();  
    } catch (error) {
      console.log("Error:", error);
      setMessage("Error al intentar actualizar la contraseña");
    }
   };

  const toggleEditing = async () => {
    setIsEditing(!isEditing);
    setIsPasswordEditing(false);
    await fetchData();
  };

  const togglePasswordEditing = async () => {
    setIsPasswordEditing(!isPasswordEditing);
    setIsEditing(false);
    await fetchData();
  };

  return (
    <>
      <Message />
      <Nav />
      <div className="w-full h-full p-10 ssm:p-5">
        <div className="w-full ml-10 py-2 ssm:text-center ssm:ml-0">
          <h1 className="text-4xl font-bold dark:text-pizazz text-black">
            {user.username}
          </h1>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full bg-white dark:bg-black border border-pizazz/40 hover:border-2 rounded-lg p-5 text-black dark:text-white">
            <form onSubmit={handleFormSubmit}>
              <div className="flex gap-8 mb-2 ssm:flex-col ssm:gap-2">
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Name:</label>
                  <input
                    type="text"
                    value={name}
                    disabled={!isEditing}
                    onChange={(e) => setName(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                  />
                </div>
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Lastname:</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                  />
                </div>
              </div>
              <div className="flex gap-8 mb-2 ssm:flex-col ssm:gap-2">
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Email:</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                  />
                </div>
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Telefono:</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={phone}
                    maxLength={11}
                    minLength={11}
                    pattern="^[0-9]*$"
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                  />
                </div>
              </div>
              <div className="flex gap-8 mb-2 ssm:flex-col ssm:gap-2">
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Username:</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                  />
                </div>
                <div className="flex items-center gap-3 txt-base w-1/2 ssm:w-full">
                  <label className="font-bold">Género:</label>
                  <select
                    disabled={!isEditing}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0 dark:bg-black"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 ssm:justify-center">
                <button
                  type="button"
                  onClick={toggleEditing}
                  className=" flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:h-8 ssm:px-2 ssm:my-2 text-white font-bold ssm:text-xs"
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </button>
                <button
                  type="submit"
                  disabled={!isEditing}
                  className=" flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:h-8 ssm:px-2 ssm:my-2 text-white font-bold ssm:text-xs disabled:dark:bg-woodsmoke disabled:bg-pizazz"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Formulario 2 donde estarán las contraseñas */}
        <div className="w-full ml-10 py-2 mt-5 ssm:ml-5">
          <h1 className="text-2xl ssm:text-center font-bold dark:text-pizazz text-black">
            Cambio de contraseña
          </h1>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full bg-white dark:bg-black border border-pizazz/40 hover:border-2 rounded-lg p-5 text-black dark:text-white">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col txt-base mb-2 ssm:items-center">
                <label className="font-bold">Contraseña antigua:</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isPasswordEditing}
                  className="p-1 w-1/2 ssm:w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                />
              </div>
              <div className="flex flex-col txt-base mb-2 ssm:items-center">
                <label className="font-bold">Contraseña nueva:</label>
                <input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isPasswordEditing}
                  className="p-1 w-1/2 ssm:w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                />
              </div>
              <div className="flex flex-col txt-base mb-2 ssm:items-center">
                <label className="font-bold">Confirmar Contraseña Nueva:</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isPasswordEditing}
                  className="p-1 w-1/2 ssm:w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-8 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange disabled:bg-white-smoke disabled:dark:bg-woodsmoke disabled:border-0"
                />
              </div>
              <div>
                <div className="flex gap-4 ssm:justify-center">
                  <button
                    type="button"
                    onClick={togglePasswordEditing}
                    className=" flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:h-8 ssm:px-2 ssm:my-2 text-white font-bold ssm:text-xs"
                  >
                    {isPasswordEditing ? "Cancelar" + "" : "Editar" + ""}
                  </button>
                  <button
                    type="submit"
                    disabled={!isPasswordEditing}
                    className=" flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 px-2 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:h-8 ssm:px-2 ssm:my-2 text-white font-bold ssm:text-xs disabled:dark:bg-woodsmoke disabled:bg-pizazz"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Fin */}
      </div>
      <Footer />
    </>
  );
};

export default Profile;

