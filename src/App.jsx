import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MyBox from "./routes/MyBox";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MyBox />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* //Faltan los permisos */}
            <Route element={<ProtectedRoute />}>
              <Route path="/Home" element={<MyBox />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
