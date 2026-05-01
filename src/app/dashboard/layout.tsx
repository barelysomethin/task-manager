"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", textTransform: "uppercase" }}>Team Task</h2>
        </div>

        <nav className="sidebar-nav">
          <Link href="/dashboard" className={`nav-item ${pathname === "/dashboard" ? "active" : ""}`}>
            📊 Dashboard
          </Link>
          <Link href="/dashboard/projects" className={`nav-item ${pathname.includes("/dashboard/projects") ? "active" : ""}`}>
            📁 Projects
          </Link>
          <Link href="/dashboard/tasks" className={`nav-item ${pathname.includes("/dashboard/tasks") ? "active" : ""}`}>
            ✓ Tasks
          </Link>
          <Link href="/dashboard/team" className={`nav-item ${pathname.includes("/dashboard/team") ? "active" : ""}`}>
            👥 Team
          </Link>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: "100%" }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
