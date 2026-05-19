export const runtime = "edge";

/**
 * Health check pour monitoring externe (UptimeRobot / BetterStack).
 * Site vitrine pur — pas de DB à pinger.
 */
export async function GET() {
  return Response.json(
    {
      status: "ok",
      version: process.env.NEXT_PUBLIC_VERSION ?? "dev",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
