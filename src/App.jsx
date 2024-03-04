import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RestaurantList from "./Restaurants/RestaurantList";

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
      element: <RestaurantList />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;