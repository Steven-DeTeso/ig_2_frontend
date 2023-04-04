export async function refreshAccessToken() {
  try {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("Refresh successful:", data); // Add this line

    if (!response.ok) {
      throw new Error("Error refreshing access token.");
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
}
