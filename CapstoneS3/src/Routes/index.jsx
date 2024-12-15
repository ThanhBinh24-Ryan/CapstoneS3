import IndexAdmin from "../Pages/Admin/index";
import ListMovie from "../Pages/User/ListMovie/RenderListMovie";
import IndexDangKy from "../Log/DangKy/IndexDangKy";
import IndexDangNhap from "../Log/DangNhap/IndexDangNhap";
import { Route } from "react-router-dom";
import IndexUser from "../Pages/User";
import TrangChu from "../Pages/User/TrangChu";
import IndexDash from "../Pages/Admin/Dashboard/IndexDash";
import Log from "../Log/Log";
import AddProductPage from "../Pages/Admin/AddNew/IndexAddNew";
import EditProductPage from "../Pages/Admin/EditProduct/IndexEditProduct";
import IndexDeleteProduct  from "../Pages/Admin/DeleteProduct/IndexDeleteProduct";
import IndexDSND from "../Pages/Admin/LayDSNguoiDung/IndexDSNguoiDung";
import RenderDSND from "../Pages/Admin/LayDSNguoiDung/RenderDSNguoiDung";
import AddUserPage from "../Pages/Admin/AddUser/IndexAddUser";
import EditUserPage from "../Pages/Admin/UpdateUser/IndexUpdateUser";



const routes = [
  {
    path: "",
    element: IndexUser,
    children: [
      {
        path: "",
        element: TrangChu,
      },
      // {
      //   path: "DangNhap",
      //   element: IndexDangNhap,
      // },

      // {
      //   path: "",
      //   element: ListMovie,
      // },
      // {
      //   path: "contact",
      //   element: ContactPage,
      // },
      // {
      //   path: "shopping-phone",
      //   element: ShoppingPhonePage,
      // },
      // {
      //   path: "hooks",
      //   element: HooksPage,
      // },
      // {
      //   path: "detail-movie/:id",
      //   element: DetailMoviePage,
      // },
    ],
  },
  {
    path: "",
    element: IndexAdmin,
    children: [
      {
        path: "admin",
        element: IndexDash,
      },
      {
        path: "add-product",
        element:AddProductPage,
      },
      {
        path: "editProduct/:id",
        element: EditProductPage,
      },
      {
        path: "delete-product/:id",
        element: IndexDeleteProduct,
      },
      {
        path: "DSNguoiDung",
        element: RenderDSND,
      },
      {
        path: "AddUser",
        element: AddUserPage,
      },
      {
        path: "EditUser/:taiKhoan",
        element: EditUserPage ,
      },
    ],
  },
  {
    path: "",
    element: Log,
    children: [
      {
        path: "DangNhap",
        element: IndexDangNhap,
      },
      {
        path: "Dangky",
        element: IndexDangKy,
      },
    ],
  },
  // {
  //   path: "auth",
  //   element: AuthPage,
  // },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
