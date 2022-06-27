import React, { useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {Link} from 'react-router-dom'
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {brandsAction} from "../../redux/actions";
import {State, SuccessMessage, Brand} from "../../types";


export const Brands = () => {

    const dispatch = useDispatch();

    const handleClick = async (e: any, action: string | null, pk: string | null) => {
        e.preventDefault();

        let result: SuccessMessage = await HandleAdminRequests({
            type: "brands",
            pk: pk,
            method: action === "delete" ? "DELETE" : "GET",

        });
        if (result.status === 200) {
            alert("Category Deleted successfully");

            // dispatch action to delete form redux state
            dispatch(brandsAction());
        } else
            alert("Could not delete");
    };

    useEffect(() => {
        dispatch(brandsAction());
    }, [dispatch]);
    //
    const brands = useSelector((state: State) => state.brands);

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Country</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {brands?.map((brand: Brand) => (
                        <tr key={brand._id}>
                            <th scope="row">{brand._id}</th>
                            <td>{brand.name}</td>
                            <td>{brand.country}</td>
                            <td>
                                <div className="btn-container">
                                    <Link className="btn btn-primary"
                                          to={"/admin/edit-brand/" + brand.name}
                                    >Edit</Link>
                                    <div className="btn btn-danger" onClick={e =>
                                        window.confirm("Are you sure") ? handleClick(e, 'delete', brand._id) : ''}>
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