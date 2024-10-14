import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { LocationContextProvider } from "./components/utils/Context";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/data",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return (
    <LocationContextProvider>
      <RouterProvider router={route} />
    </LocationContextProvider>
  );
}

export default App;
