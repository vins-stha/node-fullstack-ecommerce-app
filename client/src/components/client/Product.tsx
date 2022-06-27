import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom/index';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchActions,
    addToCart,
    categoriesAction,
    brandsAction,
    } from "../redux/actions";
import {Brand, Category, Product, State} from "../types";

export default function Products() {

    const dispatch = useDispatch();
    const [stateProducts,setStateProducts] = useState<Product[]>();
    const [allProducts,setAllProducts] = useState<Product[]>();

    const products = useSelector((state:State) => state.products);

    useEffect(() => {
        (async () => {

            dispatch(fetchActions("", ""));
            dispatch(categoriesAction());
            dispatch(brandsAction());
        })()
    }, [dispatch]);

    useEffect(()=>{
        if(products !== undefined)
            {
                setStateProducts(products as Product[]);
                setAllProducts(products as Product[])
            }
    },[products]);

    const brands = useSelector((state:State)=>state?.brands);
    const categories = useSelector((state:State)=>state?.categories);

    // dispatch addto cart on click
    const handleAddtoCart = async (product: Product) => {
        dispatch(addToCart(product));

    };

    const filterByCategory = async (id: string) => {
        const data = allProducts?.filter((product: Product) => {
            return (id === (product?.category))
        });
        await setStateProducts(data);

    };

    const filterByBrand = async (id: string) => {
        const brandData = allProducts?.filter((product: Product) => {
            return (id === (product?.brand))
        });
        await setStateProducts(brandData);
    };

    return (
        <>
            <div className="wrapper">
                <div className="sidebar">
                    <h3 className={"btn btn-outline-dark side-btn"} onClick={e=>(setStateProducts(allProducts))}>All Products</h3>
                    <h3>Categories</h3>
                    {    categories?.map((category:Category)=>

                        (  <div key={category._id}className="btn btn-outline-dark side-btn" onClick={(e)=>{filterByCategory(category._id)}}>
                            {category.name}
                        </div>)

                    )}
                    <h3>Brands</h3>
                    {    brands?.map((brand:Brand)=>

                        (  <div key={brand._id}className="btn btn-outline-dark side-btn" onClick={(e)=>{filterByBrand(brand._id)}}>
                            {brand.name}
                        </div>)

                    )}
                </div>
                <div className="product-contents">

                    <div className="product-lists container d-flex">
                        {stateProducts && stateProducts.map((product: Product) => {
                            return (
                                <div key={product?._id} className="card product-card center">
                                    <Link to={`products/${product._id}`}

                                          key={product._id}>
                                        <img className="card-img-top prod-image contain" alt="" src={product?.imageURL}/>
                                        <div className="card-body">
                                            <p className="card-text small">{(product.title).length < 35 ? (product.title) : (product.title).substring(0, 32) + "..."}</p>
                                            <div className="card-text small">Price : ${product.price}</div>
                                        </div>
                                    </Link>
                                    <div className="btn btn-primary block"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleAddtoCart(product)
                                       }
                                       }
                                    >Add to Cart</div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>

    )
}
