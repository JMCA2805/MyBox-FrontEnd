import { useEffect, useState } from "react";
import Message from "../components/Modal/Message";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useItemsContext, useUpItemsContext } from "../contexts/UpProvider";

export default function Login() {
  //Estados del Modal Message
  const { setMessage, setStatus, handleOpenMessage } = useItemsContext();

  //Actualización de estados de Sección
  const update = useUpItemsContext();
  const navigate = useNavigate();
  const { signin, isAuthenticated } = useAuth();

  //Comprobación de la existencia de un token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token != "" && isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated]);

  // Estableciendo los estados de los datos
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    if (username == "") {
      document.getElementById("username").focus();
      return true;
    }

    if (password == "") {
      document.getElementById("password").focus();
      return true;
    }

    return false;
  };

  //Función de Inicio de Sección
  const Loguear = async (e) => {
    e.preventDefault();
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }

    const data_login = {
      username,
      password,
    };

    //Solicitud al backend
    const response = await signin(data_login);

    //Respuestas de la solicitud
    if (response.data.status != 200) {
      await setMessage(response.data.message);
      await setStatus(response.data.status);
      await handleOpenMessage();
    }
    navigate(response.ruta);
  };

  return (
    <>
      {/* //Modal de mensajes de respuestas */}
      <Message />
      {/* //Barra de navegación */}
      <Nav />
      <div className="flex justify-center items-center py-20">
        <div className="py-6 dark:bg-black  text-black dark:text-pizazz bg-white rounded-lg flex flex-col xl:w-96 md:w-96 lg:w-96 ssm:w-72 border border-pizazz/40 shadow-xl">
          <div className="flex items-center justify-center rounded-t-lg w-full h-10 text-2xl font-bold">
            Iniciar Sección
          </div>
          <div className="flex items-center justify-center w-full p-5 bg-white dark:bg-black text-black dark:text-white">
            {/* //Formulario de Inicio de Sección */}
            <form className="flex-col flex px-4 justify-center items-center w-full">
              <div className="mb-4 w-full">
                <span className="text-lg font-medium">Usuario</span>

                <input
                  type="text"
                  placeholder="Ingrese su usuario"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="w-full">
                <span className="text-lg font-medium">Contraseña</span>

                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center rounded-b-lg w-full">
            {/* //Botón de Acción */}
            <button
              type="submit"
              onClick={(e) => {
                Loguear(e);
                update(true);
              }}
              className="px-2 flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange w-24 ssm:h-10 text-white font-bold"
            >
              Entrar
            </button>
            <div className="flex text-black dark:text-white ssm:text-sm my-2 w-full px-5 justify-center items-center">
            {/* //Reenvió al formulario de registro */}
              <span>
                ¿No estás registrado? 
                <Link to="/Register" className="text-pizazz">
                  ¡Crea una cuenta!
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
