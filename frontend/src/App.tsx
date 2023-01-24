import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardLayout } from "./layouts/dashboard";
import { AddRecipe, Home } from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import { Landing } from "./pages/Landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/dashboard/addrecipe",
          element: <AddRecipe />,
        },
      ],
    },
  ]);
  return (
    <div className="container h-[100vh] w-[100vw]">
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="flex items-center justify-center">LOADING</div>
        }
      />
    </div>
  );
}

export default App;
