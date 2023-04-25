import EditProfile from "../src/components/profile/editProfile";

const EditProfilePage = ({ userData }) => {
  return <EditProfile userData={userData} />;
};

export async function getServerSideProps(context) {
  const API_BASE_URL = "http://localhost:8000";
  const { userId } = context.query;

  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const userData = await response.json();
    console.log(userData);

    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);

    return {
      props: {
        userData: null,
      },
    };
  }
}

export default EditProfilePage;
