"use client";

import { useEffect, useState } from "react";

export default function TeamPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading team members...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Team Members</h1>

      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "1rem" }}>Name</th>
              <th style={{ padding: "1rem" }}>Email</th>
              <th style={{ padding: "1rem" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} style={{ borderBottom: "1px solid var(--surface-border)" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{user.name}</td>
                <td style={{ padding: "1rem" }}>{user.email}</td>
                <td style={{ padding: "1rem" }}>
                  <span className={`badge badge-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
