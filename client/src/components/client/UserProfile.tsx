import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import { State, User} from "../types";
import {HandleAdminRequests} from "../services/HandleAdminRequests";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
// import {Controller} from "react-hook-form";
// import {TextField} from "@material-ui/core";
//

export const UserProfile = () => {
    const [userDetails, setUserDetails] = useState<User>();
    const [viewOrder, setViewOrder] = useState(false);
    const [viewProfile, setViewProfile] = useState(true);
    const [orderDetail, setOrderDetail] = useState<any>();
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    const [orderTotal, setOrderTotal] = useState(0);
    let count = 0;

    const fetchProfile = useCallback(async () => {
        const userId = localStorage.getItem("_id");
        try {

            const response = await HandleAdminRequests({
                method: "GET",
                type: "users",
                pk: userId,
            });
            setUserDetails(response[0]);
            setOrderCount(response[0].orders?.length)

        } catch (e) {
            console.log('something went wrong!')
        }

    }, [])
    ;
    const getDetailedOrder = async (id: string) => {
        let total=0;
        try {
            const response = await HandleAdminRequests({
                method: "GET",
                type: "orders",
                pk: id,
            });

            setOrderDetail(response);

            setOrderTotal(0);

            response?.items?.map(async (item: any) => {
                total += item.subTotal;
                }
            );
            await setOrderTotal(total);
            setViewProfile(false);
            !viewOrder ?? setViewOrder(true);

        } catch (e) {
        }
    };

    const user = useSelector((state: State) => state?.user);

     useEffect(() => {
         fetchProfile();
        if (localStorage.getItem("userLoggedIn") !== "true") {

            navigate('/');
        }

    }, [setOrderCount,viewProfile, orderDetail, user, fetchProfile, navigate]);


    const handleDelete = async (id: string) => {
        const results = await HandleAdminRequests({
            method: "DELETE",
            pk: id,
            type: "orders"
        });
        if (results?.status === 204) {
            alert("Order deleted successfully");

            window.location.href = '/user/user-profile';
        }
    };
    return (
        <>
            {!viewProfile ? (
                <>
                    <h1 className={"heading"}>Order Details</h1>
                    <h3 className={"heading"}>Date created: {orderDetail.dateCreated}
                        <button
                            className={"btn btn-outline-light btn-danger m-l-1"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (window.confirm("Are you sure you want to delete this?"))
                                    handleDelete(orderDetail._id)
                            }}
                        >
                            Delete
                        </button>
                    </h3>
                </>
            ) : <h1 className={"heading"}>Profile Details</h1>}

            <div className="content-wrapper p-l-1">
                <div className={"sideNavbar"}>
                    {!viewProfile &&
                    (
                        <div className={"btn  m-b-1"}
                           onClick={(e) => {
                               e.preventDefault();
                               setViewProfile(true);
                           }
                           }>Back to profile</div>
                    )
                    }
                    {viewProfile && (
                        <>
                            <Link to={"/user/update-profile"}
                               className={"btn btn-outline-dark m-b-1"}
                            >
                                Update profile
                            </Link>
                        </>)
                    }


                    <h3>Your orders</h3>
                    {
                        orderCount > 0 && userDetails?.orders?.map((order) => {
                                return (
                                    <div key={order._id}
                                       className={"btn btn-outline-dark m-b-1"}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           getDetailedOrder(order._id)
                                       }
                                       }
                                    >
                                        {++count}
                                    </div>
                                )
                            }
                        )
                    }

                </div>
                {viewProfile ? (
                        <div className="profile">
                            <figure className={"center"}>
                                <img
                                    src={userDetails?.personalDetail?.profilePicURL?`${userDetails?.personalDetail?.profilePicURL}`:"https://www.w3schools.com/howto/img_avatar.png" }
                                    className={"img-profile"}
                                    alt=""/>
                            </figure>


                            <main className={"m-l-1"}>
                                <header>
                                    <h2>{userDetails?.personalDetail?.fname} {userDetails?.personalDetail?.lname}</h2>
                                    <small>{userDetails?.username}</small>
                                </header>

                                <dt>Full name</dt>
                                <dd>{userDetails?.personalDetail?.fname} {userDetails?.personalDetail?.lname}</dd>
                                <dt>Date of birth</dt>
                                <dd>{userDetails?.username}</dd>
                                <dt>Address</dt>
                                <dd>{userDetails?.personalDetail?.address ?? "No information available"}</dd>
                                <dt>Phone number: </dt>
                                <dd>{userDetails?.personalDetail?.phone ?? "No information available"}</dd>
                                <dd>Email</dd>
                                <dt>{userDetails?.username}</dt>
                                <dd>Role</dd>
                                <dt>{userDetails?.isAdmin ? "Super user" : "User"}</dt>


                            </main>

                        </div>
                    )
                    :
                    (
                        <>
                            <table className={"table table-bordered m-l-1"}>
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product-name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orderDetail?.items?.map((item: any) => (
                                        <>
                                            <tr>
                                                <th scope="row">{++count}</th>
                                                <td>{item.product}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.subTotal}</td>
                                            </tr>
                                        </>
                                    )
                                )}

                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    <th></th>
                                    <th scope="row">{orderTotal}</th>
                                </tr>
                                </tbody>
                            </table>
                        </>
                    )
                }
            </div>
        </>
    )
};

























