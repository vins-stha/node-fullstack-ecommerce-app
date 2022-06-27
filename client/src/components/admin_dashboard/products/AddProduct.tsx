import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HandleAdminRequests} from "../../services/HandleAdminRequests";
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {categoriesAction, brandsAction} from "../../redux/actions";

import {State, Category, Brand, Product} from "../../types";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object({
    title: yup.string().required(),
    price: yup.number().positive().integer().required(),
    barcode:yup.number().positive().integer().required(),
    category:yup.string()

}).required();

export const AddProduct = () => {
    const dispatch = useDispatch();
    const colors = ["red", "blue", "black", "white", "grey"]
    const [productData] = useState<Product>({
        _id:'',
        title: '',
        description: '',
        price: 0,
        inStock: 0,
        availableColors: [],
        barcode: 0,
        category: null,
        brand: null,
    });

    useEffect(() => {
        (
            async () => {
                dispatch(categoriesAction());
                dispatch(brandsAction());
            }
        )()
    }, [dispatch]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:productData
    });

    const categories = useSelector((state: State) => state.categories);
    const brands = useSelector((state: State) => state.brands);

    const onSubmit: SubmitHandler<any> = async ( data) => {
        let value;
        if (data.category !== "") {
            value = categories?.find((category: Category) => category.name === data.category)
            data.category = value?._id;
        }
        if (data.brand !== "") {
            value = brands?.find((brand: Brand) => brand.name === data.brand)
            data.brand = value?._id;
        }

        // console.log('Submitted data',data);
        let result = await HandleAdminRequests({
            type: "products",
            body: data,
            method: "POST",
            access_token: localStorage.getItem('jwt_access_token')
        });

        if (result.code === 200) {
            alert('New product Added');
            window.location.href = "/admin/products/";
        } else
            alert(result.message);
    };

    return (
        <div className="dashboard-container">
            <AdminSidebar/>
            <div className="actions-forms admin-forms">
                <div className="input-form">
                    <h3 className={'form-title'}>Add Product</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="Product" className='label'>Product name: </label>
                        <input
                            defaultValue={productData?.title ? productData?.title :''}{...register('title')}
                            className="form-inputbox"
                        />
                        <p> <span className="validation-error">{errors.title?.message}</span></p>

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
                        <p> <span className="validation-error">{errors.price?.message}</span></p>

                        <label htmlFor="Product" className='label'>Barcode: </label>
                        <input
                            defaultValue={productData?.barcode ? productData?.barcode: productData?.barcode}{...register('barcode')}
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
                                        return (opt === (productData?.availableColors ?  productData.availableColors[0]: '')) ?
                                            (<option key={opt} defaultChecked={true}>{opt}</option>) :
                                            (<option key={opt}>{opt}</option>)
                                    }
                                )
                            }
                        </select>

                        <label htmlFor="category" className="name">Category : </label>
                        <select
                            {...register('category')}
                            placeholder={"Please select a category for the product"}

                            className={'form-inputbox'}>
                            <option></option>
                            {categories?.map(cat => {

                                    return (
                                            <option key={cat._id}>{cat.name}</option>
                                    )
                                }
                            )}
                        </select>

                        <label htmlFor="brands" className="name">Brand : </label>
                        <select
                            {...register('brand')}
                            className='form-inputbox'
                        >
                            <option></option>

                            {brands?.map((brand:Brand) => {return(
                                <option key={brand._id}>{brand.name}</option>
                                )}
                            )}
                        </select>

                        <img className="card-img-top prod-image contain" src={productData?.product_image} alt=""/>
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

// alternate
// const handleOnChange = (e: any, data = "") => {
//
//     if (e.target.name === "product_image") {
//         setProductImage(
//             e.target.files[0]
//         )
//     } else if (e.target.name === "category") {
//         let cat: any = categories?.filter((category: Category) => category?.name === e?.target?.value);
//         setProductData({...productData, [e.target.name]: cat[0]?._id});
//     } else if (e.target.name === "brand") {
//         let brand: any = brands?.filter((brand: Brand) => brand.name === e.target.value);
//         setProductData({...productData, [e.target.name]: brand[0]._id});
//     }
//     else if (e.target.name === "price" || e.target.name === "barcode" || e.target.name === "inStock"){
//         console.log('here')
//         setProductData({...productData, [e.target.name]: parseInt(e.target.value)});
//         console.log(e.target.value, typeof(parseInt(e.target.value)))
//
//     }
//     else {
//         setProductData({...productData, [e.target.name]: e.target.value});
//     }
//
// };

