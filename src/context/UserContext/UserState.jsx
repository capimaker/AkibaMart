import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import users from "./UserReducer";      
import api   from "../../utils/axios";  


const initialState = {
  token: localStorage.getItem("token") || null,
  user:  null,
};

export const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(users, initialState);

  
  const login = async (credentials) => {
    try {
      const { data } = await api.post("/users/login", credentials);
      dispatch({ type: "LOGIN", payload: { token: data.token } });
      localStorage.setItem("token", data.token);
      await getUserInfo();
    } catch (err) {
      console.error("Error en login:", err);
      throw err;
    }
  };

  
  const getUserInfo = async () => {
    
    if (!state.token) return;

    try {
      const { data } = await api.get("/users/me");
      dispatch({ type: "GET_USER_INFO", payload: data });
    } catch (err) {
      console.error("Error al cargar perfil:", err);
      if (err.response?.status === 401) {
       
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
      }
    }
  };

  
  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.warn("Error en logout (ignorado):", err);
    } finally {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
    }
  };

  
  useEffect(() => {
    if (state.token) {
      getUserInfo();
    }
  }, [state.token]);

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user:  state.user,
        login,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export const useUser = () => useContext(UserContext);
