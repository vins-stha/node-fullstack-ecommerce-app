export type Category = {
    _id: string,
    name: string,
    dateAdded: Date
}

export interface Brand {
    _id: string,
    name: string,
    country: string
}

export interface Product {
    _id: string,
    title: string,
    description?: string,
    price?: number,
    barcode: number,
    category?: string | Category | null,
    brand?: string | Brand | null,
    availableColors?: string[],
    dateAdded?: Date,
    product_image?: string | any,
    imageURL?: string,
    inStock?: number,
};

export type Err = {
    message: string | null,
    status: string | null
};
export type State = {

    products: Product[] | null,
    cartState: {
        productsInCart: Product[] | null,
        cart: any
    },
    categories: Category[] | null,
    cartItems: any,
    error: Err | null,
    isSearch: boolean,
    searchResults: Product[] | null,
    user?: User | null,
    brands: Brand[] | null,
    currentOrder?:Order |null


};

export type Order = {
    _id: string,
    dateCreated: Date | string,
    userId: string | null,
    productId: string [] | null,
}

export type User = {
    _id: string,
    orders?: Order[] | null,
    isAdmin: boolean,
    username: string,
    email: string,
    personalDetail?: {
        fname?:string,
        lname?:string,
        address?:string,
        profilePicURL?:string,
        phone?:number
    }

};

export interface div extends HTMLDivElement {
    height?: string | any,
    width?: string | any,
    border?: string | any
}

export interface SuccessMessage {
    message?: string,
    code?: number,
    status?: number,
    data?: any,
    statusCode?: number
}

export type formObject = {
    [key: string]: string | number
}

export interface RequestParams {
    body?: any,
    method: string,
    type: string,
    access_token?: string,
    id?: string,
    pk?: string

}