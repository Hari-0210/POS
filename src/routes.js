import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/views/dashboard/Dashboard";
import AddUser from "./components/views/adduser/AddUser";

import Login from "./components/views/login/Login";
import Brands from "./components/views/product/Brands";
import Product from "./components/views/product/Product";

import ProductCategories from "./components/views/product/ProductCategories";
import CreateProduct from "./components/views/product/product_sub/CreateProduct";
import CreateProductCategory from "./components/views/product/product_sub/CreateProductCategory";
import CreateBrand from "./components/views/product/product_sub/CreateBrand";
import Sales from "./components/views/sale/Sales";

const routes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "sales", element: <Sales /> },

      { path: "productCategories", element: <ProductCategories /> },
      { path: "brands", element: <Brands /> },
      { path: "product/create_product", element: <CreateProduct /> },
      { path: "adduser", element: <AddUser /> },

      {
        path: "productCategories/create_productcategory",
        element: <CreateProductCategory />,
      },
      { path: "brands/create_brand", element: <CreateBrand /> },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
];
export default routes;
