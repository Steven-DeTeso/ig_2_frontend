// pages/profile/[id].js
import React from "react";
import { useRouter } from "next/router";
import ProfilePage from "../../src/components/profile/ProfilePage";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  return <ProfilePage userId={id} />;
}
