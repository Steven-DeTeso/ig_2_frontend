const API_BASE_URL = "http://localhost:8000";

export async function deletePost(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/`, {
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
