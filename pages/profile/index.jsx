import React from "react";
import styles from "../../styles/Profile.module.css";
import SideInfoProfile from "../../components/sideInfoProfile";
import RightSideProfile from "../../components/rightSideInfoProfile";
import { useSelector } from "react-redux";
import ProfileOptions from "../../components/profileAdmin";

const Profile = () => {
  const { user_rol } = useSelector((state) => state.userState);
  return (
    <div className={styles["perfil"]}>
      <div className="container">
        {user_rol === "ADMIN" && <ProfileOptions />}

        {user_rol !== "ADMIN" && (
          <>
            <SideInfoProfile typeViewer={"adviser"} />
            <div className={styles["pendientes"]}>
              <RightSideProfile typeViewer={"adviser"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
