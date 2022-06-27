import React, {useState} from 'react';
import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {SuccessMessage} from "../../types";

export const CreateBrand = () => {

    const [brandName, setBrandName] = useState<null | string>();
    const [country, setCountry] = useState<null | string>();


    const handleFormSubmit = async () => {

        let result: SuccessMessage = await HandleAdminRequests({
            method: "POST",
            body: {name: brandName, country:country},
            type: "brands",
            access_token: localStorage.getItem('jwt_access_token')
        });
        /**
         // let data = JSON.stringify({
        //     "name": brandNameName
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
            window.location.href = "/admin/brands/";
        } else
        {
            console.log('Could not add brand!', result.message);
            result.statusCode === 403 ? alert('Could not add brand! Forbidden'):alert("Could not create brand")
        }

    };

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>
                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Add Brand</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit()
                        }}>
                            <label htmlFor="Category" className={'label'}>Brand name : </label>
                            <input type="text" name={"brand"} className={'form-inputbox'}
                                   onChange={e => setBrandName(e.target.value)}/>
                            <label htmlFor="Category" className={'label'}>Country</label>
                            <input type="text" name={"country"} className={'form-inputbox'}
                                   onChange={e => setCountry(e.target.value)}/>
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