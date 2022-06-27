// import React from 'react';
import axios from 'axios/index'

export async function HandleAdminRequests(params:any) {

    const BASE_URL:string = process.env.REACT_APP_BASE_URL as string;
    let url:string = "";
    const {type, pk, method, body, access_token} = params;

    if (pk === undefined) {
        // fetch all get
        switch (type as string) {
            case "brands":
                url = `brands/`;
                break;
            case "products":
                url = `products/`;
                break;
            case "categories":
                url = `categories/`;
                break;
            case "orders":
                url = `orders/`;
                break;
            default :
                break;
        }
    } else {
        // PUT  DELETE GET
        switch (type) {
            case "brands":
                url = `brands/${pk}`;
                break;
            case "products":
                url = `products/${pk}`;
                break;
            case "categories":
                url = `categories/${pk}`;
                break;
            case "orders":
                url = `orders/${pk}`;
                break;
            case "users":
                url = `users/${pk}`;
                break;
            default :
                break;
        }
    }

    // let completeURL = BASE_URL + url;
    let getResults;
    if (method === "GET" || method === "DELETE") {
        try {
            getResults = await axios(BASE_URL + url, {
                method: method
            });

            return getResults.data;

        } catch (e) {
            console.log("Something went wrong while fetching data", e)

        }
    } else // PUT POST
    {
        let result;
        try {

            result = await fetch(BASE_URL + url, {
                'method': params.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(body)
            });

            const data = await result.json();

            if (data._id !== undefined) {
                let results = {
                    code: 200,
                    message: "OK"
                };
                return results
            }
            return result;

        } catch (e) {
            console.log("Something went wrong", e)
        }
    }

};