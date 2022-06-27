import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom/index'
import {useDispatch, useSelector} from "react-redux";
import { login, logout} from "../redux/actions";
import {State, Product} from "../types";
import axios from "axios";
import GoogleLogin from "react-google-login";

export const Navbar = () => {

    const dispatch = useDispatch();
    const [totalItemsInCart, setTotalItemsInCart] = useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const state = useSelector((state: State) => state);

    const responseGoogle = async (response: any) => {
        const tokenId = response?.tokenId;
        const results = await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}users/authenticate-user`,
                {id_token: tokenId}
            );

        const {user, jwtToken} = results.data;
        // console.log('user', user)
        localStorage.setItem("jwt_access_token", jwtToken);

        if (jwtToken && user) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("isAdmin", user.isAdmin);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("_id", user._id);

            setIsUserLoggedIn(true);
        }

        // dispatch action to change redux state for user
        await dispatch(login(user));
    };

    const userState = useSelector((state: State) => state?.user);
    const googleClientId:string = process.env.REACT_APP_GOOGLE_CLIENT_ID  as string;
    let refqty =  useRef(0);
    useEffect(() => {

        if (!state.user && localStorage.getItem("userLoggedIn")) {
            let user = {
                email: localStorage.getItem("userEmail"),
                _id: localStorage.getItem("_id"),
                isAdmin: localStorage.getItem("isAdmin")
            };
            dispatch(login(user));
        }

        if (!localStorage.getItem("userLoggedIn") && state.user) {
            localStorage.setItem("userLoggedIn", "false");
            setIsUserLoggedIn(false);
            dispatch(logout());
        }

    }, [state, userState, isUserLoggedIn, dispatch]);

    useEffect(()=>{
        let count = 0;
        if (state.cartItems.length > 0)
        {
            refqty.current = 0;
            state.cartItems.forEach((item: Product | any) =>
                    count += item.item_qty

            );
            refqty.current = count
        }
      // else
          setTotalItemsInCart(count);
    },[state])

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark p-2">

            <Link to="/" className="nav-link">
                <span className="m-r-5 btn btn-outline-dark">
                    <i className="fa fa-home" aria-hidden="true"> Home</i>

                </span>
            </Link>

            {(localStorage.getItem("userLoggedIn") !== "true") ?
                (<GoogleLogin
                    clientId = {googleClientId}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="btn btn-outline-dark m-r-1"
                />) : (
                    <button className="btn btn-outline-dark m-r-2" onClick={(e) => {
                        if (window.confirm("Are you sure")) {
                            dispatch(logout());
                            localStorage.removeItem("userLoggedIn");
                            localStorage.removeItem("isAdmin");
                            localStorage.removeItem("userEmail");
                            localStorage.removeItem("_id");

                            setIsUserLoggedIn(false);
                        }
                    }}>
                        <i className="fa fa-sign-out" aria-hidden="true"> </i>
                            Logout
                    </button>
                )
            }

            {localStorage.getItem("userLoggedIn") === "true" ?
                (<Link to="/user/user-profile" className="btn btn-outline-dark m-r-1">
                    <i className="fa fa-user" aria-hidden="true"> </i>
                        Profile

                </Link>) : ''
            }

            <Link to="/admin/dashboard" className="btn btn-outline-dark">
                <i className="fa fa-dashboard"> </i>
                     Dashboard

            </Link>

            <Link to="/cart" className="btn btn-outline-dark m-r-1">
                <i className="fa fa-shopping-cart m-r-1"></i>
                Cart({totalItemsInCart})
            </Link>
        </nav>

    </>

};
