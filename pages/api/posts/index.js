import cookie from "cookie";

// currently don't have any code mapped to this file:
// do not believe I need this implemented.

export default async function handler(req, res) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    console.log("handler function in index printing: ", cookies);
    const accessToken = cookies.access;
    const refreshToken = cookies.refresh;
    console.log(refreshToken);

    if (req.method === "GET") {
      const response = await fetch("http://localhost:8000/posts/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        console.log("Refresh token before refreshing:", refreshToken);
        const newAccessToken = await refreshAccessToken(refreshToken);
        const retryResponse = await fetch("http://localhost:8000/posts/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          credentials: "include",
        });
        const retryData = await retryResponse.json();
        res.status(retryResponse.status).json(retryData);
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } else {
      res.status(405).json({ message: "Method not allowed" }); // Only allow GET and POST requests
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
