import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import Project from "@/models/Project";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userId = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    // If Admin, show all stats. If Member, show their assigned tasks stats.
    const taskQuery = role === "Admin" ? {} : { assigneeId: userId };

    const totalProjects = await Project.countDocuments();
    const tasks = await Task.find(taskQuery);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
    const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
    
    const now = new Date();
    const overdueTasks = tasks.filter((t) => t.dueDate < now && t.status !== "Completed").length;

    return NextResponse.json({
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      overdueTasks,
      recentTasks: tasks.slice(0, 5) // Return 5 recent tasks
    });
  } catch (error) {
    console.error("GET Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
