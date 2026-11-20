import React, { useState, useMemo } from "react";
import "./AdminDashboard.css";
import CertificateForm from "./CertificateForm.jsx";

// Helper — matches backend shape (Mongo `_id` or numeric `id`)
const getCertId = (cert) => cert._id || cert.id;

export default function AdminDashboard({
  certificates = [],
  onDelete,
  onLogout,
  onSaveCertificate,
  onUpdateCertificate,
  onChangePassword,
}) {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllRecords, setShowAllRecords] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const verifiedCount = certificates.filter(
    (c) => c.status === "Verified"
  ).length;

 const filteredCertificates = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  if (!query) return certificates;

  return certificates.filter((cert) => {
    const participantName = String(cert.participantName || "").toLowerCase();
    const certificateNumber = String(cert.certificateNumber || "").toLowerCase();

    return (
      participantName.includes(query) ||
      certificateNumber.includes(query)
    );
  });
}, [certificates, searchQuery]);

  const latestCertificates = useMemo(() => {
    return [...certificates]
      .sort((a, b) => {
        const dateA = new Date(a.issueDate || a.createdAt || 0).getTime();
        const dateB = new Date(b.issueDate || b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 10);
  }, [certificates]);

const displayedCertificates =
  searchQuery.trim() || showAllRecords
    ? filteredCertificates
    : latestCertificates;
  // ----- Handlers -----
  const handleSave = async (certificate) => {
    await onSaveCertificate(certificate);
    setShowAddPopup(false);
  };

  const handleEditSave = async (certificate) => {
    if (!editingCertificate) return;
    try {
      setBusy(true);
      await onUpdateCertificate(getCertId(editingCertificate), certificate);
      setShowEditPopup(false);
      setEditingCertificate(null);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (cert) => {
    const id = getCertId(cert);
    if (!id) {
      alert("Certificate id not found — cannot delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }
    try {
      setBusy(true);
      await onDelete(id);
    } catch (err) {
      alert(err.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const openEdit = (certificate) => {
    setEditingCertificate(certificate);
    setShowEditPopup(true);
  };

  const closePasswordPopup = () => {
    setShowPasswordPopup(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword.length < 12) {
  setPasswordError("New password must be at least 12 characters.");
  return;
}
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    try {
      setBusy(true);
      await onChangePassword(currentPassword, newPassword);
      setPasswordSuccess("Password updated successfully!");
      setTimeout(closePasswordPopup, 1200);
    } catch (err) {
      setPasswordError(err?.message || "Failed to update password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>IGES Admin</h2>
        <p>Certificate Portal</p>

        <button onClick={() => setShowAddPopup(true)}>+ Add Certificate</button>
        <button
          className="change-password-button"
          onClick={() => setShowPasswordPopup(true)}
        >
          Change Password
        </button>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Manage sports certificates</p>
          </div>
          <button onClick={() => setShowAddPopup(true)}>+ Add Certificate</button>
        </header>

        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <p>Total Certificates</p>
            <h2>{certificates.length}</h2>
          </div>
          <div className="dashboard-stat-card">
            <p>Verified Certificates</p>
            <h2>{verifiedCount}</h2>
          </div>
          
        </div>

        <section className="dashboard-table-card">
          <div className="dashboard-table-header">
            <h2>
              {showAllRecords
                ? "All Certificate Records"
                : "Latest 10 Certificates"}
            </h2>
            <div className="dashboard-table-controls">
              <input
                type="text"
                className="dashboard-search-input"
                placeholder="Search by participant name or certificate no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="toggle-records-button"
                onClick={() => setShowAllRecords((p) => !p)}
              >
                {showAllRecords ? "Show Latest 10" : "Show All Records"}
              </button>
            </div>
          </div>

          <div className="dashboard-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Certificate No.</th>
                  <th>Participant</th>
                  <th>Adhar No.</th>
                  <th>Sport</th>
                  <th>Event</th>
                  <th>Position</th>
                  <th>Issue Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedCertificates.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-records">
                      {searchQuery
                        ? "No certificates match your search."
                        : "No certificates found. Please add a certificate."}
                    </td>
                  </tr>
                ) : (
                  displayedCertificates.map((cert) => (
                    <tr key={getCertId(cert)}>
                      <td>{cert.certificateNumber}</td>
                      <td>{cert.participantName}</td>
                      <td>
  {cert.aadhaarNumber
    ? `XXXX-XXXX-${cert.aadhaarNumber.slice(-4)}`
    : "Not available"}
</td>
                      <td>{cert.sportName}</td>
                      <td>{cert.eventName}</td>
                      <td>{cert.position}</td>
                      <td>{cert.issueDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => openEdit(cert)}
                            disabled={busy}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(cert)}
                            disabled={busy}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Add Certificate */}
      {showAddPopup && (
        <div
          className="certificate-modal-overlay"
          onClick={() => setShowAddPopup(false)}
        >
          <div
            className="certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setShowAddPopup(false)}
              aria-label="Close popup"
            >
              &times;
            </button>
            <CertificateForm
              certificates={certificates}
              onSave={handleSave}
              onCancel={() => setShowAddPopup(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Certificate */}
      {showEditPopup && editingCertificate && (
        <div
          className="certificate-modal-overlay"
          onClick={() => {
            setShowEditPopup(false);
            setEditingCertificate(null);
          }}
        >
          <div
            className="certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => {
                setShowEditPopup(false);
                setEditingCertificate(null);
              }}
              aria-label="Close popup"
            >
              &times;
            </button>
            <CertificateForm
              certificates={certificates}
              initialData={editingCertificate}
              onSave={handleEditSave}
              onCancel={() => {
                setShowEditPopup(false);
                setEditingCertificate(null);
              }}
              isEditMode
            />
          </div>
        </div>
      )}

      {/* Change Password */}
      {showPasswordPopup && (
        <div className="certificate-modal-overlay" onClick={closePasswordPopup}>
          <div
            className="certificate-modal password-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={closePasswordPopup}
              aria-label="Close popup"
            >
              &times;
            </button>
            <h2 className="password-modal-title">Change Admin Password</h2>
            <form className="password-form" onSubmit={handlePasswordChange}>
              <label>
                Current Password
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Enter current password"
                />
              </label>
              <label>
                New Password
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Enter new password (min 6 chars)"
                />
              </label>
              <label>
                Confirm New Password
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-enter new password"
                />
              </label>

              {passwordError && <p className="password-error">{passwordError}</p>}
              {passwordSuccess && (
                <p className="password-success">{passwordSuccess}</p>
              )}

              <div className="password-form-actions">
                <button type="submit" disabled={busy}>
                  {busy ? "Updating…" : "Update Password"}
                </button>
                <button type="button" onClick={closePasswordPopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}