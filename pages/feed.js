import HomePage from "../src/components/Home/HomePage";
import { refreshAccessToken } from "../src/utils/auth";
import cookie from "cookie";

export default function Feed({ initialPosts }) {
  return <HomePage initialPosts={initialPosts} />;
}

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access;
  const refreshToken = cookies.refresh;
  console.log("cookies @getServerSideProps:", cookies);
  console.log("Access Token @getServerSideProps:", accessToken);
  console.log("Refresh Token @getServerSideProps:", refreshToken);

  const response = await fetch("http://localhost:8000/posts/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  let initialPosts;

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
    initialPosts = await retryResponse.json();
  } else {
    console.log("Response Status:", response.status);
    initialPosts = await response.json();
    console.log("initialPosts:", initialPosts);
  }

  // Return the fetched data as props to HomePage component
  return {
    props: { initialPosts },
  };
}
