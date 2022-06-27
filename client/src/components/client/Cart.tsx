import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom/index'
import {removeFromCart, emptyCart, addToCart, removeItemFromCart} from "../redux/actions";
import {State, Product, User} from "../types";
import {HandleAdminRequests} from "../services/HandleAdminRequests";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export const Cart = () => {

    const state = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const [userDetails, setUserDetails] = useState<User>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod((e.target as HTMLInputElement).value);
        console.log('value', paymentMethod)
    };

    const handleChangeItem = (val: string, item: Product | null) => {

        if (val === "+") {
            dispatch(addToCart(item as Product));
        } else if (val === "-") {
            dispatch(removeFromCart(item as Product));
        } else if (val === "remove") {
            dispatch(removeItemFromCart(item as Product));
        } else {
            dispatch(emptyCart(null));
        }

    };
    const cartItems = useSelector((state: State) => state.cartItems);

    const handleCheckOut = async (e: any) => {
        // create order if checked in

        if (localStorage.getItem("userLoggedIn") === "true")

        // create orders from cart
        {
            let allItems: any = [];
            cartItems?.map((item: any) =>

                allItems.push({
                    product: item?.product?.title,
                    qty: item?.item_qty,
                    subTotal: item?.item_qty * item?.product?.price,
                    key: item?.product?._id
                })
            );

            let userID = localStorage.getItem("_id");

            let order = {
                userId: userID,
                items: allItems
            };

            let results = await HandleAdminRequests({
                method: "POST",
                body: order,
                type: "orders"
            });

            if (results.code === 200) {
                alert(`Thank you for your shopping with us. Here is detail of your order:               
                 Shipping address:
                    ${userDetails?.personalDetail?.lname}, ${userDetails?.personalDetail?.fname}
                    ${userDetails?.personalDetail?.address}
                    ${userDetails?.personalDetail?.phone}                  
                 Total number of items purchased : ${state.cartItems.length}
                 Total price  (incl. VAT): € ${cart_Total.toFixed(2)}
                 Shipping price : 0                 
                 Payment by: ${paymentMethod}              
                  `);

            } else
                alert("Something went wrong");
        } else
            alert("Please login first!")


    };

    let cart_Total = 0;

    const fetchProfile = useCallback(async () => {
            const userId = localStorage.getItem("_id");
            try {

                const response = await HandleAdminRequests({
                    method: "GET",
                    type: "users",
                    pk: userId,
                });
                setUserDetails(response[0]);

            } catch (e) {
                console.log('something went wrong!')
            }

        }, [])
    ;
    useEffect(() => {
        fetchProfile();

    }, [fetchProfile]);

    // console.log(userDetails?.personalDetail ?? userDetails?.personalDetail)
    const CartItems = () => state.cartItems.length > 0 && state.cartItems.map((item: Product | any) => {
        return (
            <>
                <div key={item.product._id} className="cart-card d-flex border">
                    <Link to={`/products/${item.product._id}`}>
                        <img className="cart-card__img" src={`${item.product.imageURL}`} alt=""/>
                    </Link>

                    <div className="cart-item-detail">
                        <h5 className='display-7'>{item.product.title}</h5>

                        {/*quantity and price*/}
                        <div className="qty_amount d-flex">

                            <div className="btn border" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("-", item.product)
                            }}>
                                -
                            </div>
                            <div className='item-qty border'>{item.item_qty}</div>
                            <div className="btn border m-r-1" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("+", item.product)
                            }}>+
                            </div>

                            <h6 className='lead display-7'>Price : $ {item.product.price * item.item_qty}</h6>

                        </div>
                        {/*quantity and price end */}

                        <div className="prod-buttons buttons d-flex">
                            <Link className="btn btn-outline-dark "
                                  to={`/products/${item.product._id}`}>
                                <i className="fa fa-info-circle" aria-hidden="true"></i>

                                Detail
                            </Link>

                            <div className="btn btn-outline-dark" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("remove", item.product)
                            }}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                                Remove
                            </div>

                        </div>
                    </div>

                </div>
            </>
        )
    });

    if (state.cartItems.length > 0)
        state.cartItems.forEach((item: Product | any) => {
            cart_Total += (item.product.price * item.item_qty)
        });

    return (
        <>
            <div className="cart-page">
                <div className="cart-page-products">
                    <div className='border p-3 center'>

                        <div className="d-flex justify-content-center column">

                            {state.cartItems.length > 0 && (
                                <>
                                    <h1 className='center'>Your Cart Items</h1>
                                    <div className="flex m-t-1 p-t-1">
                                        <div className=" btn btn-danger btn-danger-outline m-l-1" onClick={e => {
                                            e.preventDefault();
                                            handleChangeItem("EMPTY_CART", null)
                                        }}>
                                            <i className="fa fa-trash" aria-hidden="true">
                                                &nbsp;Clear Cart
                                            </i>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>

                        {state.cartItems.length > 0 ? (
                            <>
                                <div className="container d-flex flex-column">
                                    <CartItems/>
                                </div>
                            </>
                        ) : (

                            <img alt="empty_cart" className="img-fluid mt-5 center"
                                 src="/assets/images/empty_cart.png"/>
                        )}
                    </div>
                </div>

                {
                    (state.cartItems.length > 0) && (
                        <div className="cart-page-summary">

                            <div style={{"position": "absolute", "top": "0px;"}}>
                                <div className="cart-summary-wrapper"
                                     style={{"display": "flex", "width": "100%"}}>

                                    <div className="summary-table">
                                        <table className="summary-item" role="presentation">
                                            <thead>
                                            <tr className="hide">
                                                <th>Item</th>
                                                <th className={"amount"}>Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr data-test-id="SUB_TOTAL" className="">
                                                <td className="label"><span
                                                    aria-hidden="false"> Subtotal ({state.cartItems.length}) </span>
                                                </td>
                                                <td className="amount"><span className="text-display"><span
                                                    className="">EUR {(cart_Total * 100 / 124).toFixed(2)}</span></span>
                                                </td>
                                            </tr>
                                            <tr data-test-id="SHIPPING" className="">
                                                <td className="label"><span aria-hidden="false"> Shipping </span></td>
                                                <td className="amount"><span className="text-display"><span
                                                    className="">Free</span></span></td>
                                            </tr>
                                            <tr data-test-id="IMPORT_TAX" className="summary-item-list__last-item">
                                                <td className="label"><span aria-hidden="false"> VAT (24%)</span></td>
                                                <td className="amount"><span className="text-display"><span
                                                    className="">EUR {(cart_Total * 24 / 124).toFixed(2)}</span></span>
                                                </td>
                                            </tr>

                                            <tr data-test-id="TOTAL">
                                                <th className="label"><span aria-hidden="false"> Order total </span>
                                                </th>
                                                <th className="amount"><span className="text-display"><span
                                                    className="">EUR {cart_Total.toFixed(2)}</span></span>
                                                </th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="shipping-summary"
                                 style={{
                                     "position": "relative",
                                     "display": "flex",
                                     "width": "100%",
                                     "margin": "15rem 0 0 0",
                                     "flexDirection": "column",
                                     "borderTop": "1px solid grey",
                                     "paddingTop": "1rem"
                                 }}>
                                <h6>Ship to:</h6>
                                <h5>Name
                                    : {userDetails?.personalDetail?.lname}, {userDetails?.personalDetail?.fname}</h5>
                                <p>Address : {userDetails?.personalDetail?.address}</p>
                                <p>Phone : {userDetails?.personalDetail?.phone}</p>

                                <span style={{
                                    "color": "green",
                                    "fontSize": "0.75rem",
                                    "textDecoration": "underline",
                                    "marginBottom": "0.5rem"
                                }}>
                            <Link to={"/user/update-profile"}>
                            Change
                            </Link>
                        </span>

                            </div>

                            <div className="payment-method"
                                 style={{
                                     "display": "flex",
                                     "width": "100%",
                                     "flexDirection": "column",
                                     "borderTop": "1px solid grey",
                                     "paddingTop": "1rem"
                                 }}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Payment Method</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <div className="payment-card d-flex">
                                            <FormControlLabel className={"fa "} value="paypal" control={<Radio/>}
                                                              label="Paypal"/>
                                            <i className="fa fa-cc-paypal"
                                               style={{"fontSize": "2rem", "color": "#4ab3e8", "marginTop": "0.3rem"}}
                                               aria-hidden="true"></i>
                                        </div>

                                        <div className="payment-card d-flex">
                                            <FormControlLabel className={"fa "} value="visa-card" control={<Radio/>}
                                                              label="Visa Card"/>
                                            <i className="fa fa-cc-visa"
                                               style={{"fontSize": "2rem", "color": "blue", "marginTop": "0.3rem"}}
                                               aria-hidden="true"></i>
                                        </div>

                                        <div className="payment-card d-flex">
                                            <FormControlLabel className={"fa "} value="mastercard" control={<Radio/>}
                                                              label="Mastercard"/>
                                            <i className="fa fa-cc-mastercard"
                                               style={{"fontSize": "2rem", "color": "#4ab3e8", "marginTop": "0.3rem"}}
                                               aria-hidden="true"></i>
                                        </div>

                                        <div className="payment-card d-flex">
                                            <FormControlLabel className={"fa "} value="google-pay" control={<Radio/>}
                                                              label="Google Pay"/>
                                            <i className="fab fa-google-pay"
                                               style={{"fontSize": "2rem", "color": "#4ab3e8", "marginTop": "0.3rem"}}
                                               aria-hidden="true"></i>
                                        </div>

                                    </RadioGroup>
                                </FormControl>

                                <div className="btn btn-outline-success m-l-1"
                                     onClick={(e: any) => {
                                         handleCheckOut(e)
                                     }}
                                >
                                    Checkout
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

        </>
    )
};
