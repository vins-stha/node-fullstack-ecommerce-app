import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HandleAdminRequests} from "../../services/HandleAdminRequests";
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {brandsAction, categoriesAction} from "../../redux/actions";
import {useParams} from "react-router";
import {Brand, Category, Product, State} from "../../types";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object({
    title: yup.string().required(),
    price: yup.number().positive().integer().required(),
    barcode: yup.number().positive().integer().required(),
    category: yup.string()

}).required();

export const EditProduct = () => {

    const dispatch = useDispatch();
    const colors = ["red", "blue", "black", "white", "grey"];
    const {id} = useParams();

    const [productData, setProductData] = useState<Product>()
    const categories = useSelector((state: State) => state.categories);
    const {reset, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: productData
    });

    useEffect(()=>{
        dispatch(categoriesAction());
        dispatch(brandsAction());
    },[dispatch])
    useEffect(() => {

        (
            async () => {

                if (id !== undefined) {
                    try {
                        let result = await HandleAdminRequests({
                            type: "products",
                            method: "GET",
                            pk: id,
                            access_token: localStorage.getItem('jwt_access_token')
                        });

                        if (result !== undefined) {
                            setProductData(result);
                        }
                        reset(result)

                    } catch (e) {
                        console.log('Something went wrong while fetching category data!', e)
                    }
                }
            }

        )()
    }, [id, reset]);

    const brands = useSelector((state: State) => state.brands);


    const onSubmit: SubmitHandler<any> = async (data) => {
        let value;
        if (data.category !== "") {
            console.log('data.category', data.category)
            value = categories?.find((category: Category) => category.name === data.category)
            data.category = value?._id;
        }
        if (data.brand !== "") {
            console.log('data.category', data.brand)
            value = brands?.find((brand: Brand) => brand.name === data.brand)
            data.brand = value?._id;
        }

        let result = await HandleAdminRequests({
            type: "products",
            body: data,
            pk: id,
            method: "PUT",
            access_token: localStorage.getItem('jwt_access_token')
        });

        if (result?.code === 200 || result?.status === 200) {
            alert('Data updated');
            window.location.href = "/admin/products/";
        } else
            alert(result.message);
    };

    return (
        <div className="dashboard-container">
            <AdminSidebar/>
            <div className="actions-forms admin-forms">
                <div className="input-form">
                    <h3 className={'form-title'}>Edit Product</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="Product" className='label'>Product name: </label>
                        <input
                            defaultValue={productData?.title ? productData?.title : ''}{...register('title')}
                            className="form-inputbox"
                        />
                        <p><span className="validation-error">{errors.title?.message}</span></p>

                        <label htmlFor="Product" className='label'>Description: </label>
                        <textarea
                            defaultValue={productData?.description ? productData?.description : productData?.description}{...register('description')}
                            className="form-inputbox textarea"
                        />

                        <label htmlFor="Product" className='label'>Price: </label>
                        <input
                            defaultValue={productData?.price ? productData?.price : productData?.price}{...register('price')}
                            className="form-inputbox"
                        />
                        <p><span className="validation-error">{errors.price?.message}</span></p>

                        <label htmlFor="Product" className='label'>Barcode: </label>
                        <input
                            defaultValue={productData?.barcode ? productData?.barcode : productData?.barcode}{...register('barcode')}
                            className="form-inputbox"
                        />
                        <p>{errors.barcode?.message}</p>

                        <label htmlFor="Product" className={'label'}>Available(Qty) :</label>
                        <input
                            className={'form-inputbox'}
                            defaultValue={productData?.inStock}
                            {...register('inStock')}
                        />

                        <label htmlFor="Product" className={'label'}>Colors :</label>

                        <select
                            {...register('availableColors')}
                            defaultValue={productData?.availableColors}
                            className='form-inputbox'>
                            <option></option>
                            {
                                colors?.map((opt) => {
                                        return (opt === (productData?.availableColors ? productData.availableColors[0] : '')) ?
                                            (<option key={opt} defaultChecked={true}>{opt}</option>) :
                                            (<option key={opt}>{opt}</option>)
                                    }
                                )
                            }
                        </select>

                        <label htmlFor="category" className="name">Category : </label>
                        <select
                            {...register('category')}
                            className={'form-inputbox'}
                        >

                            {
                                categories?.map((cat: Category) => {
                                        // console.log(cat._id, productData?.category ? productData?.category?._id : '', cat._id === (productCatId))

                                        return (cat._id === "productCatId" ?
                                                (<option key={cat._id} selected={true}>{cat.name}</option>)
                                                :
                                                (<option key={cat._id}>{cat.name}</option>)
                                        )
                                    }
                                )}
                        </select>

                        <label htmlFor="brands" className="name">Brand : </label>
                        <select
                            {...register('brand')}
                            className='form-inputbox'
                        >

                            {brands?.map((brand:Brand) => {
                                console.log('brand',brand._id, typeof (brand) === typeof (productData?.brand) )
                                // console.log(
                                //     'brand',brand._id,
                                //     "\np->brand",  productData?.brand ? (productData?.brand):''
                                // )

                                return (JSON.stringify(brand) === JSON.stringify(productData?.brand) ?
                                        (<option key={brand._id} selected>{brand.name}</option>)
                                        :
                                        (<option key={brand._id}>{brand.name}</option>))
                                }
                            )}
                        </select>

                        <img className="card-img-top prod-image contain" src={productData?.imageURL} alt=""/>
                        <input
                            type="file"
                            className="form-inputbox"
                            defaultValue={productData?.product_image}
                            {...register('product_image')}
                        />


                        <label htmlFor="Product" className={'label'}>Image URL :</label>
                        <input
                            className={'form-inputbox'}
                            defaultValue={productData?.imageURL}
                            {...register('imageURL')}
                        />
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    )

};