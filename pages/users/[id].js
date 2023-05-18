// pages/profile/[id].js
import React from "react";
import { useRouter } from "next/router";
import ProfilePage from "../../src/components/profile/ProfilePage";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  console.log(id);

  return <ProfilePage userId={id} />;
}
