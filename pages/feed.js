import HomePage from "../src/components/Home/HomePage";
import cookie from "cookie";

const API_BASE_URL = "http://localhost:8000";

const refreshAuthToken = async () => {
  return await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

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
