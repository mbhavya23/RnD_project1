import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); 
  // loading | authenticated | unauthenticated

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      })
      .catch(() => setStatus("unauthenticated"));
  }, []);

  if (status === "loading") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>Checking authentication…</h3>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
