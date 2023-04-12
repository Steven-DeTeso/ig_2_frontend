import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      router.push("/");
    } catch (error) {
      console.log("Error: ", error);
      // Display an error message or handle the error in another way
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <p>See ya next time!</p>
    </div>
  );
}
