import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { SettingPage } from "./pages/SettingPage";
import { ProfilePage } from "./pages/ProfilePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter(
  // ... route definitions
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route path="/signin" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  )
);

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
