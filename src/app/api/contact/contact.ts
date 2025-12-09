import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { source, ...rest } = body;

    // validate
    const data = contactSchema.parse(rest);

    // TODO: save to DB / send email / push to sheet
    console.log("New contact form:", { source, ...data });

    return NextResponse.json(
      { success: true, message: "Thank you! Our team will contact you soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, message: "Invalid data or server error." },
      { status: 400 }
    );
  }
}
