 
import React, { createContext, useContext, useReducer } from "react";
import { userReducer, initialState } from "./userReducer";
import api from "../utils/axios";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, initialState);

      const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const register = (newUser) => {
    dispatch({ type: "REGISTER", payload: newUser });
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/users/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  };


  return (
    <UserContext.Provider value={{ user: state.user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


