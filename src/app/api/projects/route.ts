import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req: Request) {
  try {
    await connectDB();
    // In a real app we might filter by user's team or projects.
    // For this assignment, we'll return all projects.
    const projects = await Project.find().sort({ createdAt: -1 }).populate("ownerId", "name email");
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const role = req.headers.get("x-user-role");
    if (role !== "Admin") {
      return NextResponse.json({ error: "Only Admins can create projects" }, { status: 403 });
    }

    await connectDB();
    const ownerId = req.headers.get("x-user-id");
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const project = await Project.create({
      name,
      description,
      ownerId,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST Project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
