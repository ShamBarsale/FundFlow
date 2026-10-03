import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import Donate from "./pages/Donate";
import NGODashboard from "./ngo/NGODashboard";
import CreateCampaign from "./ngo/CreateCampaign";
import MyCampaigns from "./ngo/MyCampaigns";
import AdminDashboard from "./admin/AdminDashboard";
import PendingCampaigns from "./admin/PendingCampaigns";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import MyDonations from "./pages/MyDonations";

function App() {
  return (
    <div>
      <Navbar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
<Route
  path="/donate/:id"
  element={
    <ProtectedRoute role="donor">
      <Donate />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-donations"
  element={
    <ProtectedRoute role="donor">
      <MyDonations />
    </ProtectedRoute>
  }
/>

<Route
  path="/ngo/dashboard"
  element={
    <ProtectedRoute role="ngo">
      <NGODashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/ngo/create"
  element={
    <ProtectedRoute role="ngo">
      <CreateCampaign />
    </ProtectedRoute>
  }
/>
<Route
  path="/ngo/campaigns"
  element={
    <ProtectedRoute role="ngo">
      <MyCampaigns />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/pending"
  element={
    <ProtectedRoute role="admin">
      <PendingCampaigns />
    </ProtectedRoute>
  }
/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;