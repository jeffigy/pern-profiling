import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  async function isAuth() {
    try {
      // Send a GET request to the server to check authentication
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      // parse response as JSON
      const parseRes = await response.json();
      // set isAuthenticated based on teh parsed response
      setIsAuthenticated(parseRes === true);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  // call isAuth when the component mounts
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated} setAuth={setAuth}>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Landing />
            ) : (
              <Navigate to={"/home"} replace={true} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Navigate to="/home" replace={true} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp setAuth={setAuth} />
            ) : (
              <Navigate to="/home" replace={true} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Settings setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster position="bottom-center" richColors />
    </Layout>
  );
}

export default App;
