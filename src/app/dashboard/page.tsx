"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <p>Total Projects</p>
          <div className="stat-value">{stats.totalProjects}</div>
        </div>
        <div className="glass-panel stat-card">
          <p>Total Tasks</p>
          <div className="stat-value">{stats.totalTasks}</div>
        </div>
        <div className="glass-panel stat-card">
          <p>Completed</p>
          <div className="stat-value" style={{ color: "var(--success)" }}>{stats.completedTasks}</div>
        </div>
        <div className="glass-panel stat-card">
          <p>Overdue Tasks</p>
          <div className="stat-value" style={{ color: "var(--danger)" }}>{stats.overdueTasks}</div>
        </div>
      </div>

      <h2 style={{ marginTop: "3rem", marginBottom: "1.5rem" }}>Recent Tasks</h2>
      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        {stats.recentTasks?.length === 0 ? (
          <p>No recent tasks found.</p>
        ) : (
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
                <th style={{ padding: "1rem" }}>Title</th>
                <th style={{ padding: "1rem" }}>Status</th>
                <th style={{ padding: "1rem" }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTasks?.map((task: any) => (
                <tr key={task._id} style={{ borderBottom: "1px solid var(--surface-border)" }}>
                  <td style={{ padding: "1rem" }}>{task.title}</td>
                  <td style={{ padding: "1rem" }}>
                    <span className={`badge badge-${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>{new Date(task.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
