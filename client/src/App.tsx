import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import SignUp from "@/pages/SignUp";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
