
import React, { useState } from "react";
import { verifyCertificate } from "../api/api.js";
import "./Verification.css";

export default function Verification() {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCertificate(null);
    setError("");

    const number = certificateNumber.trim().toUpperCase();

    if (!number) {
      setError("Please enter your certificate number.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyCertificate(number);

      console.log("Full API response:", data);
console.log("Aadhaar from API:", data.certificate?.aadhaarNumber);

      if (data.valid && data.certificate) {
        setCertificate(data.certificate);
      } else {
        setError("Certificate not found or not valid.");
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again."
          : err.message || "Certificate verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const details = certificate
    ? [
        ["Certificate Number", certificate.certificateNumber],
        ["Participant Name", certificate.participantName],
        ["Sport / Game", certificate.sportName],
        ["Championship Name", certificate.eventName],
       ["Aadhaar Number", certificate.aadhaarNumber],
        ["Position / Achievement", certificate.position],
        ["Issue Date", formatDate(certificate.issueDate)],
        ["Certificate Status", certificate.status],
      ]
    : [];

  return (
    <section className="verification-page">
      <div className="verification-container">
        <header className="verification-header">
          <h1>Certificate Verification</h1>
          <p>Indian Group of Education and Sports</p>
          <span>
            Verify the authenticity of your sports certificate
          </span>
        </header>

        <div className="verification-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="certificate-number">
              Certificate Number
            </label>

            <div className="verification-form-row">
              <input
                id="certificate-number"
                type="text"
                placeholder="Enter Certificate Number"
                value={certificateNumber}
                onChange={(e) => {
                  setCertificateNumber(e.target.value);
                  setCertificate(null);
                  setError("");
                }}
                autoComplete="off"
                maxLength={100}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Certificate"}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="verification-error" role="alert">
            <strong>Verification Failed</strong>
            <p>{error}</p>
          </div>
        )}

        {certificate && (
          <div className="verified-certificate">
            <div className="verified-banner">
              <div className="verified-check">✓</div>

              <div>
                <h2>Certificate Verified</h2>
                <p>
                  This certificate matches an official IGES record.
                </p>
              </div>

              <span className="verified-badge">
                ✓ Verified
              </span>
            </div>

            <div className="certificate-heading">
              <h3>Certificate Information</h3>
              <p>Indian Group of Education and Sports</p>
            </div>

            <div className="certificate-table-wrapper">
              <table className="certificate-table">
                <tbody>
                  {details.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="verification-footer">
              <strong>IGES</strong>
              <p>Official Certificate Verification Portal</p>
            </footer>
          </div>
        )}
      </div>
    </section>
  );
}
