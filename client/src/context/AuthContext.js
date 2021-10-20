//AuthContext passes the variable from AuthReducer to the required pages

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//For the initial stage
const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

//Wrapping the whole app in 'children'
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    //Sharing all these values with 'children': means we can reach to user from anywhere in the application
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
