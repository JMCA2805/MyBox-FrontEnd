import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Agg from "../components/Modal/Agg";
import Edit from "../components/Modal/Edit";
import Delete from "../components/Modal/Delete";
import Message from "../components/Modal/Message";
import { useMatch } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function MyBox() {
  const match = useMatch("/");
  const match2 = useMatch("/Home");
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {/* Modales */}
      {match2 && user.rol == "Admin" ? (
        <>
          <Agg /> <Edit /> <Delete />
        </>
      ) : null}

      <Message />
      <NavBar />
      <Card />
      <Footer />
    </>
  );
}

export default MyBox;
