import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();
    const users = await User.find({}, "name email role").sort({ name: 1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET Users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
