import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    const response = await fetch("http://localhost:4000/registro", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    console.log(data);
    if (data.status == 200) {
      setUser(data.payload);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", data.token);
      return "/Home";
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return "/Register";
    }
  };

  const signin = async (user) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    if (data.status == 200) {
      setUser(data.payload);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", data.token);
      return "/Home";
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return "/Login";
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/Validate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        if (data.status == 200) {
          setIsAuthenticated(true);
          setUser(data.payload);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        await logout();
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        isAuthenticated,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;