const API_BASE_URL = "http://localhost:8000";

export const refreshAuthToken = async () => {
  return await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API request failed: ${error.message || error.detail}`);
    }
    return response;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}

export async function deletePost(postId) {
  try {
    const response = await apiCall(`/posts/${postId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
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
