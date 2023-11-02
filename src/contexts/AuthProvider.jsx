import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    // try {
    //   const res = await registerRequest(user);
    //   if (res.status === 200) {
    //     setUser(res.data);
    //     setIsAuthenticated(true);
    //   }
    // } catch (error) {
    //   console.log(error.response.data);
    //   setErrors(error.response.data.message);
    // }
  };

  const signin = async (user) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    console.log(data)
    setIsAuthenticated(true);
    if (data.status == 200) {
      sessionStorage.setItem("token", data.token);
    }
  };

  const logout = () => {
    // Cookies.remove("token");
    // setUser(null);
    // setIsAuthenticated(false);
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
        console.log(data);
        // if (!res.data) return setIsAuthenticated(false);
        // setIsAuthenticated(true);
        // setUser(res.data);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
