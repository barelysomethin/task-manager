import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const { status, assigneeId } = await req.json();
    const userId = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Admins can update anything. Members can only update status, and maybe only if they are assigned (or anyone can take it).
    // Let's allow members to update status.
    if (status) {
      task.status = status;
    }
    
    if (assigneeId !== undefined && role === "Admin") {
      task.assigneeId = assigneeId;
    }

    await task.save();

    return NextResponse.json(task);
  } catch (error) {
    console.error("PATCH Task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const role = req.headers.get("x-user-role");
    if (role !== "Admin") {
      return NextResponse.json({ error: "Only Admins can delete tasks" }, { status: 403 });
    }

    await connectDB();
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE Task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
