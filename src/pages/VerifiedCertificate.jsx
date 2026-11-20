
import React from "react";
import "./VerifiedCertificate.css";

const VerifiedCertificate = ({ certificate }) => {
  if (!certificate) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const details = [
    ["Certificate Number", certificate.certificateNumber],
    ["Participant Name", certificate.participantName],
    ["Certificate Type", certificate.certificateType],
    ["Sport / Game", certificate.sportName],
    ["Championship Name", certificate.championshipName],
    ["Event Level", certificate.eventLevel],
    ["Age Category", certificate.ageCategory],
    ["Position / Achievement", certificate.position],
    ["Representing State", certificate.representingState],
    ["Event Date", formatDate(certificate.eventDate)],
    ["Event Venue", certificate.eventVenue],
    ["Issue Date", formatDate(certificate.issueDate)],
    [
      "Expiry Date",
      certificate.expiryDate
        ? formatDate(certificate.expiryDate)
        : "Not Applicable",
    ],
    ["Issued By", certificate.issuedBy],
  ];

  return (
    <section className="iges-verified-certificate">
      <div className="iges-vc-heading">
        <div className="iges-vc-check">✓</div>

        <div>
          <h2>Certificate Verified</h2>
          <p>
            This certificate has been verified against
            official IGES records.
          </p>
        </div>

        <span className="iges-vc-badge">
          ✓ Verified
        </span>
      </div>

      <div className="iges-vc-title">
        <h3>Certificate Information</h3>
        <p>
          Indian Group of Education and Sports
        </p>
      </div>

      <div className="iges-vc-table-wrapper">
        <table className="iges-vc-table">
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

      <div className="iges-vc-footer">
        <span>IGES</span>
        <p>
          Official Certificate Verification System
        </p>
        <small>
          Certificate authenticity is based on IGES records.
        </small>
      </div>
    </section>
  );
};

export default VerifiedCertificate;
