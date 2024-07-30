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
import Resultado from "./pages/Resultado";
import ProbarModelo from "./pages/ProbarModelo";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Login from "./pages/LoginUsuarios";
import Dataset from "./pages/dataset";
import ProbarDataSet from "./pages/ProbarDataSet";
import Encuesta from "./pages/Encuesta";
import EntrenarModelo from "./pages/EntrenarModelo";

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
    path: "/test-dataset",
    element: <ProbarDataSet />
  },
  {
    path: "/entrenar-modelo",
    element: <EntrenarModelo />
  },
  {
    path: "/dataset",
    element: <Dataset />
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