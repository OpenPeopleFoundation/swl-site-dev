import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase";

const STAFF_COOKIE = "swl_staff";

type StaffAccessRecord = {
  password_hash: string;
};

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("staff_access")
      .select("password_hash")
      .eq("email", email)
      .maybeSingle<StaffAccessRecord>();

    if (error) {
      console.error("Supabase error", error);
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    if (!data) {
      return NextResponse.json({ error: "No access" }, { status: 401 });
    }

    const verified = await bcrypt.compare(password, data.password_hash);

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(STAFF_COOKIE, "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? "ai.snowwhitelaundry.co"
          : undefined,
      maxAge: 60 * 60 * 6,
    });
    return response;
  } catch (err) {
    console.error("Gate error", err);
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }
}
