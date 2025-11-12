import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase credentials are not configured.");
  }
  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) {
      return NextResponse.json({ error: "Email required", exists: false }, { status: 400 });
    }
    const admin = getAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (error) {
      console.error("Supabase check user error", error);
      return NextResponse.json({ exists: false, error: error.message }, { status: 500 });
    }
    const lower = email.trim().toLowerCase();
    const exists =
      data?.users?.some((user) => user.email?.toLowerCase() === lower) ?? false;
    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Check user API error", error);
    return NextResponse.json({ exists: false, error: "Unable to check user" }, { status: 500 });
  }
}
