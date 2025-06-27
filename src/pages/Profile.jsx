import { useEffect } from "react";
import { useUser }    from "../context/UserContext/UserState";

const Profile = () => {
  const { getUserInfo, user } = useUser();

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!user) {
    return <span>👤</span>;
  }

  return <div>Profile {user.name}</div>;
};

export default Profile;
