import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/views/dashboard/Dashboard";
import Login from "./components/views/login/Login";
import Brands from "./components/views/product/Brands";
import Product from "./components/views/product/Product";
import ProductCategories from "./components/views/product/ProductCategories";
import CreateProduct from "./components/views/product/product_sub/CreateProduct";
const routes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "productCategories", element: <ProductCategories /> },
      { path: "brands", element: <Brands /> },
      { path: "product/create_product", element: <CreateProduct /> },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
];
export default routes;
