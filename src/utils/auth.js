import Cookies from "js-cookie";

export function getAuthData() {
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");
  // const userData = Cookies.get("user_data");
  console.log(`_auth.js access: ${access}`);
  console.log(`_auth.js refresh: ${refresh}`);

  if (access && refresh) {
    console.log("all tokens present - auth.js");
    return {
      access,
      refresh,
    };
  } else {
    return null;
  }
}

export async function refreshAccessToken(refresh) {
  try {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refresh: refresh }),
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
