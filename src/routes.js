import React  from 'react';
import MainLayout from "./components/layout/MainLayout";
import Topbar from "./components/layout/Topbar";
import Dashboard from './components/views/dashboard/Dashboard';
import Login from "./components/views/login/Login";
import Brands from './components/views/product/Brands';
import Product from './components/views/product/Product';
import ProductCategories from './components/views/product/ProductCategories';
const routes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "productCategories", element: <ProductCategories /> },
      { path: "brands", element: <Brands /> }
  ],
  },
  {
    path: "/",
    element: <Login />,
  },
];
export default routes;
