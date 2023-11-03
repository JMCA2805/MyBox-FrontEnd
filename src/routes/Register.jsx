import { useState } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Register() {
  const navigate = useNavigate()
  const { signup } = useAuth();

  // Estableciendo las variables
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar_password, setConfirmarPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("")

  // Inputs sin contenidos
  const focusOnFirstEmptyInput = () => {
    if (name == "") {
      document.getElementById("name").focus();
      return true;
    }
    if (lastname == "") {
      document.getElementById("lastname").focus();
      return true;
    }
    if (phone == "") {
      document.getElementById("phone").focus();
      return true;
    }
    if (email == "") {
      document.getElementById("email").focus();
      return true;
    }
    if (username == "") {
      document.getElementById("username").focus();
      return true;
    }

    if (password == "") {
      document.getElementById("password").focus();
      return true;
    }
    if (confirmar_password == "") {
      document.getElementById("confirmar_password").focus();
      return true;
    }
    if (gender == "") {
      setStyle(" invalid")
      return true;
    }
    return false;
  };

  const Registrar = async (e) => {
    e.preventDefault();
    const alert = await focusOnFirstEmptyInput();
    if (alert === true) {
      return;
    }

    const data_register = {
      name,
      lastname,
      email,
      password,
      phone,
      username,
      gender,
    };

    const response = await signup(data_register);
    navigate(response)
  };
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center py-12">
        <div className="dark:bg-black  text-black dark:text-pizazz bg-white rounded-lg flex flex-col xl:w-96 md:w-96 lg:w-96 ssm:w-72 border border-pizazz/40 shadow-xl">
          <div className="flex items-center justify-center rounded-t-lg w-full h-10 text-2xl font-bold">
            Registro
          </div>
          <div className="flex items-center justify-center w-full p-5 bg-white dark:bg-black text-black dark:text-white">
            <form className="flex-col flex px-4 justify-center items-center w-full">
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Nombres
                </span>
                <input
                  type="text"
                  placeholder="Ingrese sus nombres"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="name"
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
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Teléfono
                </span>

                <input
                  type="text"
                  placeholder="Ingrese su teléfono"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
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
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Contraseña
                </span>

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
              <div className="mb-4 w-full">
                <span className="text-lg font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
                  Confirmar Contraseña
                </span>

                <input
                  type="password"
                  placeholder="Confirme su contraseña"
                  className="p-1 w-full border-2 focus:outline-none rounded-lg border-dark-tangerine dark:border-white  h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange"
                  id="confirmar_password"
                  onChange={(e) => {
                    setConfirmarPassword(e.target.value);
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
                      setStyle("")
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
                      setStyle("")
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
                      setStyle("")
                    }}
                  />
                  <label className="peer-checked/Otro:text-pizazz">Otro</label>
                </div>
                {/* //Corregir para que se vea los invalid */}
                <p className={"hidden invalid:flex text-red-600 text-sm w-full text-center" + style}>
                  Porfavor seleccione un genero.
                </p>
              </div>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center rounded-b-lg w-full">
            <button
              type="submit"
              onClick={(e) => {
                Registrar(e);
              }}
              className="px-2 flex items-center text-center bg-dark-tangerine dark:bg-gray/50 dark:hover:text-dark-tangerine dark:hover:bg-gray dark:border-woodsmoke justify-center h-10 rounded-lg hover:bg-pizazz focus:bg-blaze-orange dark:focus:bg-woodsmoke border-b-4 border-blaze-orange ssm:w-24 ssm:h-10 text-white font-bold"
            >
              Registrarse
            </button>
            <div className="flex text-black dark:text-white ssm:text-sm my-2 w-full px-5 justify-center items-center">
              <span>
                ¿Estas registrado?{" "}
                <Link to="/Login" className="text-pizazz">
                  ¡Inicia Sección!
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
