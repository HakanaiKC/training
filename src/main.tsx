import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";

import LoginPage from "./pages/Login";
import Contact from "./routes/contact";
import Root from "./routes/root";
import EditContact from "./routes/edit";
import AuthComponent from "./pages/Auth";
import Product from "./routes/product";
import { AppProvider } from "./context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: (
      <AuthComponent>
        <AppProvider>
          <Root />
        </AppProvider>
      </AuthComponent>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "/contacts/edit/:contactId",
        element: <EditContact />,
      },
      {
        path: "/contacts/:contactId/destroy",
      },
    ],
  },
  {
    path: "/products",
    element: (
      <AuthComponent>
        <Root />
      </AuthComponent>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/products/",
        element: <AppProvider><Product /></AppProvider>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
