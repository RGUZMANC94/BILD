import styles from "../../styles/Profile.module.css";
import SideInfoProfile from "../../components/sideInfoProfile";
import RightSideProfile from "../../components/rightSideInfoProfile";
import { useSelector } from "react-redux";

const Admin = () => {
  const { user_rol } = useSelector((state) => state.userState);
  return (
    <div className={styles["perfil"]}>
      {user_rol === "ADMIN" && (
        <div className="container flex j-c a-s">
          <SideInfoProfile typeViewer={"admin"} />
          <div className={styles["pendientes"]}>
            <RightSideProfile typeViewer={"admin"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