// const handleFormSubmit = async (e: any) => {
//     e.preventDefault();
//     let formData = new FormData();
//     console.log('prdocu', productData)
//
//     Object.entries(productData).forEach(([key, value]) => {
//             formData.append(key, value)
//         }
//     );
//     //
//     await formData.append('product_image', productImage as any);
//     // //
//     //
//     let JSONFormData;// = JSON.stringify(Object.fromEntries(formData));
//
//     Object.entries(formData).forEach(([key, value]) => {
//             // if (key === "price" || key === "inStock" || key === "barcode")
//             //   {  let valued = parseInt(value as any);
//             //       formObj[key] = valued
//             //   }
//             // if (key==="availableColors")
//             // {
//             //     let valued = value[0];
//             //     formObj[key] = valued;
//             // }
//             // else
//             //     formObj[key] = formData.get([value])
//
//            //isNaN(value) ? value : parseInt(value);
//         }
//     );
//
//     // console.log('test, test',JSONFormData)
//
//     let result = await HandleAdminRequests({
//         type: "products",
//         body: productData,
//         method: "post",
//     });
//     if (result.code === 200) {
//         alert('New product added');
//         window.location.href = "/admin/products/";
//     } else {
//         console.log('Could not create product.', result.statusText)
//     }
// };

// return (
//     <>
//         <div className="dashboard-container">
//             <AdminSidebar/>
//
//             <div className="actions-forms admin-forms">
//                 <div className="input-form">
//
//                     <h3 className={'form-title'}> Add Product</h3>
//
//                     <form className={'form_container'} onSubmit={e => {
//                         e.preventDefault();
//                         handleFormSubmit(e)
//                     }}>
//
//                         <label htmlFor="Product" className={'label'}>Product name
//                             : <i>{productData['title']}</i></label>
//                         <input type="text" name="title" className={'form-inputbox'}
//                                defaultValue={productData['title']}
//                                onChange={e => handleOnChange(e)}
//                         />
//                         <label htmlFor="Prodcut" className={'label'}>Price :</label>
//                         <input type="number" name="price" className={'form-inputbox'}
//                                defaultValue={productData['price'] as number}
//                                onChange={e => handleOnChange(e)}
//                         />
//                         <label htmlFor="Prodcut" className={'label'}>Barcode :</label>
//                         <input type="number" name="barcode" className={'form-inputbox'}
//                                defaultValue={productData['barcode']}
//                                onChange={e => handleOnChange(e)}
//                         />
//                         <label htmlFor="Prodcut" className={'label'}>Available :</label>
//                         <input type="number" name="inStock" className={'form-inputbox'}
//                                defaultValue={productData['inStock'] as number}
//                                onChange={e => handleOnChange(e)}
//                         />
//
//                         <label htmlFor="Prodcut" className={'label'}>Colors :</label>
//                         <select name={"availableColors"} className={'form-inputbox'}
//                                 onChange={e => handleOnChange(e)}>
//                             <option></option>
//                             {
//                                 colors.map(opt => {
//                                     return <option key={opt}>{opt}</option>
//                                 })
//                             }
//                         </select>
//                         <label htmlFor="Prodcut" className={'label'}>Description :</label>
//                         <textarea name="description" className={'form-inputbox'}
//                                   defaultValue={productData['description'] as any} rows={10} cols={500}
//                                   onChange={e => handleOnChange(e)}
//                         />
//                         <img className="card-img-top prod-image contain" src={productData['product_image']} alt=""/>
//                         <input type="file" name="product_image" className={'form-inputbox'}
//                                defaultValue={productData?.product_image}
//                                onChange={e => handleOnChange(e)}
//                         />
//                         <label htmlFor="category" className={'name'}>Category : </label>
//                         <select name={"category"} className={'form-inputbox'}
//                                 onChange={e => handleOnChange(e)}>
//                             <option></option>
//
//                             {categories?.map(cat => {
//                                     return (<option key={cat._id}>{cat.name}</option>)
//                                 }
//                             )}
//                         </select>
//
//                         <label htmlFor="category" className={'name'}>Brand : </label>
//                         <select name={"brand"} className={'form-inputbox'}
//                                 onChange={e => handleOnChange(e)}>
//                             <option></option>
//
//                             {brands?.map(brand => {
//                                     return (<option key={brand._id}>{brand.name}</option>)
//                                 }
//                             )}
//                         </select>
//
//                         <label htmlFor="description" className={'name'}>inStock : </label>
//                         <select name={"inStock"} className={'form-inputbox'}
//                                 onChange={e => handleOnChange(e)}>
//                             {
//                                 inStockOptions.map(opt => {
//                                     return <option key={opt}>{opt}</option>
//                                 })
//                             }
//                         </select>
//
//                         <button type={"submit"} className="btn btn-primary submit"
//                                 onSubmit={e => {
//                                     e.preventDefault();
//                                     handleFormSubmit(e)
//                                 }}> Add
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </>
// )