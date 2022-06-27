import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";

import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {Category, SuccessMessage} from "../../types";


export const EditCategory = () => {

    const [categoryName, setCategoryName] = useState<String | null>();
    const [categoryData, setCategoryData] = useState<Category | null>();
    const {name} = useParams();


    useEffect(() => {
        (
            async () => {
                if (name !== undefined) {
                    try {
                        let result = await HandleAdminRequests({
                            type: "categories",
                            method: "GET",
                            pk: name,
                        });

                        result !== undefined ? await setCategoryData(result) : setCategoryData(null);

                    } catch (e) {
                        console.log('Something went wrong while fetching category data!', e)
                    }
                }
            }
        )()


    }, [name]);
    const handleFormSubmit = async () => {

        let result: SuccessMessage = await HandleAdminRequests({
            type: "categories",
            body: {name: categoryName},
            pk: categoryData?._id,
            method: "PUT",
            access_token: localStorage.getItem('jwt_access_token')
        });

        if (result.code === 200) {
            alert('Data updated');
            window.location.href = "/admin/categories/";

        } else
            alert('Could not update. Please try again!');
    };

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>

                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Edit Category</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit()
                        }}>
                            <label htmlFor="Category" className={'label'}>Category name
                                : <i>{categoryData?.name}</i></label>
                            <input type="text" name={"category"} className={'form-inputbox'}
                                   defaultValue={categoryData?.name}
                                   onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <button type={"submit"} className="btn btn-primary submit"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleFormSubmit()
                                    }}> Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};