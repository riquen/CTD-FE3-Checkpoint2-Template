import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./routes/Home";
import "./index.css";
import Contact from "./routes/Login";
import Detail from "./routes/Detail";
import { ThemeProvider } from "./hooks/useTheme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App";

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Contact />,
      },
      {
        path: 'detail',
        element: <Detail />,
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
