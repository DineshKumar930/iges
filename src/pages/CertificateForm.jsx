import React, { useState, useEffect } from "react";
import "./CertificateForm.css";

// Convert MongoDB date into YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString("en-CA");

  return String(date).slice(0, 10);
};

// Convert old position values to backend format
const formatPosition = (position) => {
  const positions = {
    "1st Position": "1st",
    "2nd Position": "2nd",
    "3rd Position": "3rd",
    "1st": "1st",
    "2nd": "2nd",
    "3rd": "3rd",
  };

  return positions[position] || "1st";
};

export default function CertificateForm({
  onSave,
  onCancel,
  initialData = null,
  isEditMode = false,
}) {
  const [form, setForm] = useState({
  certificateNumber: "",
  participantName: "",
  sportName: "",
  eventName: "",
  aadhaarNumber: "",
  position: "1st",
  issueDate: formatDate(),
});

  const [saving, setSaving] = useState(false);

  // Prefill certificate details when editing
  useEffect(() => {
  if (initialData) {
    setForm({
      certificateNumber: initialData.certificateNumber || "",
      participantName: initialData.participantName || "",
      sportName: initialData.sportName || "",
      eventName: initialData.eventName || "",
      aadhaarNumber: initialData.aadhaarNumber || "",
      position: formatPosition(initialData.position),
      issueDate: formatDate(initialData.issueDate),
    });
  }
}, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      await onSave({
        ...form,
        participantName: form.participantName.trim(),
        sportName: form.sportName.trim(),
        eventName: form.eventName.trim(),
      });
    } catch (error) {
      console.error("Certificate save failed:", error);
      alert(error.message || "Certificate save nahi hua");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="certificate-form-page">
      <section className="certificate-form-card">

        <h1>
          {isEditMode ? "Edit Certificate" : "Add Certificate"}
        </h1>

        <p>
          {isEditMode
            ? "Update participant and achievement details."
            : "Enter participant and achievement details."}
        </p>

        <form onSubmit={handleSubmit}>

          <label>Participant Name</label>
          <input
            type="text"
            name="participantName"
            value={form.participantName}
            onChange={handleChange}
            placeholder="Enter participant name"
            required
          />

          <label>Sport Name</label>
          <input
            type="text"
            name="sportName"
            value={form.sportName}
            onChange={handleChange}
            placeholder="e.g. Cricket"
            required
          />

          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={form.eventName}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
          <label>Adhar No.</label>
<input
  type="text"
  name="aadhaarNumber"
  value={form.aadhaarNumber}
  onChange={handleChange}
  placeholder="Enter 12-digit Aadhaar number"
  maxLength={12}
  inputMode="numeric"
  pattern="[0-9]{12}"
  title="Enter a valid 12-digit Aadhaar number"
  required
/>


          <label>Position</label>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          >
            <option value="1st">1st Position</option>
            <option value="2nd">2nd Position</option>
            <option value="3rd">3rd Position</option>
            <option value="participant">Participant</option>
          </select>

          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
            required
          />

          <div className="certificate-form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : isEditMode
                ? "Update Certificate"
                : "Save Certificate"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}