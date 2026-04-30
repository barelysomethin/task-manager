import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
  response.cookies.delete("token");
  return response;
}
