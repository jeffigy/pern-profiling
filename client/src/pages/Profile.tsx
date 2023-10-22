import React from "react";

type ProfileProps = {
  setAuth: (bool: boolean) => void;
};

const Profile: React.FC<ProfileProps> = () => {
  return <div>profile page</div>;
};
export default Profile;
