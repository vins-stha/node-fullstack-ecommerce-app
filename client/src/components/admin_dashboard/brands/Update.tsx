import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";

import {HandleAdminRequests} from '../../services/HandleAdminRequests';
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {Brand, SuccessMessage} from "../../types";


export const UpdateBrand = () => {

    const [brandName, setBrandName] = useState<string | null>();
    const [country, setCountry] = useState<string | null>();
    const [brandData, setBrandData] = useState<Brand|null>();
    const {name} = useParams();


    useEffect(() => {
        (
            async () => {
                if (name !== undefined) {
                    try {
                        let result = await HandleAdminRequests({
                            type: "brands",
                            method: "GET",
                            pk: name,
                        });

                        result !== undefined ? await setBrandData(result) : setBrandData(null);

                    } catch (e) {
                        console.log('Something went wrong while fetching category data!', e)
                    }
                }
            }
        )()


    }, [name]);

    const handleFormSubmit = async () => {
        console.log('data', brandName, country)
        let result: SuccessMessage = await HandleAdminRequests({
            type: "brands",
            body: {
                name: brandName ? brandName : brandData?.name,
                country: country ? country : ""
            },
            pk: brandData?._id,
            method: "PUT",
            access_token: localStorage.getItem('jwt_access_token')
        });

        if (result.code === 200) {
            alert('Data updated');
            window.location.href = "/admin/brands/";

        } else
            alert('Could not update. Please try again!');
    };

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar/>

                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Edit Brand</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit()
                        }}>
                            <label htmlFor="Brand" className={'label'}>Brand name: </label>
                            <input type="text" name={"brand"} className={'form-inputbox'}
                                   defaultValue={brandData?.name}
                                   onChange={(e) => setBrandName(e.target.value)}
                            />
                            <label htmlFor="Brand-country" className={'label'}>Country : </label>
                            <input type="text" name={"country"} className={'form-inputbox'}
                                   defaultValue={brandData?.country}
                                   onChange={(e) => setCountry(e.target.value)}
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