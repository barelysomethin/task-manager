"use client";

import { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const fetchData = async () => {
    const [tasksRes, projectsRes, usersRes] = await Promise.all([
      fetch("/api/tasks"),
      fetch("/api/projects"),
      fetch("/api/users")
    ]);
    
    const tasksData = await tasksRes.json();
    const projectsData = await projectsRes.json();
    const usersData = await usersRes.json();
    
    setTasks(tasksData);
    setProjects(projectsData);
    setUsers(usersData);
    if (projectsData.length > 0) setProjectId(projectsData[0]._id);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate, projectId, assigneeId }),
    });

    if (res.ok) {
      setShowModal(false);
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchData();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      fetchData();
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Task
        </button>
      </div>

      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
                <th style={{ padding: "1rem" }}>Task</th>
                <th style={{ padding: "1rem" }}>Project</th>
                <th style={{ padding: "1rem" }}>Assignee</th>
                <th style={{ padding: "1rem" }}>Due Date</th>
                <th style={{ padding: "1rem" }}>Status</th>
                <th style={{ padding: "1rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: any) => (
                <tr key={task._id} style={{ borderBottom: "1px solid var(--surface-border)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 500 }}>{task.title}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{task.description}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>{task.projectId?.name}</td>
                  <td style={{ padding: "1rem" }}>
                    {task.assigneeId ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.2rem" }}>👤</span>
                        {task.assigneeId.name}
                      </div>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ padding: "1rem" }}>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td style={{ padding: "1rem" }}>
                    <span className={`badge badge-${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <select 
                      className="input-field" 
                      style={{ padding: "0.4rem", fontSize: "0.85rem" }}
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal">
            <h2 style={{ marginBottom: "1.5rem" }}>Create New Task</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label>Task Title</label>
                <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea className="input-field" rows={2} value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div className="input-group">
                <label>Project</label>
                <select className="input-field" value={projectId} onChange={e => setProjectId(e.target.value)} required>
                  {projects.map((p: any) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Due Date</label>
                <input type="date" className="input-field" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Assign To</label>
                <select className="input-field" value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                  <option value="">Select a member...</option>
                  {users.map((u: any) => (
                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Task</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
