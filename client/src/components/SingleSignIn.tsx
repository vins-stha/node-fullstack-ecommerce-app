import axios from "axios";
import GoogleLogin from "react-google-login";
import React from "react";


export const SingleSignIn = () => {

    const responseGoogle = async (response: any) => {
        const tokenId = response?.tokenId;
        const results = await axios.post(`${process.env.REACT_APP_BASE_URL}users/authenticate-user`, {id_token: tokenId}
        );
        const {user, jwtToken} = results.data;
        localStorage.setItem("jwt_access_token", jwtToken);

        if (jwtToken && user)
           {
               localStorage.setItem("userLoggedIn", "true");
           }

    };
    return (
        <div className="App">
            <header className="App-header">
                <GoogleLogin
                    clientId="857007056522-dho087duhvj0dejvq2sg1lkka2bonm17.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </header>
        </div>
    );

};
