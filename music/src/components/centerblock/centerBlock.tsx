import styles from "./centerBlock.module.css"
import CenterblockSearch from "../centerBlockSesrch/centerBlockSearch"
import Filter from "../filterTrack/filterTrack"
import TrackListTitle from "../trackListTitle/trackListTitle"
import PlayList from "../playList/playList"

export default function Centerblock() {
    return (
        <div className={styles.mainCenterblock}>
        <CenterblockSearch/>
         <h2 className={styles.centerblockH2}>Треки</h2>
        <Filter/>
         <div className={styles.centerblockContent}>
          <TrackListTitle/>
          <PlayList/>
         </div>
       </div>
    )
}