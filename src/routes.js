import MainLayout from "./components/layout/MainLayout";
import Topbar from "./components/layout/Topbar";
const routes = [
    {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'hi', element: <Topbar /> }      
    ]
  }
]
export default routes;
