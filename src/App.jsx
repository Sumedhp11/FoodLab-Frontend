import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RestaurantList from "./Restaurants/RestaurantList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ResMenu from "./Restaurants/ResMenu";
import AuthProvider from "./AuthProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/restaurants",
      element: (
        <AuthProvider>
          <RestaurantList />
        </AuthProvider>
      ),
    },
    {
      path: "/menu/:resId",
      element: (
        <AuthProvider>
          <ResMenu />
        </AuthProvider>
      ),
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
