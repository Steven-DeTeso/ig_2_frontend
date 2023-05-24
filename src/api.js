const API_BASE_URL = "http://localhost:8000";
export default API_BASE_URL;

export const refreshAuthToken = async () => {
  return await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export async function apiCall(endpoint, options = {}, retry = true) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      // If the response is 401 Unauthorized and this is the first attempt,
      // try refreshing the token and making the request again.
      if (response.status === 401 && retry) {
        await refreshAuthToken();
        return apiCall(endpoint, options, false);
      }
      const error = await response.json();
      throw new Error(`API request failed: ${error.message || error.detail}`);
    }
    return response;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}

export async function followOrUnfollowUser(userId, action) {
  try {
    const endpoint = action === "follow" ? "follow" : "unfollow";
    const response = await apiCall(`/followers/${userId}/${endpoint}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error(`Error ${action}ing user`);
      return false;
    }
  } catch (error) {
    console.error(`Error ${action}ing user:`, error);
    return false;
  }
}
