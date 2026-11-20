
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Common API request function
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// ADMIN LOGIN
export async function adminLogin(credentials) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (data.token) {
    localStorage.setItem("adminToken", data.token);
  }

  return data;
}

// ADMIN LOGOUT
export function adminLogout() {
  localStorage.removeItem("adminToken");
}

// GET ALL CERTIFICATES
export async function getCertificates() {
  return request("/certificates");
}

// ADD CERTIFICATE

export async function addCertificate(form) {
  const positions = {
    "1st Position": "1st",
    "2nd Position": "2nd",
    "3rd Position": "3rd",
    "Participation": "participant",
    "Participant": "participant",
  };

  const payload = {
    certificateNumber:
      form.certificateNumber ||
      `IGES/${new Date().getFullYear()}/${String(Date.now()).slice(-4)}`,

    participantName: form.participantName?.trim(),
    sportName: form.sportName?.trim(),
    eventName: form.eventName?.trim(),
    aadhaarNumber: form.aadhaarNumber?.trim(),
    position: positions[form.position] || form.position,
    issueDate: form.issueDate,
  };

  const result = await request("/certificates", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result.certificate;
}

  

// DELETE CERTIFICATE
export async function deleteCertificate(id) {
  return request(`/certificates/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

// PUBLIC CERTIFICATE VERIFICATION
export async function verifyCertificate(certificateNumber) {
  return request(
    `/certificates/verify/${encodeURIComponent(certificateNumber.trim())}`
  );
}

export async function updateCertificate(id, certificate) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/certificates/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...certificate,
      aadhaarNumber: certificate.aadhaarNumber?.trim(),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Certificate update failed");
  }

  return data.certificate;
}

export async function changeAdminPassword(currentPassword, newPassword) {
  const token = localStorage.getItem("adminToken");

const res = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to change password");
  }

  return res.json();
}



export default {
  adminLogin,
  adminLogout,
  getCertificates,
  addCertificate,
  deleteCertificate,
  verifyCertificate,
};
