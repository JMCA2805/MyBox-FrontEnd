import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpProvider from "./contexts/UpProvider";
import MyBox from "./routes/MyBox";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import Users from "./routes/Users";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <UpProvider>
            <Routes>
              <Route path="/" element={<MyBox />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* //Faltan los permisos */}
              <Route element={<ProtectedRoute rol={["User", "Admin"]} />}>
                <Route path="/Home" element={<MyBox />} />
              </Route>
              <Route element={<ProtectedRoute rol={["Admin"]} />}>
                <Route path="/Users" element={<Users />} />
              </Route>
            </Routes>
          </UpProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
