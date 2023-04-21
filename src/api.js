const API_BASE_URL = "http://localhost:8000";

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

export async function unfollowUser(userId) {
  try {
    const response = await apiCall(`/followers/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Error unfollowing user");
      return false;
    }
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return false;
  }
}
