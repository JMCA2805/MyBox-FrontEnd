import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function NotFoundPage() {
    const {isAuthenticated} = useAuth()
  return (
    <>
      <Nav />
      <div className="w-full flex flex-col justify-center items-center dark:text-pizazz mt-10 text-black text-5xl font-bold text-center ssm:text-xl">
        <div>
          <h1>- 404 -</h1>
          <h2 className="text-black dark:text-white">Página no encontrada</h2>
        </div>
        <div className="mt-5 w-80 h-80 ssm:w-64 ssm:h-64 flex justify-center items-center">
          <img id="Error" alt="Error" className="h-full" />
        </div>
        <div className="mt-5 flex w-full justify-center items-center">
          <span className="text-2xl mr-2">Regresar a </span>
          <Link to={isAuthenticated ? "/Home" : "/"} className="flex items-center justify-center w-10 h-10 mx-2 ssm:w-8 ssm:h-8 ssm:mx-0 dark:bg-pizazz bg-black rounded-full">
            <img
              alt="Casa"
              className="p-1 dark:text-white text-black text-xs"
              id="Home"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
