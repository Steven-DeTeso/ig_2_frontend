export async function refreshAccessToken(refreshToken) {
  try {
    // console.log("Request body:", JSON.stringify({ refresh: refreshToken }));

    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      console.log("Refresh token response status:", response.status);
      console.log("Refresh token response status text:", response.statusText);
      const errorData = await response.json();
      console.log("Refresh token response body:", errorData);
      throw new Error(
        `Error refreshing access token. Status: ${response.status}, Message: ${errorData.detail}`
      );
    }

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}
