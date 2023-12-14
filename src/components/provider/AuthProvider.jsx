import { createContext,useState } from 'react';
import PropTypes from 'prop-types'; 
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [rolle, setRolle] = useState("lesen");

  const login = async (benutzer, passwort) => {
    try {
        const response = await loginUser({ benutzer, passwort });
        const { token, roles } = response.data;
        setToken(token);
        roles.forEach((r) => {
          if(r == 'verkaeufer') {
            setRolle('bearbeiten');
          }
        })
      } catch (error) {
        //TODO Login Message
      }
  };

  const loginUser = ({ benutzer, passwort }) => {
    const baseURL = `http://desktop-8j5rgfs:3000/rest`;
    const url = `${baseURL}/auth/login`;

    return axios.post(url, {
      benutzer,
      passwort,
    });
  };

  const logout = () => {
    setToken("");
    setRolle("lesen");
  };

  return (
    <AuthContext.Provider value={{ token, rolle, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
