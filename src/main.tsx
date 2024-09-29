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



const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: <AuthComponent>
      <Root />
    </AuthComponent>,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
