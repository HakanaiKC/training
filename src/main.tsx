import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact, { actionContact, loaderContact } from "./routes/contact";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import EditContact, { actionEdit } from "./routes/edit";
import { destroyAction } from "./routes/destroy";
import Index from "./routes";
import { LoginPage } from "./Login/login-form";
import { AuthLayout } from "./context/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: loaderContact,
            action: actionContact,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: loaderContact,
            action: actionEdit,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
