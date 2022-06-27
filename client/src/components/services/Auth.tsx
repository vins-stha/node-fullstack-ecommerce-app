import {useState, createContext, useContext, useEffect} from 'react';
// import {useSelector} from "react-redux";
// import {State} from "../types";

const AuthContext = createContext(null)

export const AuthProvider = ({children}:any) => {
    const [userLoggedIn] = useState<boolean>();
    useEffect(()=>{

    },[])

    const loggedIn = () => {

    };
    const loggedOut = () => {



    };

    return (<AuthContext.Provider value={{userLoggedIn, loggedIn, loggedOut} as any}>
        {children}

    </AuthContext.Provider>)
};

export const useAuth = () => {
    return useContext(AuthContext);
};