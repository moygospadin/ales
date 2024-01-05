import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import { Footer } from "./components/Footer";
import { CreateTwit, Home, Login, Profile, Register } from "./routes";

const BaseRoute = () => {
  return (
    <>
      <Outlet />
      <Footer title="Microblog" description="Thank you for using our app!" />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseRoute />,

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
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
