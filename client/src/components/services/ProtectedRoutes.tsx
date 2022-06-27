import {Navigate, useLocation} from 'react-router-dom/index'
import {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {State} from "../types";
import {login} from "../redux/actions";

export const ProtectedRoute = ({children}:any) => {

    const location = useLocation();
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const state = useSelector((state:State) => state);
    const dispatch = useDispatch();
    useEffect(()=>{
        if (!state?.user)
        {
            if(isAdmin)
               {
                   const user = {
                       isAdmin: isAdmin,
                       username: localStorage.getItem('username'),
                       email:localStorage.getItem('email')
                   };
                   dispatch(login(user))
               }
        }

    },[isAdmin, state, dispatch])

    if (!isAdmin)
        {

            return <Navigate to={"/"} state={{path: location.pathname}}/>
        }

    return children


};


