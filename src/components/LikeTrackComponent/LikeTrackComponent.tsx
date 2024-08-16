import { useLikeTrack } from "@/hooks/likes";
import styles from "./LikeTrackComponent.module.css"
import classNames from "classnames";
import { trackType } from "../types";

export default function LikeTrackComponent ({currentTrack}:{currentTrack: trackType}) {
    const { isLiked, handleLike } = useLikeTrack(currentTrack);
    return (
        <div className={styles.trackPlayLikeDis}>
        <div onClick={handleLike} className={classNames(styles.trackPlayLike, styles.btnIcon)}>
            <svg className={styles.trackPlayLikeSvg}>
                <use xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like" : "icon-dislike"}`} />
            </svg>
        </div>
    </div>
    )
}