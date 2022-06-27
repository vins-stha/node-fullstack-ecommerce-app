import React from "react";
import {Link} from "react-router-dom/index";

export const Sidebar = () => {
    return(
        <div className="actions-bar">
            <Link to={"/admin/categories/"} className="btn btn-outline-light action_lists" >
                <i className="fa fa-sign-in m-r-1"/>
                Categories List
            </Link>
            <Link to={"/admin/add-category/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Add Category
            </Link>

            <Link to={"/admin/products/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Product List
            </Link>
            <Link to={"/admin/add-product/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Add Product
            </Link>

            <Link to={"/admin/brands/"} className="btn btn-outline-light action_lists" >
                <i className="fa fa-sign-in m-r-1"/>
                Brands List
            </Link>
            <Link to={"/admin/add-brand/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Add Brand
            </Link>

            <Link to={"/admin/profile/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Profile
            </Link>

        </div>
    )
};
