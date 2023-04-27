import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SignInPage from "../pages/SignInPage/SignInPage";
import PostsPage from "../pages/PostsPage/PostsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const useRoutes = (isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default useRoutes;
