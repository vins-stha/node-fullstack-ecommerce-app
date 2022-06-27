import React, { useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {Link} from 'react-router-dom'
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {categoriesAction} from "../../redux/actions";
import {State,Category, SuccessMessage} from "../../types";


export const CategoryList = () => {

    const dispatch = useDispatch();

    const handleClick = async (e: any, action: string | null, pk: string | null) => {
        e.preventDefault();

        let result: SuccessMessage = await HandleAdminRequests({
            type: "categories",//category
            pk: pk,
            method: action === "delete" ? "DELETE" : "GET",
        });

        console.log('RESULT OF DELETE', result);

        if (result?.status === 200 ) {
            alert("Category Deleted successfully");

            // dispatch action to delete form redux state
            dispatch(categoriesAction());
        } else
            alert("Could not delete");
    };

    useEffect(() => {
        dispatch(categoriesAction());
    }, [dispatch]);
    //
    const categories = useSelector((state:State) => state.categories);

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category-name</th>
                        <th scope="col">Created</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories?.map((cat:Category) => (
                        <tr key={cat._id}>
                            <th scope="row">{cat._id}</th>
                            <td>{cat.name}</td>
                            <td>{cat.dateAdded}</td>
                            <td>
                                <div className="btn-container">
                                    <Link className="btn btn-primary"
                                          to={"/admin/edit-category/" + cat.name}
                                        // onClick={e=>handleClickAction(e, "add-category",cat.id)}
                                    >Edit</Link>
                                    <div className="btn btn-danger" onClick={e =>
                                        window.confirm("Are you sure") ? handleClick(e, 'delete', cat._id) : ''}>
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