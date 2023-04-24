import HomePage from "../src/components/Home/HomePage";
import cookie from "cookie";
import { refreshAuthToken } from "../src/api";

const API_BASE_URL = "http://localhost:8000";

export default function Feed({ initialPosts }) {
  return <HomePage initialPosts={initialPosts} />;
}

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const { access: accessToken, refresh: refreshToken } = cookies;

  const response = await fetch(`${API_BASE_URL}/posts/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  let initialPosts;

  if (response.status === 401) {
    await refreshAuthToken();
  } else {
    initialPosts = await response.json();
  }

  if (!initialPosts) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Return the fetched data as props to HomePage component
  return {
    props: { initialPosts },
  };
}
