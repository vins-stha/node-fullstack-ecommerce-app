import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Home} from './components/client/Home';
import {Cart} from './components/client/Cart';
import Products from './components/client/Product';
import ProductDetail from './components/client/ProductDetail';
import {SingleSignIn} from "./components/SingleSignIn";

import {AuthProvider} from "./components/services/Auth";
import {ProtectedRoute} from "./components/services/ProtectedRoutes";
import {Dashboard} from './components/admin_layout/Dashboard'

import {CategoryList} from "./components/admin_dashboard/categories/CategoryList";
import {AddCategory} from "./components/admin_dashboard/categories/AddCategory";
import {EditCategory} from "./components/admin_dashboard/categories/EditCategory";

import {Brands} from "./components/admin_dashboard/brands/Brands";
import {CreateBrand} from "./components/admin_dashboard/brands/Create";
import {UpdateBrand} from "./components/admin_dashboard/brands/Update";

import {ProductList} from "./components/admin_dashboard/products/ProductList";
import {AddProduct} from "./components/admin_dashboard/products/AddProduct";
import {EditProduct} from "./components/admin_dashboard/products/EditProduct";

import {Profile} from "./components/admin_layout/Profile";
import {UserProfile} from "./components/client/UserProfile";
import {UpdateProfile} from "./components/client/UpdateProfile";


function App() {

    return (
        <AuthProvider>
            <header className="">
                <BrowserRouter>
                    <Home/>
                    <Routes>
                        <Route path="/" element={<Products/>}/>
                        <Route path="/products/:id" element={<ProductDetail/>}/>
                        <Route path="/user/user-profile" element={<UserProfile/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path={"/login"} element={<SingleSignIn/>}></Route>
                        <Route path={"/user/update-profile"} element={<UpdateProfile/>}></Route>

                        <Route
                            path={"/admin/dashboard/"}
                            element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/categories/"}
                            element={<ProtectedRoute> <CategoryList/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/add-category/"}
                            element={<ProtectedRoute> <AddCategory/></ProtectedRoute>}
                        />

                        <Route
                            path={"/admin/edit-category/:name"}
                            element={<ProtectedRoute> <EditCategory/></ProtectedRoute>}
                        />

                        <Route
                            path={"/admin/brands/"}
                            element={<ProtectedRoute> <Brands/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/add-brand/"}
                            element={<ProtectedRoute> <CreateBrand/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/edit-brand/:name"}
                            element={<ProtectedRoute> <UpdateBrand/></ProtectedRoute>}
                        />

                        <Route
                            path={"/admin/products/"}
                            element={<ProtectedRoute> <ProductList/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/add-product/"}
                            element={<ProtectedRoute> <AddProduct/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/edit-product/:id"}
                            element={<ProtectedRoute> <EditProduct/></ProtectedRoute>}
                        />
                        <Route
                            path={"/admin/profile"}
                            element={<ProtectedRoute> <Profile/></ProtectedRoute>}
                        />

                    </Routes>
                </BrowserRouter>

            </header>

        </AuthProvider>

    );
}

export default App;
