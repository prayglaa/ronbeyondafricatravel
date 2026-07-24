import { createServerFn } from "@tanstack/react-start";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  travel_date: string;
  destination: string;
  package: string;
  travelers: number;
  message: string | null;
};

/**
 * Sends a WhatsApp notification to the owner when a new booking is submitted.
 * Uses CallMeBot's free WhatsApp API. Requires CALLMEBOT_API_KEY secret.
 */
export const notifyBookingWhatsApp = createServerFn({ method: "POST" })
  .inputValidator((data: BookingPayload) => {
    if (!data?.name || !data?.email) throw new Error("Invalid booking payload");
    return data;
  })
  .handler(async ({ data: booking }) => {
    const apiKey = process.env.CALLMEBOT_API_KEY;
    if (!apiKey) {
      console.error("CALLMEBOT_API_KEY is not configured");
      return { ok: false, reason: "not_configured" as const };
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

    const phone = "255749458052";
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
