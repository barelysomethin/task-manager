import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

    const query = projectId ? { projectId } : {};
    
    const tasks = await Task.find(query)
      .sort({ dueDate: 1 })
      .populate("assigneeId", "name email")
      .populate("projectId", "name");

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET Tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const role = req.headers.get("x-user-role");
    if (role !== "Admin") {
      return NextResponse.json({ error: "Only Admins can create tasks" }, { status: 403 });
    }

    await connectDB();
    const { title, description, dueDate, projectId, assigneeId } = await req.json();

    if (!title || !dueDate || !projectId) {
      return NextResponse.json({ error: "Title, dueDate, and projectId are required" }, { status: 400 });
    }

    const task = await Task.create({
      title,
      description,
      dueDate: new Date(dueDate),
      projectId,
      assigneeId: assigneeId || null,
      status: "Pending",
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("POST Task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
