// "use client";
// import styles from "./Main.module.css";
// import { Menu } from "../Menu/Menu";
// import { Centerblock } from "../Centerblock/Centerblock";
// import { Sidebar } from "../Sidebar/Sidebar";
// import { Player } from "../Player/Player";
// import { TrackType } from "@/types/types";
// import { useAppDispatch, useAppSelector } from "@/hooks/store";
// import { setPlaylist } from "@/store/features/playlistSlice";
// import { useEffect } from "react";

// export type Props = {
//   tracks: TrackType[];
// };
// export const Main = ({ tracks }: Props) => {
//   const dispatch = useAppDispatch();
//   const filterTracks = useAppSelector((store) => store.playlist.filterPlaylist);

//   useEffect(() => {
//     dispatch(setPlaylist({ tracks }));
//   }, [dispatch, tracks]);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Menu />
//           <Centerblock
//             tracks={filterTracks}
//           />
//           <Sidebar />
//         </main>
//         <Player />
//         <footer className={styles.footer} />
//       </div>
//     </div>
//   );
// };