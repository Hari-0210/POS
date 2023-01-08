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
import SalesList from "./components/views/sale/SalesList";
import SalesTableFormat from "./components/views/sale/SalesTableFormat";
import Store from "./components/views/store/Store";
import Pos from "./components/views/pos/Pos";
import DummySales from "./components/views/sale/DummySales";
import DummySalesList from "./components/views/sale/DummySalesList";
import SalesNew from "./components/views/sale/SalesNew";
import MyProfile from "./components/views/adduser/MyProfile";

const routes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "sales", element: <SalesTableFormat /> },
      { path: "sales1", element: <Sales /> },
      { path: "salesList", element: <SalesList /> },
      { path: "productCategories", element: <ProductCategories /> },
      { path: "brands", element: <Brands /> },
      { path: "product/create_product", element: <CreateProduct /> },
      { path: "adduser", element: <AddUser /> },
      { path: "store", element: <Store /> },

      {
        path: "productCategories/create_productcategory",
        element: <CreateProductCategory />,
      },
      { path: "brands/create_brand", element: <CreateBrand /> },
      { path: "dummySales", element: <DummySales /> },
      { path: "dummySalesList", element: <DummySalesList /> },
      { path: "salesNew", element: <SalesNew /> },
      { path: "profile", element: <MyProfile /> }
    ],
  },
  {
    path: "/app1/pos/",
    element: <Pos />,
  },
  {
    path: "/",
    element: <Login />,
  },
];
export default routes;
