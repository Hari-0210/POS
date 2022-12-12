import MainLayout from "./components/layout/MainLayout";
import Topbar from "./components/layout/Topbar";
import Login from "./components/login/Login";
const routes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [{ path: "hi", element: <Topbar /> }],
  },
  {
    path: "/",
    element: <Login />,
  },
];
export default routes;
