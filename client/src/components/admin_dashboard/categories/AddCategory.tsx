import React, {useState} from 'react';
import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {Category, SuccessMessage} from "../../types";

export const AddCategory = () => {

    const [categoryName, setCategoryName] = useState<Category | null | string>();

    const handleFormSubmit = async () => {

        let result: SuccessMessage = await HandleAdminRequests({
            method: "POST",
            body: {name: categoryName},
            type: "categories",
            access_token: localStorage.getItem('jwt_access_token')
        });
        /**
         // let data = JSON.stringify({
        //     "name": categoryName
        // });

         // var config = {
        //     method: 'post',
        //     url: 'http://localhost:5000/api/v1/categories/',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data : data
        // };
         // let result = await axios(config);
         // console.log('result axios', result)

         // let result = await axios.post("http://localhost:5000/api/v1/categories", {
        //     // method:"POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         data:data
        //     },
         //   );
         //

         */

        if (result.code === 200 && result.message === "OK") {
            alert('New category added');
            window.location.href = "/admin/categories/";
        } else
            alert('Could not add category!');
    };

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>
                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Add Category</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit()
                        }}>
                            <label htmlFor="Category" className={'label'}>Category name : </label>
                            <input type="text" name={"category"} className={'form-inputbox'}
                                   onChange={e => setCategoryName(e.target.value)}/>
                            <button type={"submit"} className="btn btn-primary submit"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleFormSubmit()
                                    }}> Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};