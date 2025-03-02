export async function GET() {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
