import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../src/context/userContext";

const refreshAuthToken = async () => {
  return await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export default function Logout() {
  const { setIsLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 401) {
        await refreshAuthToken();
        response = await fetch("http://localhost:8000/api/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }

      if (!response.ok) {
        throw new Error("Logout failed.");
      }
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        console.log("Cleared sessionStroage data");
      }
      router.push("/");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error: ", error);
      // Display an error message or handle the error in another way
    }
  };

  return (
    <div>
      <p>See ya next time!</p>
    </div>
  );
}
