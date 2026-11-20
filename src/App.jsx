import { Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useState, useEffect } from "react";

import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  changeAdminPassword,
  adminLogout,
} from "./api/api.js";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./App.css";

import FloatingContactButtons from "./components/FloatingContactButtons.jsx";
import Verification from "./components/Verification.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CertificateForm from "./pages/CertificateForm.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ImageModal from "./components/ImageModal.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Games = lazy(() => import("./pages/Games.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const Athletes = lazy(() => import("./pages/Athletes.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const News = lazy(() => import("./pages/News.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <div className="page-loader__spinner"></div>
      <p className="page-loader__text">Loading…</p>
    </div>
  );
}

// Helper: get the id of a certificate (supports Mongo _id or numeric id)
const getCertId = (cert) => cert._id || cert.id;

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (location.pathname !== "/admin/dashboard") return;
    if (!localStorage.getItem("adminToken")) return;

    getCertificates()
      .then((data) => {
        setCertificates(Array.isArray(data) ? data : data.certificates || []);
      })
      .catch((error) => {
        console.error("Certificates load failed:", error.message);
      });
  }, [location.pathname]);

  const handleSaveCertificate = async (certificate) => {
    const savedCertificate = await addCertificate(certificate);
    setCertificates((previous) => [savedCertificate, ...previous]);
  };

  const handleUpdateCertificate = async (id, certificate) => {
  const result = await updateCertificate(id, certificate);

  // Backend response se updated certificate nikalein
  const updatedCertificate = result.certificate || result;

  // Dashboard ki list turant update karein
  setCertificates((previous) =>
    previous.map((cert) =>
      String(getCertId(cert)) === String(id)
        ? { ...cert, ...updatedCertificate }
        : cert
    )
  );

  return updatedCertificate;
};

  const handleDeleteCertificate = async (id) => {
    await deleteCertificate(id);

    setCertificates((previous) =>
      previous.filter((cert) => getCertId(cert) !== id)
    );
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    await changeAdminPassword(currentPassword, newPassword);
  };

  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  window.location.replace("/admin");
};

  return (
    <div className="app">
      <ScrollToTop />
    {!isAdminPage && <ImageModal />}
      {!isAdminPage && <Navbar />}

      <main className="app__main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/events" element={<Events />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/varification" element={<Verification />} />
            
            <Route path="/admin" element={<AdminLogin />} />

<Route
  path="/admin/forgot-password"
  element={<ForgotPassword />}
/>

<Route element={<ProtectedRoute />}>
  <Route
    path="/admin/dashboard"
    element={
      <AdminDashboard
        certificates={certificates}
        onSaveCertificate={handleSaveCertificate}
        onUpdateCertificate={handleUpdateCertificate}
        onDelete={handleDeleteCertificate}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />
    }
  />

  <Route
    path="/admin/add-certificate"
    element={<CertificateForm />}
  />
</Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminPage && <FloatingContactButtons />}
      {!isAdminPage && <Footer />}
    </div>
  );
}