import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import { CreateTwit, Home, Login, Register } from "./routes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,

    children: [
      { path: "/home", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path: "/create_twit", element: <CreateTwit /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
