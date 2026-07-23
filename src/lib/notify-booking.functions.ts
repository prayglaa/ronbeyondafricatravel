import { createServerFn } from "@tanstack/react-start";

/**
 * Sends a WhatsApp notification to the owner when a new booking is submitted.
 * Uses CallMeBot's free WhatsApp API. Requires CALLMEBOT_API_KEY secret.
 * Fetches the booking row server-side (via admin client) so the client only
 * needs to pass the booking id — nothing sensitive travels back to the browser.
 */
export const notifyBookingWhatsApp = createServerFn({ method: "POST" })
  .inputValidator((data: { bookingId: string }) => {
    if (!data?.bookingId || typeof data.bookingId !== "string") {
      throw new Error("bookingId is required");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.CALLMEBOT_API_KEY;
    if (!apiKey) {
      console.error("CALLMEBOT_API_KEY is not configured");
      return { ok: false, reason: "not_configured" as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("name,email,phone,travel_date,destination,package,travelers,message,created_at")
      .eq("id", data.bookingId)
      .maybeSingle();

    if (error || !booking) {
      console.error("Booking lookup failed", error);
      return { ok: false, reason: "not_found" as const };
    }

    const lines = [
      "🦁 *New Booking — Ronbeyond Africa Travel*",
      "",
      `👤 Name: ${booking.name}`,
      `📧 Email: ${booking.email}`,
      `📱 Phone: ${booking.phone}`,
      `📅 Travel date: ${booking.travel_date}`,
      `📍 Destination: ${booking.destination || "—"}`,
      `🎒 Package: ${booking.package || "—"}`,
      `👥 Travelers: ${booking.travelers}`,
      booking.message ? `📝 Message: ${booking.message}` : null,
    ].filter(Boolean).join("\n");

    const phone = "255749458052"; // owner WhatsApp, no + sign for CallMeBot
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${phone}` +
      `&text=${encodeURIComponent(lines)}&apikey=${encodeURIComponent(apiKey)}`;

    try {
      const res = await fetch(url, { method: "GET" });
      const body = await res.text();
      if (!res.ok) {
        console.error(`CallMeBot failed [${res.status}]: ${body}`);
        return { ok: false, reason: "provider_error" as const, status: res.status };
      }
      return { ok: true };
    } catch (err) {
      console.error("CallMeBot request threw", err);
      return { ok: false, reason: "network_error" as const };
    }
  });
