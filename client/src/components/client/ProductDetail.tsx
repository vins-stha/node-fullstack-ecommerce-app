import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom/index'
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/actions";
import {Product} from "../types";
import {HandleAdminRequests} from "../services/HandleAdminRequests";

export default function ProductDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const [productDetail, setPrdouctDetail] = useState<Product| any>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (
            () => {
                getProduct(id as string);
            }
        )()
    }, [id]);

    const getProduct = async (id: string) => {
        const results = await HandleAdminRequests({
            method: "GET",
            type: "products",
            pk: id
        });

        setPrdouctDetail(results);
        setIsLoading(false);
    };

    // add to cart
    const handleAddtoCart = (product:Product) => {
        dispatch(addToCart(product));
        alert('Added!');
    };
    const SingleProduct = () => {
        return (
            <>
                <div className="d-flex">
                    <img src={`${productDetail.imageURL}`}className=" prod-detail-image card-img-top" alt=""/>
                    <div className="details flex-column">
                        <h4 className="text-uppercase text-black-50">{productDetail.category?.name}</h4>
                        <h1 className='display-5'>{productDetail.title}</h1>
                        <h3>Price : $ {productDetail.price}</h3>
                        <p className='lead'> Description: {productDetail.description}</p>
                        <h6>Colors : {productDetail.availableColors?.map((color:string)=> { return(
                            <>
                            <li key={color}>{color}</li>
                            </>
                        )})}</h6>
                        <h6>Available Quantity : {productDetail.inStock} </h6>
                        <h6>Barcode : <strong>{productDetail.barcode} </strong></h6>

                        <div className="prod-buttons buttons d-flex">
                            <a className="btn btn-outline-dark "
                               href="/buy" onClick={e => {
                                e.preventDefault();
                                alert('This feature is not available yet')
                            }}>
                                <i className="fas fa-cart-plus m-r-1"/>Buy now</a>

                            <div className="btn  btn-outline-dark"
                               onClick={(e) => {
                                   e.preventDefault();
                                   handleAddtoCart(productDetail)
                               }
                               }
                            >
                                <i className="fa fa-shopping-cart m-r-1"/>Add to Cart</div>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    const Loading = () => {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    };
    return (
        <div>
            <div className="container justify-content-center position-relative mt-5 p-b-7">

                {isLoading ? <Loading/> : <SingleProduct/>}

            </div>

        </div>
    )
}
