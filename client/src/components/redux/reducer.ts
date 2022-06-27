import {
    FETCH_ALL_PRODUCTS,
    SEARCH_PRODUCT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DELETE_CART,
    REMOVE_ITEM_FROM_CART,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    FETCH_CATEGORIES,
    FETCH_BRANDS,
    Actions, GET_USER_DETAIL


} from "./actions";
import {State, Category, Brand} from "../types";


const initialState: State = {
    products: [],
    cartState: {
        productsInCart: [],
        cart: []
    },
    categories: [],
    cartItems: [],
    error: null,
    searchResults: [],
    isSearch: false,
    user: null,
    brands: [],
    currentOrder: null
};

const allReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                isSearch: false
            };
        case SEARCH_PRODUCT:
            return {
                ...state,
                searchResults: action.payload,
                isSearch: true
            };
        case ADD_TO_CART:

            const product = action.payload;

            const itemInCart = state.cartItems.length > 0 && state.cartItems.find((item: any) => item.product._id === product._id);
            const itemExists = itemInCart !== undefined && itemInCart ? true : false;

            return {
                ...state,
                cartItems: !itemExists ?
                    [...state.cartItems,
                        {
                            product,
                            item_qty: 1
                        }
                    ] :
                    state.cartItems.map((item: any) => item.product._id === product._id ?
                        {
                            ...item,
                            item_qty: item.item_qty + 1
                        } : item
                    )
            };
        case REMOVE_FROM_CART:
            const prod = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((item: any) =>
                    item.product._id === prod._id ?
                        {
                            ...item,
                            item_qty: item.item_qty > 1 ? item.item_qty - 1 : 1
                        } : item
                )
            };

        case DELETE_CART:
            return {
                ...state,
                cartItems: []
            };

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item: any) => item.product?._id !== action.payload._id
                )
            };
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload as Category[]
            };
        case FETCH_BRANDS:
            return {
                ...state,
                brands: action.payload as Brand[]
            };
        case LOGOUT_ACTION:
            return {
                ...state,
                user: null
            };
        case LOGIN_ACTION:
            return {
                ...state,
                user: {
                    email: action.payload?.email,
                    isAdmin: action.payload?.isAdmin,
                    _id: action.payload?._id
                }
            };
        case GET_USER_DETAIL:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state

    }
    // return state;
};


export default allReducer