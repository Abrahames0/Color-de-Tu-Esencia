import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
//AWS AMPLIFY
import { Amplify } from "aws-amplify";
import awsExports from './aws-exports';
//
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Encuesta from "./pages/Encuesta";
import Resultado from "./pages/Resultado";
import Loader from "./components/Loader";

Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio/>
  },
  {
    path: "/encuesta",
    element: <Encuesta/>
  },
  {
    path: "/resultado",
    element: <Resultado/>
  },
  {
    path: "/pruebitas",
    element: <Loader/>
  } 
]);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
