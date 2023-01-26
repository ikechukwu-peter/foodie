import { Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UILoader } from "./components";
import { DashboardLayout } from "./layouts/dashboard";
import { AddRecipe, Home, More, MyRecipes } from "./pages/Dashboard";
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
        {
          path: "/dashboard/myrecipes",
          element: <MyRecipes />,
        },
        {
          path: "/dashboard/recipe/:id",
          element: <More />,
        },
      ],
    },
  ]);
  return (
    <div className="container h-[100vh] w-[100vw]">
      <Suspense fallback={<UILoader />}>
        <RouterProvider
          router={router}
          fallbackElement={
            <div className="flex items-center justify-center">LOADING</div>
          }
        />
      </Suspense>
    </div>
  );
}

export default App;
