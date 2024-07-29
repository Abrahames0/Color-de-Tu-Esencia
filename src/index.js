import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// AWS AMPLIFY
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Encuesta from "./pages/Encuesta";
import Resultado from "./pages/Resultado";
import ProbarModelo from "./pages/ProbarModelo";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Login from "./pages/LoginUsuarios";

Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />
  },
  {
    path: "/encuesta",
    element: <Encuesta />
  },
  {
    path: "/resultado",
    element: <Resultado />
  },
  {
    path: "/test-modelo",
    element: <ProbarModelo />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-conditions",
    element: <TermsConditions />
  },
  {
    path: "/login",
    element: <Login Component={Login} pageProps={{}} />
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