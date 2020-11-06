import React from "react";
import { authService } from "firebaseApp";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
