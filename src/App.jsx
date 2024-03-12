import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RestaurantList from "./Restaurants/RestaurantList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthProvider from "./AuthProvider";
import ResMenuPage from "./Restaurants/ResMenuPage";
import Cart from "./cart/Cart";
import Congratspage from "./components/Congrats";

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
          <ResMenuPage />
        </AuthProvider>
      ),
    },
    {
      path: "/cart",
      element: (
        <AuthProvider>
          <Cart />
        </AuthProvider>
      ),
    },
    {
      path: "/congrats",
      element: (
        <AuthProvider>
          <Congratspage />
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
