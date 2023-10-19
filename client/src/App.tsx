import { Route, Routes } from "react-router-dom"
import Landing from "@/pages/Landing"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"
import Layout from "@/components/Layout"
function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
