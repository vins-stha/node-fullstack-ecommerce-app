import React, { useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HandleAdminRequests} from "../../services/HandleAdminRequests";
import {Link} from 'react-router-dom'
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {fetchActions} from "../../redux/actions";

import {State, Product} from "../../types";

export const ProductList = () => {

    const dispatch = useDispatch();
    const handleClick = async (e: any, action: string, pk: string) => {

        let result = await HandleAdminRequests({
            type: "products",
            pk: pk,
            method: action === "delete" ? "DELETE" : "GET",

        });

        if (result.code === 204 || result.status === 204) {
            alert("Deleted Successfully");
            dispatch(fetchActions("", ""));

        }
    };

    useEffect(() => {
        dispatch(fetchActions("", ""));
    }, [dispatch]);
    //
    const products: Product[] | null = useSelector((state: State) => state.products);

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.map(prod => (
                        <tr key={prod._id}>
                            <th scope="row">{prod._id}</th>
                            <td>{prod.title}</td>

                            <td>
                                <div className="btn-container">
                                    <Link className="btn btn-primary"
                                          to={"/admin/edit-product/" + prod._id}
                                    >Edit</Link>
                                    <div className="btn btn-danger" onClick={(e) =>
                                        window.confirm("Are you sure") ? handleClick(e, 'delete', prod?._id as string) : ''
                                    }
                                    >
                                        Delete
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};