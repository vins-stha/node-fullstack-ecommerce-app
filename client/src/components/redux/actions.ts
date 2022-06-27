import {Dispatch} from 'redux';
import  {Product, Brand, User, Category, State} from "../types";
import axios from 'axios'

export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const FETCH_PRODUCT_DETAIL = "FETCH_PRODUCT_DETAIL";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_CART = "DELETE_CART";
export const LOGIN_ACTION = "LOGIN_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_BRANDS = "FETCH_BRANDS";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";



export const baseUrl =   process.env.REACT_APP_BASE_URL;

export const fetchAll = (data:Product[]|null) => {
    return {
        type: FETCH_ALL_PRODUCTS,
        payload: data
    }
};

export const fetchSingleProduct = (data:Product| null) => {
    return {
        type: FETCH_PRODUCT_DETAIL,
        payload: data
    }
};

export const searchProduct = (data:Product[]| null) => {
    return {
        type: SEARCH_PRODUCT,
        payload: data
    }
};

export const addToCart = (data:Product) => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
};

export const removeFromCart = (data:Product) => {
    return {
        type: REMOVE_FROM_CART,
        payload: data
    }
};

export const removeItemFromCart = (data : Product) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: data
    }
};


export const emptyCart = (data :any) => {
    return {
        type: DELETE_CART,
        payload: data
    }
};

export const fetchActions = (searchTerm:string|null, id:string|null) => {
    // console.log('search=', searchTerm, 'product_id', pk);
    return async (dispatch:Dispatch, getState:State) => {
        let url;
        if (id) {
            url = `${baseUrl}products/${id}`;
        } else if (searchTerm) {
            url = `${baseUrl}products/?search=${searchTerm}`;
        } else {
            url = `${baseUrl}products/`;
        }
        try {
            const response = await axios(url);
            const results = response.data;
            if (id) {
                dispatch(fetchSingleProduct(results));
            } else
            if (searchTerm) {
                // console.log('search payload', results);
                dispatch(searchProduct(results));
            }
            else {
                dispatch(fetchAll(results));
            }

        } catch (error) {
            console.log( error);
        }

    }
};

/*********User actions*********/

export const getUserDetails = (email:string) => {
    return async (dipatch: Dispatch)=>
    {
        let url;
        if (email) {
            url = `${baseUrl}users/profile/${email}`;
            let results = await axios.get(url);
            dipatch(userDetails(results.data))
        }
    }
};

export const login = (data: User | any) => {
    return {
        type: LOGIN_ACTION,
        payload: data
    }
};

export const logout = () => {
    return {
        type: LOGOUT_ACTION,
    }
};

export const userDetails = (data: User) => {
    return {
        type: GET_USER_DETAIL,
        payload: data
    }
};

export const categoriesAction = (fetchall=true, type="",pk="") => {
    return async (dispatch:Dispatch, getState:State) => {
       var url="";
        if (fetchall)
            url = `${baseUrl}categories/`;
       let results = await axios.get(url);
       dispatch(categoriesList(results.data))

    }
};

export const categoriesList = (data:Category[]|null) => {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    }
};

export const brandsAction = () => {
    return async (dispatch: Dispatch, getState: State) => {
        var url = "";

        url = `${baseUrl}brands/`;
        let results = await axios.get(url);
        dispatch(brandList(results.data));
    }
};


export const brandList = (data:Brand[]|null) => {
    return {
        type: FETCH_BRANDS,
        payload: data
    }
};


// type for actions
// type ActionType<T, K = undefined> = K extends undefined
//     ? { type: T } :
//     {
//         type: T,
//         payload?: K
//     }

export type Actions =
    | ReturnType<typeof fetchAll>
    | ReturnType<typeof fetchSingleProduct>
    | ReturnType<typeof searchProduct>
    | ReturnType<typeof addToCart>
    | ReturnType<typeof removeFromCart>
    | ReturnType<typeof removeItemFromCart>
    | ReturnType<typeof emptyCart>
    | ReturnType<typeof categoriesList>
    | ReturnType<typeof brandList>
    | ReturnType<typeof brandList>


