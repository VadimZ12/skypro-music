"use client";
import { useInitializeLikedTracks } from "@/hooks/likes";
import styles from "./User.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logout } from "@/store/features/authSlice";
import { clearLikedTracks } from "@/store/features/playlistSlice";
export default function User() {
  const dispatch = useAppDispatch();
  useInitializeLikedTracks();

  const userName = useAppSelector((state) => state.auth.user?.username);

  if (!userName) {
    return null;
  }

  const exitLogout = () => {
    dispatch(logout());
    dispatch(clearLikedTracks());
  };

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName}</p>
      <div onClick={exitLogout} className={styles.sidebarIcon}>
            
              <svg>
                <use xlinkHref="/img/icon/sprite.svg#logout" />
              </svg>
            
          </div>
      {/* <Icon
        name="logout"
        wrapperClass={styles.sidebarIcon}
        iconClass={styles.sidebarIconSvg}
      /> */}
    </div>
  );
}